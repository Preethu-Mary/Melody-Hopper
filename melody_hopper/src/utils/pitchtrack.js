const noteString = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const noteFromFrequency = (frequency) => {
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    const midiNote = Math.round(noteNum) + 69; 
    return noteString[midiNote % 12];
};