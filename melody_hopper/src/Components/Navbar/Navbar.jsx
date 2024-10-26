import { Link } from 'react-scroll';
import './Navbar.scss';

function Navbar() {

  return (
    <nav className='navbar'>
        <ul className='navbar__list '>
            <li className='navbar__brand gradient-text'>
                Melody Hopper
            </li>
            <ul className='navbar__list'>
                <li className='navbar__item gradient-text'>
                    <Link to="exercises-table" smooth={true} duration={500}>
                        Exercises
                    </Link>
                </li>
                <li className='navbar__item gradient-text'>
                    Game Rules
                </li>
            </ul>
        </ul>
    </nav>
  );
}

export default Navbar;