import './popup.scss';

export const PlayAgainPopup = ({ onPlayAgain, onGoBack }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Well Done!</h2>
                <p>Would you like to play again?</p>
                <button onClick={onPlayAgain}>Play Again</button>
                <button onClick={onGoBack}>Return to homepage</button>
            </div>
        </div>
    );
};
