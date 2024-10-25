import './Exercise.scss'; 
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MicButton from '../../Components/MicButton/MicButton';
import SidePanel from '../../Components/sidePanel/sidePanel';
import Brick from '../../Components/brick/brick';
import JumpingBox from '../../Components/JumpingBox/JumpingBox';
import winner from '../../assets/534330_17ad5.gif';

const Test = () => {
    const notes = [
        { note: "B", color: "#EAB8E4", landingY:-509.5},
        { note: "A#", color: "#A7B2E0", landingY: -468},
        { note: "A", color: "#A2C2E6", landingY:-426.5},
        { note: "G#", color: "#B8E6B7", landingY: -385},
        { note: "G", color: "#E6E9A2", landingY:-343.5},
        { note: "F#", color: "#F1C1A1", landingY:-302},
        { note: "F", color: "#F6B3B1", landingY:-260.5},
        { note: "E", color: "#F4C2D1", landingY:-219},
        { note: "D#", color: "#D8B6E1", landingY:-177.5},
        { note: "D", color: "#A2D1E0", landingY:-136},
        { note: "C#", color: "#B6E2C8", landingY:-94.5},
        { note: "C", color: "#F1C6A7", landingY:-53},
    ];

    const { id } = useParams(); 
    const [exercise, setExercise] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [consecutiveCount, setConsecutiveCount] = useState(0);
    const [transformedBrick, setTransformedBrick] = useState({ row: -1, col: -1 });
    const currentIndexRef = useRef(currentIndex);
    const consecutiveCountRef = useRef(consecutiveCount);
    const [jump, setJump] = useState(false);
    const [landingY, setLandingY] = useState(0);
    const [landingX, setLandingX] = useState(100);
    const [showGif, setShowGif] = useState(false);
    // const bricksContainerRef = useRef(null); 

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
            const newLandingY = notes.find(n => n.note === expectedNote).landingY; 
            const newLandingX = (colIndex+0.75) * 75; 
            setLandingY(newLandingY);
            setLandingX(newLandingX);
            setConsecutiveCount(prevCount => {
                const newCount = prevCount + 1;
                if (newCount >= 10) {
                    setTransformedBrick({ row: rowIndex, col: colIndex });
                    setCurrentIndex(prevIndex => {
                        const nextIndex = Math.min(prevIndex + 1, exercise.length - 1);
                        if (currentIndexRef.current === exercise.length-1) {
                            setTimeout(() => {
                                setShowGif(true); 
                            }, 2000);
                            setTimeout(() => {
                                setShowGif(false);
                            }, 6000);
                        }
                        return nextIndex;
                    });

                    setJump(true);
                    setTimeout(() => setJump(false), 500);

                    // if (bricksContainerRef.current) {
                    //     bricksContainerRef.current.scrollBy({
                    //         left: 100, // Adjust as needed
                    //         behavior: 'smooth'
                    //     });
                    // }
       
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
                <SidePanel notes={notes} />
                <div className="bricks">
                    {Array.from({ length: 12 }).map((_, rowIndex) => (
                        <div className="bricks__row" key={rowIndex}>
                            {exercise.map((_, colIndex) => {
                                const brickColor = brickColors[rowIndex][colIndex]; 
                                const isTransformed = transformedBrick.row === rowIndex && transformedBrick.col === colIndex;
                                return (
                                    <Brick 
                                    key={colIndex}
                                    color={brickColor}
                                    note={notes[rowIndex]?.note}
                                    isTransformed={isTransformed}
                                />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <JumpingBox jump={jump} landingY={landingY} landingX={landingX} /> 
            {showGif && (
            <div className="gif-overlay">
                <img src={winner} alt="Congratulations!" />
            </div>
             )}
            <div className="notes-container__footer">
                <MicButton getPitch={handlePitch} />
            </div>
        </div>
    );
};

export default Test;
