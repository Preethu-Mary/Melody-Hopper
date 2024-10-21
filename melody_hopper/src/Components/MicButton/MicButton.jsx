import './MicButton.scss';
import { useRef, useState, useEffect } from 'react';
import { getMicrophoneStream, stopMicrophoneStream } from '../../utils/pitchtrack.js'; 

const MicButton = ({ getFrequency }) => {
    const mic = useRef(null);
    const constraints = { audio: true, video: false };

    const [isTracking, setIsTracking] = useState(false);
    let audioContext = useRef(null);
    let source = useRef(null);
    let analyser = useRef(null);
    let buffer = useRef(new Float32Array(2048));
    let rafID = useRef(null);

    const main = () => {
        if (!isTracking) {
            getMicrophoneStream(constraints, audioContext, source, analyser, buffer, rafID, getFrequency, mic);
            mic.current.innerHTML = "Disable mic";
        } else {
            stopMicrophoneStream(source, audioContext, rafID);
            mic.current.innerHTML = "Enable mic";
        }
        setIsTracking(prev => !prev);
    };

    useEffect(() => {
        return () => {
            stopMicrophoneStream(source, audioContext, rafID);
        };
    }, []);

    return (
        <button className="micButton" ref={mic} onClick={main}>
            <i className="bi bi-mic"></i>
        </button>
    );
};

export default MicButton;
