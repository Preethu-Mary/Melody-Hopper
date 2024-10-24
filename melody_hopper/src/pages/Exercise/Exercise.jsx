import './Exercise.scss'; 
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MicButton from '../../Components/MicButton/MicButton';
import { playTone } from '../../utils/pitchtrack';

const Test = () => {
    const notes = [
        { note: "B", color: "#EAB8E4"},
        { note: "A#", color: "#A7B2E0" },
        { note: "A", color: "#A2C2E6"},
        { note: "G#", color: "#B8E6B7" },
        { note: "G", color: "#E6E9A2"},
        { note: "F#", color: "#F1C1A1"},
        { note: "F", color: "#F6B3B1"},
        { note: "E", color: "#F4C2D1"},
        { note: "D#", color: "#D8B6E1"},
        { note: "D", color: "#A2D1E0"},
        { note: "C#", color: "#B6E2C8"},
        { note: "C", color: "#F1C6A7"},
    ];

    const { id } = useParams(); 
    const [exercise, setExercise] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [consecutiveCount, setConsecutiveCount] = useState(0);
    const [transformedBrick, setTransformedBrick] = useState({ row: -1, col: -1 });
    const currentIndexRef = useRef(currentIndex);
    const consecutiveCountRef = useRef(consecutiveCount);

    const [brickColors, setBrickColors] = useState(
        Array.from({ length: 12 }, () => Array(exercise.length).fill('white'))
    );


   
    exercise.forEach((note, colIndex) => {
        const noteIndex = notes.findIndex(n => n.note === note);
        if (noteIndex !== -1) {
            brickColors[noteIndex][colIndex] = notes[noteIndex].color;
        }
    });

    const initialColors = brickColors;

    const handlePitch = (sungNote) => {
        const colIndex = currentIndexRef.current; 
        const rowIndex = notes.findIndex(n => n.note === sungNote);
        const expectedNote = exercise[currentIndexRef.current];

        if (sungNote === expectedNote) {
            setConsecutiveCount(prevCount => {
                const newCount = prevCount + 1;
                if (newCount >= 10) {
                    setTransformedBrick({ row: rowIndex, col: colIndex });
               
                    setCurrentIndex(prevIndex => {
                        const nextIndex = Math.min(prevIndex + 1, exercise.length - 1);
                        return nextIndex;
                    });
       
                    return 0;
                }

                return newCount;
            });
        } else {
            setConsecutiveCount(0);
            setBrickColors(initialColors.map(row => [...row]));
            setBrickColors(prevColors => {
                const newColors = [...prevColors]; 
                newColors[rowIndex][colIndex] = notes[rowIndex].color; 
                return newColors; 
            });
            setTimeout(() => {
                setBrickColors(initialColors.map(row => [...row]));
            }, 20);
            
        }
    };

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/exercises/${id}`);
                setExercise(response.data.notes.split(" "));
            } catch (error) {
                console.error('Failed to fetch exercise:', error);
            }
        };

        fetchExercise();
    }, [id]);
    
    useEffect(() => {
        currentIndexRef.current = currentIndex;
    }, [currentIndex]);

    useEffect(() => {
        consecutiveCountRef.current = consecutiveCount;
    }, [consecutiveCount]);

    if (!exercise) return <div>Loading...</div>;

    return (
        <div className="notes-container">
            <div className='notes-container__wall'>
                <div className='notes-container__side-panel'>
                    {notes.map(({ note, color }) => (
                        <div
                            key={note}
                            className="notes-container__ref-note"
                            style={{ backgroundColor: color }}
                            onClick={() => playTone(note, 1)}
                        >
                            {note}
                        </div>
                    ))}
                </div>
                <div className="bricks">
                    {Array.from({ length: 12 }).map((_, rowIndex) => (
                        <div className="bricks__row" key={rowIndex}>
                            {exercise.map((_, colIndex) => {
                                const brickColor = brickColors[rowIndex][colIndex]; 
                                const isTransformed = transformedBrick.row === rowIndex && transformedBrick.col === colIndex;
                                return (
                                    <div
                                    key={colIndex}
                                    className={`bricks__brick`}
                                    style={{ 
                                        backgroundColor: brickColor,
                                        transform: isTransformed ? 'translateY(-5px) rotateX(3deg)' : 'none'
                                        }}
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