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
                    Excersices
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