import vdo from "../../assets/video.mp4";
import './how_to_play.scss';

const howtoplay = () => {
    return (
        <div className="game-instructions-container">
            <div className="video-section">
                <video controls>
                    <source src={vdo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="instructions-section">
                <h2>How to Play</h2>
                <p><strong>Objective</strong>: Help the monster jump across the tiles by singing the notes in the correct order!</p>

                <p><strong>Starting the Game</strong>: Begin by selecting the exercise. The tiles representing the notes will be displayed on the screen.</p>

                <p><strong>Singing the Notes</strong>: Sing the notes displayed accurately. The monster will jump to the next tile only if you sing the correct note in the specified order.</p>

                <p><strong>Tile Reference</strong>: If you’re unsure about how a note sounds, use the side panel. It contains tiles that provide audio references for each note. Click on a note in the side panel to hear it before you sing!</p>

                <p><strong>Identifying Wrong Notes</strong>: If you sing the wrong note, the corresponding tile will start blinking. Try to correct your pitch and sing the right note to keep the game moving!</p>

                <p><strong>Have Fun!</strong> Enjoy the challenge and keep practicing to improve your pitch accuracy!</p>
            </div>
        </div>
    );
};

export default howtoplay;
