import ModalAddProduct from "../Modals/AddProduct/ModalAddProduct";
import ReviewSwiper from "./ReviewSwiper";
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Menu from "../Menu";

import "./storepage.css";
import styles from "../Modals/App.module.css";
import { useEffect } from "react";
import { getAllProductsThunk } from "../../store/products";

const StorePage = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const vendor = useSelector((state) => state?.users[userId]);
	const products = useSelector((state) => Object.values(state?.products));
	const reviews = useSelector((state) => Object.values(state?.reviews));
	const sessionUserId = useSelector((state) => state?.session.user.id);

	const selectedProducts = products.filter((product) => {
		return product.userId === 1;
	});

	const selectedReviews = [];
	selectedProducts.map((product) => {
		selectedReviews.push(product?.reviews);
	});
	console.log(selectedProducts, "ahh");
	console.log(selectedReviews, "OMGPLEASE");

	//state for modal to create product show and not show
	const [isOpen, setIsOpen] = useState(false);

	//checking if the shop exists. if not, will redirect to a page that says shop does not exist, go back to home
	if (vendor?.shopName === null) {
		history.push("/");
	}

	useEffect(() => {
		dispatch(getAllProductsThunk());
	}, [dispatch]);

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
					<div>
						<h1>{vendor?.shopName}</h1>
						<h3>Zipcode: {vendor?.zipcode}</h3>
						<h3>Average Reviews</h3>
						<h3>Category</h3>
						{vendor?.id === sessionUserId && (
							<button
								className={styles.primaryBtn}
								onClick={() => setIsOpen(true)}
							>
								Create Product
							</button>
						)}
					</div>
				</div>
			</div>
			<div className="sample-review-container">
				<ReviewSwiper reviews={reviews} products={products} />
			</div>
			<div className="store-menu-container">
				<Menu />
			</div>

			<div className="reviews-section">
				{reviews?.map((review) => (
					<div className="reviews-container">
						<div className="reviews-header">
							<h4>{review?.user?.username}</h4>
							<>review owner profile image name</>
						</div>
						<div className="reviews-content">
							<>review score review body</>
						</div>
						<div className="reviews-footer">
							<>product img product name</>
						</div>
						<div classname="review-buttons-container">
							<>
								if userid of the review = session id then add
								these buttons
							</>
						</div>
					</div>
				))}
			</div>
			{isOpen && <ModalAddProduct setIsOpen={setIsOpen} />}
		</div>
	);
};
export default StorePage;
