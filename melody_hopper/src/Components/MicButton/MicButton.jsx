import './MicButton.scss';
import { useRef, useState, useEffect } from 'react';

const MicButton = () => {
    const mic = useRef(null);
    const constraints = {
        audio: true,
        video: false 
    };
    
    const [isTracking, setIsTracking] = useState(false);
    const [currentStream, setCurrentStream] = useState(null);
    const audioContext = useRef(null);  
    const analyser = useRef(null);
    const source = useRef(null);
    const buffer = useRef(new Float32Array(1024)); 
    const rafID = useRef(null); 

    const autoCorrelate = (buf, sampleRate) => {
        const SIZE = buf.length;
        let rms = 0;

        for (let i = 0; i < SIZE; i++) {
            const val = buf[i];
            rms += val * val;
        }
        rms = Math.sqrt(rms / SIZE);
        if (rms < 0.01) return -1; 

        let r1 = 0, r2 = SIZE - 1, thres = 0.2;
        for (let i = 0; i < SIZE / 2; i++)
            if (Math.abs(buf[i]) < thres) { r1 = i; break; }
        for (let i = 1; i < SIZE / 2; i++)
            if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }

        buf = buf.slice(r1, r2);
        const newSize = buf.length;

        const c = new Array(newSize).fill(0);
        for (let i = 0; i < newSize; i++)
            for (let j = 0; j < newSize - i; j++)
                c[i] += buf[j] * buf[j + i];

        let d = 0; 
        while (c[d] > c[d + 1]) d++;
        let maxval = -1, maxpos = -1;

        for (let i = d; i < newSize; i++) {
            if (c[i] > maxval) {
                maxval = c[i];
                maxpos = i;
            }
        }
        let T0 = maxpos;

        const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
        const a = (x1 + x3 - 2 * x2) / 2; 
        const b = (x3 - x1) / 2; 
        if (a) T0 = T0 - b / (2 * a);

        return sampleRate / T0;
    };

    const getPitch = () => {
        if (!analyser.current) return; 

        analyser.current.getFloatTimeDomainData(buffer.current);
        let frequencyInHz = autoCorrelate(buffer.current, audioContext.current.sampleRate);
        console.log(frequencyInHz);

        rafID.current = requestAnimationFrame(getPitch);
    };

    const startPitchTrack = () => {
        if (!audioContext.current || !source.current) return; 

        analyser.current = audioContext.current.createAnalyser();
        analyser.current.fftSize = 2048;
        source.current.connect(analyser.current);
        
        getPitch();
    };

    const getMicrophoneStream = () => {
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                const newAudioContext = new AudioContext();
                source.current = newAudioContext.createMediaStreamSource(stream);
                
                setCurrentStream(stream);
                audioContext.current = newAudioContext; 
                console.log("Audio Context set:", audioContext.current);
                
                startPitchTrack(); 
            })
            .catch((err) => {
                console.error("Error accessing microphone:", err);
                alert(err);
                mic.current.innerHTML = "Enable mic";
            });
    };

    const stopMicrophoneStream = () => {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
            setCurrentStream(null); 
            
            if (audioContext.current) {
                audioContext.current.close().then(() => {
                    audioContext.current = null; 
                    source.current = null; 
                    analyser.current = null; 
                }).catch((error) => {
                    console.error("Error closing audio context:", error);
                });
            }
        }

        if (rafID.current) {
            cancelAnimationFrame(rafID.current);
            rafID.current = null;
        }
    };

    const main = () => {
        if (!isTracking) {
            getMicrophoneStream();
            mic.current.innerHTML = "Disable mic";
        } else {
            stopMicrophoneStream();
            mic.current.innerHTML = "Enable mic";
        }
        setIsTracking(prev => !prev);
    };

    useEffect(() => {
        return () => {
            stopMicrophoneStream();
        };
    }, []);

    return (
        <button className="micButton" ref={mic} onClick={main}>
            <i className="bi bi-mic"></i>
        </button>
    );
};

export default MicButton;
