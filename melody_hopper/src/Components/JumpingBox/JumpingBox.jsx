import { useEffect, useRef } from 'react';
import character from '../../assets/skeleton-animation_00.png';
import { gsap } from 'gsap';

const JumpingBox = ({ jump, landingY, landingX }) => {
    const boxRef = useRef(null);

    useEffect(() => {
        if (jump) {
            gsap.to(boxRef.current, {
                y:landingY, // Jump height
                x: landingX, // Move to the right
                duration: 0.5,
                onComplete: () => {
                    gsap.to(boxRef.current, {
                        y: landingY+10, // Dynamic landing height
                        x: landingX, // Maintain the x position on landing
                        duration: 0.5,
                    });
                }
            });
        }
    }, [jump, landingY, landingX]);

    return (
        <img
            ref={boxRef}
            src={character} 
            alt="Jumping Box"
            style={{
                width: '50px',
                height: '50px',
                position: 'absolute',
                left: '260px',
                bottom: '95px', 
            }}
        />
    );
};

export default JumpingBox;
