import ModalAddProduct from "../Modals/AddProduct/ModalAddProduct";
import ReviewSwiper from "./ReviewSwiper";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "./storepage.css";
import styles from "../Modals/App.module.css";
import { getSingleProduct } from "../../store/products";

const StorePage = () => {
	const { userId } = useParams();
	const dispatch = useDispatch(0);
	const history = useHistory();
	const vendor = useSelector((state) => state?.users[userId]);
	const products = useSelector((state) => state?.users[userId]?.products);
	const reviews = useSelector((state) => state?.users[userId]?.reviews);
	const sessionUserId = useSelector((state) => state?.session.user.id);

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

			{isOpen && <ModalAddProduct setIsOpen={setIsOpen} />}
		</div>
	);
};
export default StorePage;
