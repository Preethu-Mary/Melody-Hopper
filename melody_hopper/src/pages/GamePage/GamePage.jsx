import NoteBox from '../../Components/NoteBox/NoteBox';
import './GamePage.scss';

const GamePage = () => {

    const notesData = [
        { note: "B", top: "8" },
        { note: "A#", top: "16" },
        { note: "A", top: "24" },
        { note: "G#", top: "32" },
        { note: "G", top: "40" },
        { note: "F#", top: "48" },
        { note: "F", top: "56" },
        { note: "E", top: "64" },
        { note: "D#", top: "72" },
        { note: "D", top: "80" },
        { note: "C#", top: "88" },
        { note: "C", top: "96" },
    ];

    const inputString = "A B A B A B A B"; // Your input string
    const inputNotes = inputString.split(" "); 
    return (
        <div className="container">
        {inputNotes.map((note, index) => {
            // Find the corresponding note data
            const noteData = notesData.find(n => n.note === note);
            return noteData ? (
                <NoteBox  key={`${note}-${index}`} note={note} top={noteData.top} left= {index *8} />
            ) : null;
        })}
    </div>
    );
  };
  
  export default GamePage;