import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NoteBox from '../../Components/NoteBox/NoteBox';
import NoteLines from '../../Components/NoteLines/NoteLines';
import MicButton from '../../Components/MicButton/MicButton';
import axios from 'axios';
import './GamePage.scss';

const GamePage = () => {
    const { id } = useParams(); 
    const [exercise, setExercise] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [consecutiveCount, setConsecutiveCount] = useState(0);
    const [noteColors, setNoteColors] = useState(Array(12).fill('black'));

    const currentIndexRef = useRef(currentIndex);
    const consecutiveCountRef = useRef(consecutiveCount);

    const notesData = [
        { note: "B", top: "10" },
        { note: "A#", top: "17.3" },
        { note: "A", top: "24.8" },
        { note: "G#", top: "32.2" },
        { note: "G", top: "39.5" },
        { note: "F#", top: "47" },
        { note: "F", top: "54.5" },
        { note: "E", top: "61.8" },
        { note: "D#", top: "69.2" },
        { note: "D", top: "76.8" },
        { note: "C#", top: "84.1" },
        { note: "C", top: "91.5" },
    ];

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/exercises/${id}`);
                setExercise(response.data);
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

    const handlePitch = (sungNote) => {
        const expectedNote = inputNotes[currentIndexRef.current];
        console.log(sungNote);
        if (sungNote === expectedNote) {
            setConsecutiveCount(prevCount => {
                const newCount = prevCount + 1;

                if (newCount >= 10) {
                    setNoteColors(prevColors => {
                        const newColors = [...prevColors];
                        newColors[currentIndexRef.current] = 'green';
                        return newColors;
                    });
                    setCurrentIndex(prevIndex => {
                        const nextIndex = Math.min(prevIndex + 1, inputNotes.length - 1);
                        return nextIndex;
                    });
                    return 0;
                }

                return newCount;
            });
        } else {
            setConsecutiveCount(0);
            setNoteColors(prevColors => {
                const newColors = [...prevColors];
                newColors[currentIndexRef.current] = 'red';
                return newColors;
            });
        }
    };

    if (!exercise) return <div>Loading...</div>;

    const inputNotes = exercise.notes.split(" ");

    return (
        <div className="game-page">
            <MicButton getPitch={handlePitch} />
            <NoteLines notesData={notesData} />
            <div className="game-page__container">
                {inputNotes.map((note, index) => {
                    const noteData = notesData.find(n => n.note === note);
                    const color = noteColors[index];
                   
                    return noteData ? (
                        <NoteBox 
                            key={`${note}-${index}`} 
                            note={note} 
                            top={noteData.top} 
                            left={(index + 3) * 6}
                            color={color}
                        />
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default GamePage;
