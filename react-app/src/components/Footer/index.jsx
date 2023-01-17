// import {Link} from 'react-router-dom'
import "./footerpage.css";

const Footer = () => {
	return (
		<div className="footer-page-container">
			<a className="footerLink" href="https://github.com/kympanic/homecooked">
				<h3 className="about"> About </h3>
			</a>
			<div className="contributors"><p>Project Contributors: {" "}</p>
			<p>{" "}</p>
			<a className="footerLink" href="https://github.com/kympanic">
				<p >{"|"}Dan {"|"}</p>
			</a>
			<a className="footerLink" href="https://github.com/Dudemaster47">
				<p> {" "} Alex {"|"}</p>
			</a>
			<a className="footerLink" href="https://github.com/meghasahgal">
				<p> Megha  </p>
			</a>
			</div>

			<span className="bottom-text">© 2023, HomeCooked, Inc.</span>
		</div>
	);
};

export default Footer;
