import ModalAddProduct from "../Modals/AddProduct/ModalAddProduct";
import ReviewSwiper from "./ReviewSwiper";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../Menu";
import ProductReviews from "./ProductReviews";
import styles from "../Modals/App.module.css";
import ModalAddShopSplashImage from "../Modals/AddShopForms/ModalAddShopSplashImage";
import ModalChangeShopName from "../Modals/AddShopForms/ModalChangeShopName";
import ModalChangeShopCategory from "../Modals/AddShopForms/ModalChangeShopCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./storepage.css";
const zipCodeData = require("zipcode-city-distance");

const StorePage = () => {
	const { userId } = useParams();
	// const dispatch = useDispatch();
	const history = useHistory();
	const vendor = useSelector((state) => state?.users[userId]);
	const products = useSelector((state) => Object.values(state?.products));
	// const reviews = useSelector((state) => Object.values(state?.reviews));
	const sessionUserId = useSelector((state) => state?.session.user.id);
	const sessionUser = useSelector((state) => state?.session.user);
	console.log(vendor);
	//SelectedReviews for the review-swiper
	const selectedProducts = products?.filter((product) => {
		return product?.userId === parseInt(userId);
	});
	const selectedReviews = [];
	for (const product in selectedProducts) {
		selectedReviews.push(selectedProducts[product].reviews);
	}
	const convertedReviews = [].concat.apply([], selectedReviews);

	//state for modal to create product show and not show
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenShopSplashImg, setIsOpenShopSplashImg] = useState(false);
	const [isOpenChangeName, setIsOpenChangeName] = useState(false);
	const [isOpenChangeCat, setIsOpenChangeCat] = useState(false);
	const [showReviews, setShowReviews] = useState(false);

	//checking if the shop exists. if not, will redirect to a page that says shop does not exist, go back to home
	if (vendor?.shopName === null) {
		history.push("/");
	}

	let zipInfo = zipCodeData.getInfo("zipcode", vendor?.zipcode);
	let location = Object.keys(zipInfo?.data.places)[0];

	//Getting the average rating for the store
	let sumOfAverageRatings = selectedProducts?.reduce(function (tot, arr) {
		return tot + parseFloat(arr.avgRating, 2);
	}, 0);

	let stringAvg = (sumOfAverageRatings / selectedProducts?.length).toFixed(2);
	let storeAvg = parseFloat(stringAvg);

	// const reviewCommenter = () => {
	// 	if (storeAvg < 2.0) {
	// 		return "Users have negative negative view for this vendor";
	// 	} else if (storeAvg >= 3.0 && storeAvg <= 3.5) {
	// 		return "Users have mixed views for this vendor";
	// 	} else if (storeAvg > 3.5 && storeAvg < 4.5) {
	// 		return "Users have positive views for this vendor";
	// 	} else if (storeAvg > 4.5) {
	// 		return "Users have RAVE reviews for this vendor!";
	// 	} else {
	// 		console.log(storeAvg);
	// 		return "There are no reviews yet!";
	// 	}
	// };
	// const reviewCommenter = () => {
	// 	if (storeAvg < 3) {
	// 		return "woah this works";
	// 	}
	// };

	return (
		<div>
			{vendor && (
				<div className="store-page">
					<div className="header-container">
						{vendor.shopSplashImg && (
							<div className="splash-img-container">
								<img
									className="shop-splash-img"
									src={vendor.shopSplashImg}
									alt="vendor-splash-img"
								/>
								{sessionUserId === vendor.id && (
									<button
										className={styles.editSplashBtn}
										onClick={() =>
											setIsOpenShopSplashImg(true)
										}
									>
										Add Edit Splash
									</button>
								)}
							</div>
						)}
						<div className="store-info-container">
							<div className="shop-logo-img-container">
								<img
									className="shop-logo-img"
									src={vendor.shopLogoImg}
									alt="vendor-shop-logo"
								/>
							</div>
							<div className="shop-info-container">
								<div id="shopinfo-shopname-element">
									<h1>{vendor.shopName}</h1>
								</div>
								{storeAvg ? (
									<div id="shopinfo-avg-element">
										<p>Average Reviews: {storeAvg}</p>
									</div>
								) : (
									<div id="shopinfo-avg-element">
										<p>No reviews yet!</p>
									</div>
								)}
								{vendor.id !== sessionUserId ? (
									<div id="shopinfo-zipcode-element">
										<p>
											Distance:{" "}
											{zipCodeData
												.zipCodeDistance(
													sessionUser.zipcode,
													vendor.zipcode,
													"M"
												)
												.toFixed(2)}{" "}
											miles
										</p>
									</div>
								) : (
									<div id="shopinfo-zipcode-element">
										<p>Location: {location}</p>
									</div>
								)}
								<div className="shopinfo-follow-element">
									<p>
										Follow Shop{" "}
										<FontAwesomeIcon
											className="heart"
											icon={faHeart}
										/>{" "}
									</p>
								</div>
							</div>
							<div className="user-info-container">
								<div id="userinfo-profile-img-element">
									<img
										id="storepage-profile-img"
										src={vendor.profileImg}
										alt={vendor.username}
									/>
								</div>
								<div id="userinfo-profile-name-element">
									<a href={`/users/${vendor.id}`}>
										{vendor.username}
									</a>
								</div>
								<div>
									<p>email: {vendor.email}</p>
								</div>
								<div>
									<p>{vendor.phoneNumber}</p>
								</div>
							</div>
						</div>
					</div>
					<div className="sample-review-container">
						<ReviewSwiper reviews={convertedReviews} />
					</div>
				</div>
			)}
			{isOpenShopSplashImg && (
				<ModalAddShopSplashImage
					setIsOpen={setIsOpenShopSplashImg}
					userId={userId}
				/>
			)}
		</div>

		// 					<h3>Average Reviews: {storeAvg}</h3>
		// 					<h3>Category: {vendor.category}</h3>
		// 					{vendor.id === sessionUserId && (
		// 						<div>
		// 							<button
		// 								className={styles.primaryBtn}
		// 								onClick={() => setIsOpen(true)}
		// 							>
		// 								Create Product
		// 							</button>
		// 							<button
		// 								className={styles.primaryBtn}
		// 								onClick={() =>
		// 									setIsOpenChangeName(true)
		// 								}
		// 							>
		// 								Change Your Store's Name
		// 							</button>
		// 							<button
		// 								className={styles.primaryBtn}
		// 								onClick={() => setIsOpenChangeCat(true)}
		// 							>
		// 								Change Your Store's Cuisine
		// 							</button>
		// 						</div>
		// 					)}
		// 				</div>
		// 			)}
		// 		</div>
		// 	</div>

		// 	<div className="store-menu-container">
		// 		<Menu />
		// 	</div>
		// 	<div className="store-reviews-title-divider">
		// 		<div>
		// 			<h1>Reviews</h1>
		// 		</div>
		// 		<div>
		// 			<button onClick={() => setShowReviews(true)}>
		// 				Show Reviews
		// 			</button>
		// 			<button onClick={() => setShowReviews(false)}>
		// 				Hide Reviews
		// 			</button>
		// 		</div>
		// 	</div>
		// 	{showReviews && (
		// 		<div className="reviews-section">
		// 			{selectedProducts &&
		// 				selectedProducts.map((product) => (
		// 					<div key={product.id} className="reviews-container">
		// 						<div className="reviews-content">
		// 							<ProductReviews id={product.id} />
		// 						</div>
		// 					</div>
		// 				))}
		// 		</div>
		// 	)}
		// 	{isOpen && <ModalAddProduct setIsOpen={setIsOpen} />}

		// 	{isOpenChangeName && (
		// 		<ModalChangeShopName
		// 			setIsOpen={setIsOpenChangeName}
		// 			userId={userId}
		// 		/>
		// 	)}
		// 	{isOpenChangeCat && (
		// 		<ModalChangeShopCategory
		// 			setIsOpen={setIsOpenChangeCat}
		// 			userId={userId}
		// 		/>
		// 	)}
		// </div>
	);
};
export default StorePage;
