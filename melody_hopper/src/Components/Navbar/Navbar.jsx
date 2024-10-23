import './Navbar.scss';

function Navbar() {

  return (
    <nav className='navbar'>
        <ul className='navbar__list'>
            <li className='navbar__brand'>
                Melody Hopper
            </li>
            <ul className='navbar__list'>
                <li className='navbar__item'>
                    Excersices
                </li>
                <li className='navbar__item'>
                    Game Rules
                </li>
            </ul>
        </ul>
    </nav>
  );
}

export default Navbar;