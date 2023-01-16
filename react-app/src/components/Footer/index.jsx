// import {Link} from 'react-router-dom'
import "./footerpage.css";

const Footer = () => {
	return (
		<div className="footer-page-container">
			<a className="footerLink" href="https://github.com/kympanic/homecooked">
				<h3 className="about"> About </h3>
			</a>
			<span className="bottom-text">© 2023, HomeCooked, Inc.</span>
		</div>
	);
};

export default Footer;
