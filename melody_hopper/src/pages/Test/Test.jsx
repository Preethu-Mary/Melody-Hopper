import './Test.scss'; 
import { useState, useRef } from 'react';
import MicButton from '../../Components/MicButton/MicButton';

const Test = () => {
    const notes = [
        { note: "B", color: "#EAB8E4", sound: "path/to/C.mp3" },
        { note: "A#", color: "#A7B2E0", sound: "path/to/D.mp3" },
        { note: "A", color: "#A2C2E6", sound: "path/to/E.mp3" },
        { note: "G#", color: "#B8E6B7", sound: "path/to/F.mp3" },
        { note: "G", color: "#E6E9A2", sound: "path/to/G.mp3" },
        { note: "F#", color: "#F1C1A1", sound: "path/to/A.mp3" },
        { note: "F", color: "#F6B3B1", sound: "path/to/B.mp3" },
        { note: "E", color: "#F4C2D1", sound: "path/to/Csharp.mp3" },
        { note: "D#", color: "#D8B6E1", sound: "path/to/Dsharp.mp3" },
        { note: "D", color: "#A2D1E0", sound: "path/to/Fsharp.mp3" },
        { note: "C#", color: "#B6E2C8", sound: "path/to/Gsharp.mp3" },
        { note: "C", color: "#F1C6A7", sound: "path/to/Asharp.mp3" },
    ];
    const input = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [consecutiveCount, setConsecutiveCount] = useState(0);

    // State for colors
    const [brickColors, setBrickColors] = useState(
        Array.from({ length: 12 }, () => Array(input.length).fill('white'))
    );

    

    input.forEach((note, colIndex) => {
        const noteIndex = notes.findIndex(n => n.note === note);
        if (noteIndex !== -1) {
            brickColors[noteIndex][colIndex] = notes[noteIndex].color;
        }
    });

    const initialColors = brickColors;

    const playSound = (sound) => {
        const audio = new Audio(sound);
        audio.play();
    };

    const handlePitch = (sungNote) => {
        const colIndex = currentIndex; 
        const rowIndex = notes.findIndex(n => n.note === sungNote);
        
        if (rowIndex !== -1) {
            setBrickColors(initialColors.map(row => [...row]));
            setBrickColors(prevColors => {
                const newColors = [...prevColors]; 
                newColors[rowIndex][colIndex] = notes[rowIndex].color; 
                return newColors; 
            });
        }
        console.log(sungNote, rowIndex, colIndex);
    };

    return (
        <div className="notes-container">
            <div className='notes-container__wall'>
                <div className='notes-container__side-panel'>
                    {notes.map(({ note, color, sound }) => (
                        <div
                            key={note}
                            className="notes-container__ref-note"
                            style={{ backgroundColor: color }}
                            onClick={() => playSound(sound)}
                        >
                            {note}
                        </div>
                    ))}
                </div>
                <div className="bricks">
                    {Array.from({ length: 12 }).map((_, rowIndex) => (
                        <div className="bricks__row" key={rowIndex}>
                            {input.map((_, colIndex) => {
                                const brickColor = brickColors[rowIndex][colIndex]; 
                                return (
                                    <div
                                        key={colIndex}
                                        className="bricks__brick"
                                        style={{ backgroundColor: brickColor }}
                                    >
                                        {notes[rowIndex].note}
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <div className="notes-container__footer">
                <MicButton getPitch={handlePitch} />
            </div>
        </div>
    );
};

export default Test;
