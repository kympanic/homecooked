import ModalAddProduct from "../Modals/AddProduct/ModalAddProduct";
import ReviewSwiper from "./ReviewSwiper";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../Menu";

import "./storepage.css";
import styles from "../Modals/App.module.css";
import ProductReviews from "./ProductReviews";
const StorePage = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const vendor = useSelector((state) => state?.users[userId]);
	const products = useSelector((state) => Object.values(state?.products));
	const reviews = useSelector((state) => Object.values(state?.reviews));
	const sessionUserId = useSelector((state) => state?.session.user.id);

	const selectedProducts = products?.filter((product) => {
		return product?.userId === parseInt(userId);
	});

	//Getting the average rating for the store
	let sumOfAverageRatings = selectedProducts.reduce(function (tot, arr) {
		// return the sum with previous value
		return tot + parseFloat(arr.avgRating, 2);

		// set initial value as 0
	}, 0);
	let storeAvg = (sumOfAverageRatings / selectedProducts.length).toFixed(2);

	const selectedReviews = [];
	for (const product in selectedProducts) {
		selectedReviews.push(selectedProducts[product].reviews);
	}
	const convertedReviews = [].concat.apply([], selectedReviews);

	//state for modal to create product show and not show
	const [isOpen, setIsOpen] = useState(false);

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
							<h3>Zipcode: {vendor.zipcode}</h3>
							<h3>Average Reviews: {storeAvg}</h3>
							<h3>Category: {vendor.category}</h3>
							{vendor.id === sessionUserId && (
								<button
									className={styles.primaryBtn}
									onClick={() => setIsOpen(true)}
								>
									Create Product
								</button>
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
			<div className="reviews-section">
				{selectedProducts &&
					selectedProducts.map((product) => (
						<div className="reviews-container">
							<div className="reviews-content">
								<ProductReviews id={product.id} />
							</div>
						</div>
					))}
			</div>
			{isOpen && <ModalAddProduct setIsOpen={setIsOpen} />}
		</div>
	);
};
export default StorePage;
