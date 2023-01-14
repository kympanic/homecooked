import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import Menu from "../Menu";
import ReviewSwiper from "./ReviewSwiper";
import ReviewSection from "./ReviewSection";
import ProductReviews from "./ProductReviews";
import StoreEditContent from "./StoreEditContent";
import StoreHeader from "./StoreHeader";
import "./storepage.css";
import Product from "../Menu/product";
const zipCodeData = require("zipcode-city-distance");

const StorePage = () => {
	const { userId } = useParams();
	const history = useHistory();
	const vendor = useSelector((state) => state?.users[userId]);
	const products = useSelector((state) => Object.values(state?.products));
	const sessionUserId = useSelector((state) => state?.session.user.id);

	const selectedProducts = products?.filter((product) => {
		return product?.userId === parseInt(userId);
	});

	console.log(selectedProducts, "this is the selectedProducts");

	const selectedReviews = [];
	for (const product in selectedProducts) {
		selectedReviews.push(selectedProducts[product].reviews);
	}
	const convertedReviews = [].concat.apply([], selectedReviews);

	//checking if the shop exists. if not, will redirect to a page that says shop does not exist, go back to home
	if (vendor?.shopName === null) {
		history.push("/");
	}
	//Getting the average rating for the store and turning to float
	let sumOfAverageRatings = selectedProducts?.reduce(function (tot, arr) {
		return tot + parseFloat(arr.avgRating, 2);
	}, 0);
	let stringAvg = (sumOfAverageRatings / selectedProducts?.length).toFixed(2);
	let storeAvg = parseFloat(stringAvg);

	return (
		<div>
			{vendor && (
				<div className="store-page">
					<StoreHeader userId={userId} storeAvg={storeAvg} />
					<div className="content-wrapper">
						<div className="sample-review-container">
							<StoreEditContent
								vendor={vendor}
								sessionUserId={sessionUserId}
								userId={userId}
							/>
							<div>
								{convertedReviews.length > 0 ? (
									<div>
										<ReviewSwiper
											reviews={convertedReviews}
											vendor={vendor}
										/>
									</div>
								) : (
									<div id="shopinfo-zipcode-element">
										<p>There are no reviews yet!</p>
									</div>
								)}
							</div>
						</div>
					</div>
					{vendor.products.length > 0 ? (
						<div className="store-menu-wrapper">
							<div id="storemenu-title-element">
								<h1>Menu</h1>
							</div>
							<div className="storemenu-content-container">
								<Menu />
							</div>
						</div>
					) : (
						<div>
							<p>
								This vendor has nothing for sale yet. Check back
								later!
							</p>
						</div>
					)}
					<div className="breakerimg-container">
						<img
							id="breaker-img"
							src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/watercolor-gd41edecf1_1920.jpg"
							alt="breakerimg"
						/>
					</div>
					<div className="reviews-section">
						{selectedProducts &&
							selectedProducts.map((product) => {
								<div
									key={product.id}
									className="review-container"
								>
									<div className="reviews-content">
										<ProductReviews id={product.id} />;
									</div>
								</div>;
							})}
					</div>
					{/* <ReviewSection
						vendor={vendor}
						reviews={convertedReviews}
						sessionUserId={sessionUserId}
					/> */}
				</div>
			)}
		</div>
	);
};
export default StorePage;
