import React from "react";
import { Link } from "react-router-dom";
// import NavBar from "../NavBar/index";
import "./SplashPage.css";
// import food from "./food.jpeg";
import cook from "./cook.jpeg";

const SplashPage = () => {
	return (
		<>
			<body>
				<header id="container">
					<h1>Rumble in Your Tummy?</h1>
					<h2>
						Try some homecooked and made-to-order food just for you!{" "}
					</h2>
					<a href="/sign-up" class="button">
						Sign Up
					</a>
					<a href="/login" class="button">
						Log In
					</a>
				</header>
			</body>
		</>
	);
};

export default SplashPage;
