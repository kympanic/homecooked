import { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../Modals/App.module.css";
import { getAllUsersThunk } from "../../store/users";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart } from "@fortawesome/free-solid-svg-icons";




const HomePage = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	// const vendor = useSelector((state) => state?.users[userId]);
	// const products = useSelector((state) => state?.users[userId]?.products);
	// const reviews = useSelector((state) => state?.users[userId]?.reviews);
	// const sessionUserId = useSelector((state) => state.session.user.id);

	const allStoresArray = useSelector((state) => Object.values(state.users));

	useEffect(() => {
		dispatch(getAllUsersThunk());
	}, [dispatch]);

	// <div className="splash-img-container">
	// 					<img
	// 						id="shop-splash-img"
	// 						src={vendor?.shopSplashImg}
	// 						alt="vendor-splash-img"
	// 					/>
	// 				</div>


	return (
		<>
			{" "}
			<hr></hr>
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
							<div


							>
								<FontAwesomeIcon className="heart" icon={faHeart} />
							</div>
							<Link className="store-link" to={`/users/${store.id}`}>
								{store.shopName}
							</Link>
							<div className="secondary-text">
								Zipcode: {store.zipcode}
							</div>


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
