import './backButton.scss';

const BackButton = ({ onClick }) => {
    return (
        <button className="back-button" onClick={onClick}>
            BACK
        </button>
    );
};

export default BackButton;
