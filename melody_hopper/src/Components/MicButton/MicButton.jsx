import './MicButton.scss';
import { useRef, useState, useEffect } from 'react';
import { autoCorrelate } from '../../utils/pitchtrack.js';

const MicButton = ({getFrequency}) => {
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

    const getPitch = () => {
        if (!analyser.current) return; 

        analyser.current.getFloatTimeDomainData(buffer.current);
        let frequencyInHz = autoCorrelate(buffer.current, audioContext.current.sampleRate);

        if (frequencyInHz !== -1) {
            getFrequency(frequencyInHz);
        }

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
