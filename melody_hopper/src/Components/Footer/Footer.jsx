import './Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="contact-info ">
                    <h3>Contact Me</h3>
                    <p>
                        <strong>Email:</strong> preethuedin@gmail.com
                    </p>
                    <p>
                        <strong>Phone:</strong>+1 (226) 962-6250
                    </p>
                </div>
                <div className="social-media">
                    <h3>Follow Me</h3>
                    <a href="https://www.instagram.com/preethu_mary_george/" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faInstagram} /> Instagram
                    </a>
                    <a href="https://ca.linkedin.com/in/preethu-mary-george" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2024 Preethu Mary George. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
