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
    const [audioContext, setAudioContext] = useState(null); 
    // const [source, setSource] = useState(null);

    const getMicrophoneStream = () => {
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                const newAudioContext = new AudioContext();
                // const newSource = newAudioContext.createMediaStreamSource(stream);

                setCurrentStream(stream);
                setAudioContext(newAudioContext);
                // setSource(newSource);
                console.log(stream);
                // You can start pitch tracking here if needed
            })
            .catch(() => {
                alert("Failed to turn the microphone on!");
                mic.current.innerHTML = "Enable mic";
            });
    };

    const stopMicrophoneStream = () => {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
            setCurrentStream(null); 
            
            if (audioContext) {
                audioContext.close().then(() => {
                    setAudioContext(null); 
                }).catch((error) => {
                    console.error("Error closing audio context:", error);
                });
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
