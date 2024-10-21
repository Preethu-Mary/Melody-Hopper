import PitchFinder from 'pitchfinder';

const noteString = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const noteFromFrequency = (frequency) => {
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    const midiNote = Math.round(noteNum) + 69; 
    return noteString[midiNote % 12];
};

export const getMicrophoneStream = async (constraints, audioContext, source, analyser, buffer, rafID, getFrequency, micRef) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        audioContext.current = new AudioContext();
        source.current = audioContext.current.createMediaStreamSource(stream);
        analyser.current = audioContext.current.createAnalyser();
        analyser.current.fftSize = 2048;
        source.current.connect(analyser.current);

        const amdf = PitchFinder.AMDF({ sampleRate: audioContext.current.sampleRate });

        const detectPitch = () => {
            analyser.current.getFloatTimeDomainData(buffer.current);
            const frequency = amdf(buffer.current);

            if (frequency) {
                getFrequency(frequency);
            }

            rafID.current = requestAnimationFrame(detectPitch);
        };

        detectPitch();
    } catch (error) {
        console.error("Error accessing microphone:", error);
        micRef.current.innerHTML = "Enable mic";
    }
};

export const stopMicrophoneStream = (source, audioContext, rafID) => {
    if (source.current) {
        const tracks = source.current.mediaStream.getTracks();
        tracks.forEach(track => track.stop());

        if (audioContext.current) {
            audioContext.current.close().then(() => {
                audioContext.current = null;
                source.current = null;
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
