import { playTone } from '../../utils/pitchtrack';
import './sidePanel.scss';

const SidePanel = ({ notes }) => (
    <div className='side-panel'>
        {notes.map(({ note, color }) => (
            <div
                key={note}
                className="side-panel__ref-note"
                style={{ backgroundColor: color }}
                onClick={() => playTone(note, 1)}
            >
                {note}
            </div>
        ))}
    </div>
);

export default SidePanel;