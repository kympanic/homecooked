import React from "react";
import { Link } from "react-router-dom";
// import NavBar from "../NavBar/index";
import "./SplashPage.css";
import food from "./food.jpeg";
import cook from "./cook.jpeg"

const SplashPage = () => {
	return (
		<>
            <body>
                <div className="splash"></div>
            </body>
			<h1 className="primary-text">Rumble in Your Tummy?</h1>
			<br></br>
			<h3 className="tertiary-text">
				Homecooked and fresh food made to order just for you!{" "}
			</h3>
			<br></br>
			<div>
				<Link to="/sign-up" exact={true} activeClassName="active">
					Sign Up
				</Link>
			</div>

			<br></br>

			<div>
				<Link to="/login" exact={true} activeClassName="active">
					Log In
				</Link>
			</div>
			<br></br>

			<div className="page-container">
				<a href="https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"></a>
			</div>

			{/* <img id="splash-img" src={cook} alt="splash-img" /> */}
		</>
	);
};

export default SplashPage;
