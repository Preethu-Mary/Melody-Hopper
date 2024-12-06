import './brick.scss';
import { forwardRef } from 'react';

const Brick = forwardRef(({ color, note, isTransformed }, ref) => {
    return (
        <div 
            ref={ref} 
            className="brick"
            style={{
                backgroundColor: color,
                transform: isTransformed ? 'translateY(-5px) rotateX(5deg)' : 'none'
            }}
        >
            {note}
        </div>
    );
});
// Set the displayName for the component
Brick.displayName = 'Brick';

export default Brick;
