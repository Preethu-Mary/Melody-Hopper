import NoteBox from '../../Components/NoteBox/NoteBox';
import NoteLines from '../../Components/NoteLines/NoteLines';
import MicButton from '../../Components/MicButton/MicButton';
import './GamePage.scss';

const GamePage = () => {

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

    const inputString = "A A# B C C# D D# E F F# G G# A A# B B"; 
    const inputNotes = inputString.split(" "); 

    return (
        <div className="game-page">
            <MicButton/>
            <NoteLines notesData={notesData} />
            <div className="game-page__container">
                {inputNotes.map((note, index) => {
                    const noteData = notesData.find(n => n.note === note);
                    return noteData ? (
                        <NoteBox 
                            key={`${note}-${index}`} 
                            note={note} 
                            top={noteData.top} 
                            left={(index + 3) * 6}
                        />
                    ) : null;
                })}
            </div>
    </div>
    );
  };
  
  export default GamePage;