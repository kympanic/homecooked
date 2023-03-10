import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import styles from "../Modals/App.module.css";
import { getAllUsersThunk } from "../../store/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSearch } from "@fortawesome/free-solid-svg-icons";
// import {Footer} from "../Footer"
import "./HomePage.css";
const zipCodeData = require("zipcode-city-distance");

const HomePage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const products = useSelector((state) => Object.values(state.products));

	const sessionUser = useSelector((state) => state.session.user);

	let sessionUserZipcode;
	if (sessionUser) {
		sessionUserZipcode = sessionUser.zipcode;
	}

	const allStoresArray = useSelector((state) => Object.values(state.users));

	useEffect(() => {
		dispatch(getAllUsersThunk());
	}, [dispatch]);
	return (
		<>
			{sessionUser ? (
				<div>
					{" "}
					<hr></hr>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div className="stores-container">
						{allStoresArray.map((store) =>
							store && store.id && store.shopName ? (
								<div key={store?.id}>
									<div className="store-details">
										<img
											id="shop-splash-img"
											src={store?.shopSplashImg}
											alt="vendor-splash-img"
										/>
									</div>
									<Link
										className="store-link"
										to={`/store/${store.id}`}
									>
										{store.shopName}
									</Link>
									<div className="secondary-text">
										Average Rating:
										<FontAwesomeIcon
											className="star"
											icon={faStar}
										/>
									</div>

									<div className="secondary-text">
										Zipcode: {store.zipcode}
									</div>
									<div className="secondary-text">
										Distance:{" "}
										{zipCodeData
											.zipCodeDistance(
												sessionUserZipcode,
												store.zipcode,
												"M"
											)
											.toFixed(2)}{" "}
										miles
									</div>
									<div>
										<br></br>
									</div>
								</div>
							) : (
								<div></div>
							)
						)}
					</div>
				</div>
			) : (
				<div>
					<p>
						Welcome to HomeCooked! Please Sign Up or Log In to
						continue!
					</p>
				</div>
			)}
		</>
	);
};

export default HomePage;
