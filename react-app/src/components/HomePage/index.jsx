import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import styles from "../Modals/App.module.css";
import { getAllUsersThunk } from "../../store/users";
import AvgRating from "../AvgRating/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSearch } from "@fortawesome/free-solid-svg-icons";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";
import SplashPage from "../SplashPage";
const zipCodeData = require("zipcode-city-distance");

const HomePage = () => {
	const dispatch = useDispatch();
	// const history = useHistory();
	const products = useSelector((state) => Object.values(state.products));
	const sessionUser = useSelector((state) => state.session.user);

	// for search
	const [query, setQuery] = useState("");
	// for zipcode - use only if there is a user logged in to populate distance, else hide distance
	// const sessionUserZipcode = useSelector(
	// 	(state) => state.session.user.zipcode
	// );

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
					<div className="search">
						<input
							className="search-bar"
							placeholder="Search For Food..."
							onChange={(e) => setQuery(e.target.value)}
						/>
						<FontAwesomeIcon
							icon={faSearch}
							className="search-icon"
						/>
					</div>
					<div className="stores-container">
						{allStoresArray
							.filter((store) => {
								if (query === "") {
									return store;
								} else if (query && store.category === null) {
									return null;
								} else if (
									store.category
										.toLowerCase()
										.includes(query.toLowerCase())
								) {
									return store;
								}
							})
							.map((store) =>
								sessionUser &&
								store &&
								store.id &&
								store.products.length > 0 ? (
									<div key={store?.id} className="storeBox">
											<Link
												className="store-link"
												to={`/store/${store.id}`}
											>
										<div className="store-details">
											<img
												id="shop-splash-img"
												src={store?.shopSplashImg}
												alt="vendor-splash-img"
											/>
										</div>
											{store.shopName}

										<div className="secondary-text">
											<AvgRating
												user={store}
												products={products}
												/>
											<FontAwesomeIcon
												className="star"
												icon={faStar}
												/>
										</div>

										<div className="secondary-text">
											Category: {store.category}
										</div>
										<div className="secondary-text">
											Location: {store.zipcode}
										</div>
										<div className="secondary-text">
											Distance: {""}
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
											{/* <br></br> */}

										</div>
										</Link>
									</div>
								) : (
										null
									// <div></div>
								)
							)}
					</div>
				</div>
			) : (
				<div>
					<SplashPage />
				</div>
			)}
		</>
	);
};

export default HomePage;
