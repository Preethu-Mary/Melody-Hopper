import './MicButton.scss';
import { useRef, useState, useEffect } from 'react';
import PitchFinder from 'pitchfinder';

const MicButton = ({getFrequency}) => {
    const mic = useRef(null);
    const constraints = {
        audio: true,
        video: false 
    };

    const [isTracking, setIsTracking] = useState(false);
    let audioContext = useRef(null);
    let source = useRef(null);
    let analyser = useRef(null);
    let buffer = useRef(new Float32Array(2048));
    let rafID = useRef(null);
    let amdf = useRef(null);

    const getMicrophoneStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            audioContext.current = new AudioContext();
            source.current = audioContext.current.createMediaStreamSource(stream);
            analyser.current = audioContext.current.createAnalyser();
            analyser.current.fftSize = 2048;
            source.current.connect(analyser.current);

            amdf.current = PitchFinder.AMDF({ sampleRate: audioContext.current.sampleRate });

            const detectPitch = () => {
                analyser.current.getFloatTimeDomainData(buffer.current);
                const frequency = amdf.current(buffer.current);

                if (frequency) {
                    getFrequency(frequency);
                }

                rafID.current = requestAnimationFrame(detectPitch);
            };

            detectPitch();
        } catch (error) {
            console.error("Error accessing microphone:", error);
            mic.current.innerHTML = "Enable mic";
        }
    };

    const stopMicrophoneStream = () => {
        if (source.current) {
            const tracks = source.current.mediaStream.getTracks();
            tracks.forEach(track => track.stop());

            if (audioContext.current) {
                audioContext.current.close().then(() => {
                    audioContext.current = null;
                    source.current = null;
                    analyser.current = null;
                    amdf.current = null;
                    console.log("Microphone stream stopped and audio context closed.");
                }).catch(error => {
                    console.error("Error closing audio context:", error);
                });
            }

            if (rafID.current) {
                cancelAnimationFrame(rafID.current);
                rafID.current = null;
            }
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
