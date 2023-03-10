import React from "react";
import "./SplashPage.css";

const SplashPage = () => {
	return (
		<>
			<body>
				<header id="container">
					<h1 className="splashText">Rumble in Your Tummy?</h1>
					<h2 className="splashText">
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
