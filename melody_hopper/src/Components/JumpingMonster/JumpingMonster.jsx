import { useEffect, useRef } from 'react';
import character from '../../assets/Monster-image.png';
import { gsap } from 'gsap';
import './JumpingMonster.scss';

const JumpingMonster = ({ jump, landingY, landingX }) => {
    const boxRef = useRef(null);

    useEffect(() => {
        if (jump) {
            gsap.to(boxRef.current, {
                y:landingY,
                x: landingX,
                duration: 0.5,
                onComplete: () => {
                    gsap.to(boxRef.current, {
                        y: landingY+10, 
                        x: landingX, 
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
            alt="Jumping Monster"
            className="monster"
        />
    );
};

export default JumpingMonster;
