import { playTone } from '../../utils/pitchtrack';

const SidePanel = ({ notes }) => (
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
);

export default SidePanel;