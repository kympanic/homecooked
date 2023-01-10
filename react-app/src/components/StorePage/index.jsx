import ModalAddProduct from "../Modals/AddProduct/ModalAddProduct";
import ReviewSwiper from "../ReviewSwiper";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersThunk } from "../../store/users";
import { getAllReviewsThunk } from "../../store/reviews";

import "./storepage.css";
import styles from "../Modals/App.module.css";

const StorePage = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();

	const vendor = useSelector((state) => state?.users[userId]);
	const products = useSelector((state) => Object.values(state?.products));
	const reviews = useSelector((state) => Object.values(state?.reviews));
	const sessionUserId = useSelector((state) => state?.session.user.id);

	const history = useHistory();

	// console.log(vendor, "THIS IS TEH VENDOR");
	let userProducts = [];
	for (let i = 0; i < products.length; i++) {
		if ((products[i].userId = userId)) {
			userProducts.push(products[i]);
		}
	}

	let userReviews = [];
	for (let i = 0; i < reviews.length; i++) {
		if ((reviews[i].userId = userId)) {
			userReviews.push(reviews[i]);
		}
	}

	// console.log(userProducts, "THESE ARE THE PRODUCTS FOR THE USER");

	// console.log(userReviews, "THESE ARE THE REVIEWS FOR THE USER");
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
							src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/Vendordemosplash.jpeg"
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
				<ReviewSwiper reviews={reviews} />
			</div>

			{isOpen && <ModalAddProduct setIsOpen={setIsOpen} />}
		</div>
	);
};
export default StorePage;
