const Brick = ({ color, note, isTransformed }) => (
    <div
        className="bricks__brick"
        style={{
            backgroundColor: color,
            transform: isTransformed ? 'translateY(-5px) rotateX(3deg)' : 'none'
        }}
    >
        {note}
    </div>
);

export default Brick;
