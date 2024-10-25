import { playTone } from '../../utils/pitchtrack';
import play from '../../assets/Play-the-notes.png';
import './sidePanel.scss';

const SidePanel = ({ notes }) => (
    <>
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
        <img src={play} alt='Ply the notes here if you are unsure!' className='side-panel__text'/>
    </>
);

export default SidePanel;