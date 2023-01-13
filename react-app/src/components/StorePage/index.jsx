import ModalAddProduct from "../Modals/AddProduct/ModalAddProduct";
import ReviewSwiper from "./ReviewSwiper";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../Menu";
import ProductReviews from "./ProductReviews";
import "./storepage.css";
import styles from "../Modals/App.module.css";
import ModalAddShopSplashImage from "../Modals/AddShopForms/ModalAddShopSplashImage";
import ModalAddShop from "../Modals/AddShopForms/ModalAddShop";
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

	//SelectedReviews for the review-swiper
	const selectedProducts = products?.filter((product) => {
		return product?.userId === parseInt(userId);
	});
	const selectedReviews = [];
	for (const product in selectedProducts) {
		selectedReviews.push(selectedProducts[product].reviews);
	}
	const convertedReviews = [].concat.apply([], selectedReviews);

	// console.log(
	// 	convertedReviews,
	// 	"these are the converted reviews for the swiper"
	// );
	//Getting the average rating for the store
	let sumOfAverageRatings = selectedProducts.reduce(function (tot, arr) {
		// return the sum with previous value
		return tot + parseFloat(arr.avgRating, 2);

		// set initial value as 0
	}, 0);
	let storeAvg = (sumOfAverageRatings / selectedProducts.length).toFixed(2);

	//state for modal to create product show and not show
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenShopSplashImg, setIsOpenShopSplashImg] = useState(false);
	const [isOpenAddShop, setIsOpenAddShop] = useState(false);

	//checking if the shop exists. if not, will redirect to a page that says shop does not exist, go back to home
	if (vendor?.shopName === null) {
		history.push("/");
	}

	return (
		<div className="store-page">
			<div className="header-container">
				<div className="header-left">
					<div className="splash-img-container">
						<img
							id="shop-splash-img"
							src={vendor?.shopSplashImg}
							alt="vendor-splash-img"
						/>
					</div>
				</div>
				<div className="header-right">
					{vendor && (
						<div>
							<h1>{vendor.shopName}</h1>
							{vendor.id !== sessionUserId ? (
								<div>
									<h3>
										Distance:{" "}
										{zipCodeData
											.zipCodeDistance(
												sessionUser.zipcode,
												vendor.zipcode,
												"M"
											)
											.toFixed(2)}{" "}
										miles
									</h3>
								</div>
							) : (
								<div>
									<h3>Zipcode: {vendor.zipcode}</h3>
								</div>
							)}
							<h3>Average Reviews: {storeAvg}</h3>
							<h3>Category: {vendor.category}</h3>
							{vendor.id === sessionUserId && (
								<div>
									<button
										className={styles.primaryBtn}
										onClick={() => setIsOpen(true)}
									>
										Create Product
									</button>
									<button
									className={styles.primaryBtn}
									onClick={() => setIsOpenShopSplashImg(true)}
									>
										Add or Edit a Splash Image
									</button>
									<button
									className={styles.primaryBtn}
									onClick={() => setIsOpenAddShop(true)}
									>
										Edit your Store
									</button>
								</div>	
							)}
						</div>
					)}
				</div>
			</div>
			<div className="sample-review-container">
				<ReviewSwiper reviews={convertedReviews} />
			</div>
			<div className="store-menu-container">
				<Menu />
			</div>
			<div className="store-reviews-title-divider">
				<h1>Reviews</h1>
			</div>
			<div className="reviews-section">
				{selectedProducts &&
					selectedProducts.map((product) => (
						<div key={product.id} className="reviews-container">
							<div className="reviews-content">
								<ProductReviews id={product.id} />
							</div>
						</div>
					))}
			</div>
			{isOpen && <ModalAddProduct setIsOpen={setIsOpen} />}
			{isOpenShopSplashImg && <ModalAddShopSplashImage setIsOpen={setIsOpenShopSplashImg} userId={userId}/>}
			{isOpenAddShop && <ModalAddShop setIsOpen={setIsOpenAddShop} userId={userId}/>}
		</div>
	);
};
export default StorePage;
