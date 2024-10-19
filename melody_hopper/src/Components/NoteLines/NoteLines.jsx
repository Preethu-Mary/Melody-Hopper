import './NoteLines.scss';

const NoteLines = () => {

    const notesData = [
        { note: "B", top: "10" },
        { note: "A#", top: "17" },
        { note: "A", top: "24" },
        { note: "G#", top: "31" },
        { note: "G", top: "38" },
        { note: "F#", top: "45" },
        { note: "F", top: "52" },
        { note: "E", top: "59" },
        { note: "D#", top: "66" },
        { note: "D", top: "73" },
        { note: "C#", top: "80" },
        { note: "C", top: "87" },
    ];

    return (
        <div className="sidebar">
            {notesData.map((noteData, index) => (
                <div key={index} className="sidebar-note" style={{top: `${noteData.top}%` }}>
                    <div className="note-label">{noteData.note}</div>
                    <hr className="note-line" />
                </div>
            ))}
        </div>
    );
};

export default NoteLines;
