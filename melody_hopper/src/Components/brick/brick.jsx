import './brick.scss';

const Brick = ({ color, note, isTransformed }) => (
    <div
        className="brick"
        style={{
            backgroundColor: color,
            transform: isTransformed ? 'translateY(-5px) rotateX(5deg)' : 'none'
        }}
    >
        {note}
    </div>
);

export default Brick;
