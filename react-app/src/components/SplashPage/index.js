import React from "react";
import { NavLink, Link } from "react-router-dom";
import NavBar from "../NavBar/index";

const SplashPage = () => {
	return (
		<>
			<h1>HomeCooked Food for You!</h1>

			<h3>Fresh and mostly organic food made to order just for you. </h3>
			<div>
				<Link to="/sign-up" exact={true} activeClassName="active">
					Sign Up
				</Link>
			</div>

			<div>
				<Link to="/login" exact={true} activeClassName="active">
					Log In
				</Link>
			</div>
		</>
	);
};

export default SplashPage;
