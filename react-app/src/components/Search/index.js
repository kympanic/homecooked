import { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Modals/App.module.css";
import { getAllUsersThunk } from "../../store/users";
// import {UserAvgRating} from "../ProfilePage/UserAvgRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";
const zipCodeData = require("zipcode-city-distance");

const Search = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);

	// for search
	const [query, setQuery] = useState("");
	// for zipcode
	const sessionUserZipcode = useSelector(
		(state) => state.session.user.zipcode
	);
	const allStoresArray = useSelector((state) => Object.values(state.users));

	useEffect(() => {
		dispatch(getAllUsersThunk());
	}, [dispatch]);

	return (
		<>
			{" "}
			<hr></hr>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div>
				<input
					className="search-bar"
					placeholder="Search For Food..."
					onChange={(e) => setQuery(e.target.value)}
				/>
				{/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
				<div className="stores-container">
					{allStoresArray
						.filter((store) => {
							if (query === "") {
								return store;
							} else if (query && store.category === null ) {
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
							store && store.id ? (
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
										to={`/users/${store.id}`}
									>
										{store.shopName}
									</Link>
									<div className="secondary-text">
										Average Rating:
										{/* <UserAvgRating user={user}/> */}
										<FontAwesomeIcon
											className="star"
											icon={faStar}
										/>
									</div>
									<div className="secondary-text">
										Category: {store.category}
									</div>
									<div className="secondary-text">
										Zipcode: {store.zipcode}
									</div>
									<div className="secondary-text">
										Distance:
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
		</>
	);
};

export default Search;
