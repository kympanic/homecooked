import { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Modals/App.module.css";
import { getAllUsersThunk } from "../../store/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSearch} from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css"
const zipCodeData = require('zipcode-city-distance');




const HomePage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	// for search
	const [query, setQuery] = useState("")


	const sessionUserZipcode = useSelector((state)=> state.session.user.zipcode)
	const allStoresArray = useSelector((state) => Object.values(state.users));

	let zipCodeDistance = zipCodeData.zipCodeDistance(sessionUserZipcode, '33014','M');


	useEffect(() => {
		dispatch(getAllUsersThunk());
	}, [dispatch]);


	return (
		<>
			{" "}
			<hr></hr>

					<div className="search-bar">
						<input placeholder="Search For Food..." />
						<FontAwesomeIcon icon={faSearch} className="search-icon" />
					</div>
			<div></div>
			<div></div>
			<div></div>

			<div></div>
			<div className="stores-container">
				{allStoresArray.map((store) => (
						store && store.id ?
					<div key={store?.id}>
						<div className="store-details">
							<img
							id="shop-splash-img"
							src={store?.shopSplashImg}
							alt="vendor-splash-img"
						/>

							</div>
							<Link className="store-link" to={`/users/${store.id}`}>
								{store.shopName}
							</Link>
							<div className="secondary-text">
								Average Rating:
								<FontAwesomeIcon className="star" icon={faStar} />
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
					: <div></div>
				))}
			</div>
		</>
	);
};

export default HomePage;
