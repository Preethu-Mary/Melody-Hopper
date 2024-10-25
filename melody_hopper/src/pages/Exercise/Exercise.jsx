import './Exercise.scss'; 
import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom';
import axios from 'axios';
import MicButton from '../../Components/MicButton/MicButton';
import SidePanel from '../../Components/sidePanel/sidePanel';
import Brick from '../../Components/brick/brick';
import JumpingMonster from '../../Components/JumpingMonster/JumpingMonster';
import { PlayAgainPopup } from '../../Components/popup/popup';
import winner from '../../assets/534330_17ad5.gif';

const Test = () => {
    const notes = [
        { note: "B", color: "#EAB8E4" },
        { note: "A#", color: "#A7B2E0" },
        { note: "A", color: "#A2C2E6" },
        { note: "G#", color: "#B8E6B7" },
        { note: "G", color: "#E6E9A2" },
        { note: "F#", color: "#F1C1A1" },
        { note: "F", color: "#F6B3B1" },
        { note: "E", color: "#F4C2D1" },
        { note: "D#", color: "#D8B6E1" },
        { note: "D", color: "#A2D1E0" },
        { note: "C#", color: "#B6E2C8" },
        { note: "C", color: "#F1C6A7" },
    ];
    const { id } = useParams();
    const navigate = useNavigate();
    const [exercise, setExercise] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [consecutiveCount, setConsecutiveCount] = useState(0);
    const [transformedBrick, setTransformedBrick] = useState({ row: -1, col: -1 });
    const [jump, setJump] = useState(false);
    const [landingY, setLandingY] = useState(0);
    const [landingX, setLandingX] = useState(100);
    const [showGif, setShowGif] = useState(false);
    const [showPopup, setShowPopup] = useState(false);  
    const [brickColors, setBrickColors] = useState(Array.from({ length: 12 }, () => Array(exercise.length).fill('white')));

    const currentIndexRef = useRef(currentIndex);
    const consecutiveCountRef = useRef(consecutiveCount);

    const initializeBrickColors = (exercise) => {
        const initialColors = Array.from({ length: 12 }, () => Array(exercise.length).fill('white'));
        exercise.forEach((note, colIndex) => {
            const noteIndex = notes.findIndex(n => n.note === note);
            if (noteIndex !== -1) {
                initialColors[noteIndex][colIndex] = notes[noteIndex].color;
            }
        });
        return initialColors;
    };

    const showWinGif = () => {
        setTimeout(() => setShowGif(true), 2000);
        setTimeout(() => {
            setShowGif(false);
            setShowPopup(true); 
        }, 6000);
    };

    const handlePlayAgain = () => {
        setShowPopup(false);
        navigate(0);
    };

    const handleGoBack = () => {
        setShowPopup(false);
        navigate('/'); 
    };

    const handleCorrectPitch = (colIndex, sungNote) => {
        const rowIndex = notes.findIndex(n => n.note === sungNote);
        const expectedNote = exercise[currentIndexRef.current];

        const newLandingY = -53 + 41.5 * (notes.findIndex(n => n.note === expectedNote) - 11);
        const newLandingX = (colIndex + 0.75) * 75;

        setLandingY(newLandingY);
        setLandingX(newLandingX);
        setConsecutiveCount(prevCount => {
            const newCount = prevCount + 1;
            if (newCount >= 10) {
                setTransformedBrick({ row: rowIndex, col: colIndex });
                setCurrentIndex(prevIndex => {
                const nextIndex = Math.min(prevIndex + 1, exercise.length - 1);
                if (currentIndexRef.current === exercise.length - 1) {
                    showWinGif();
                }
                setJump(true);
                setTimeout(() => setJump(false), 500);
                return nextIndex;
            });
                return 0;
            }
            return newCount;
        });
    };

    const handleIncorrectPitch = (colIndex, sungNote) => {
        setConsecutiveCount(0);
        setBrickColors(prevColors => {
            const newColors = [...prevColors];
            const rowIndex = notes.findIndex(n => n.note === sungNote);
            newColors[rowIndex][colIndex] = notes[rowIndex].color;
            return newColors;
        });
        setTimeout(() => {
            setBrickColors(initializeBrickColors(exercise));
        }, 20);
    };

    const handlePitch = (sungNote) => {
        const colIndex = currentIndexRef.current;
        const expectedNote = exercise[currentIndexRef.current];

        if (sungNote === expectedNote) {
            handleCorrectPitch(colIndex, sungNote);
        } else {
            handleIncorrectPitch(colIndex, sungNote);
        }
    };

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/exercises/${id}`);
                const fetchedExercise = response.data.notes.split(" ");
                setExercise(fetchedExercise);
                setBrickColors(initializeBrickColors(fetchedExercise));
            } catch (error) {
                console.error('Failed to fetch exercise:', error);
            }
        };

        fetchExercise();
        currentIndexRef.current = currentIndex;
        consecutiveCountRef.current = consecutiveCount;
    }, [id, currentIndex, consecutiveCount]);

    if (!exercise.length) return <div>Loading...</div>;

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
            <JumpingMonster jump={jump} landingY={landingY} landingX={landingX} /> 
            {showGif && (
            <div className="gif-overlay">
                <img src={winner} alt="Congratulations!" />
            </div>
             )}

            {showPopup && (
                <PlayAgainPopup onPlayAgain={handlePlayAgain} onGoBack={handleGoBack} />
            )}
            <div className="notes-container__footer">
                <MicButton getPitch={handlePitch} />
            </div>
        </div>
    );
};

export default Test;
