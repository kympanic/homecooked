import { useHistory, useParams } from "react-router";
import { useSelector } from "react-redux";
import Menu from "../Menu";
import ReviewSwiper from "./ReviewSwiper";
import ReviewSection from "./ReviewSection";
import StoreHeader from "./StoreHeader";
import "./storepage.css";
import styles from "../Modals/App.module.css";
// const zipCodeData = require("zipcode-city-distance");

const StorePage = () => {
	const { userId } = useParams();
	const history = useHistory();
	const vendor = useSelector((state) => state?.users[userId]);
	const products = useSelector((state) => Object.values(state?.products));
	const sessionUserId = useSelector((state) => state?.session.user.id);

	const selectedProducts = products?.filter((product) => {
		return product?.userId === parseInt(userId);
	});

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

	console.log(vendor, "this is the vendor");
	return (
		<div>
			{vendor && (
				<div className="store-page">
					<StoreHeader
						userId={userId}
						storeAvg={storeAvg}
						vendor={vendor}
					/>
					{vendor.products.length > 0 ? (
						<div className="store-menu-wrapper">
							<div id="storemenu-title-element">
								<h1>MENU</h1>
							</div>
							<div className="storemenu-content-container">
								<Menu />
							</div>
						</div>
					) : (
						<div className="noproducts-store-menu-wrapper">
							<div>
								<h1>Congratulations On Your Grand Opening!</h1>
							</div>
							<div>
								<button className={styles.addProductBtn}>
									Let's Cook!
								</button>
							</div>
							<div></div>
							<div>
								<img
									src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/Luigi_Risotto.png"
									alt="chef-image"
								/>
							</div>
						</div>
					)}
					<div className="after-menu-container">
						<div className="review-carousel-container">
							{convertedReviews.length > 0 ? (
								<div>
									<div className="review-swiper-component">
										<ReviewSwiper
											reviews={convertedReviews}
										/>
									</div>
									<div className="storepage-middle-right-container">
										<h2 id="storepage-middle-title">
											Never Go Hungry Again
										</h2>
										<p id="homepage-middle-p">
											Homecooked is available on Web, iOS,
											and Android
										</p>
										<div id="homepage-middle-icons">
											<img
												onClick={() =>
													history.push(
														"/ourgroupisthebest"
													)
												}
												src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/googleimgfixed.png"
												alt="google-icon"
											/>
											<img
												onClick={() =>
													history.push(
														"/ourgroupisthebest"
													)
												}
												src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/appleiconfixed.png"
												alt="apple-icon"
											/>
										</div>
									</div>
								</div>
							) : (
								<></>
							)}
						</div>
					</div>
					<div>
						<div>
							{vendor && vendor.reviews.length === 0 ? (
								<></>
							) : (
								<h1 id="storepage-review-title">Reviews</h1>
							)}
						</div>
						<div id="storepage-review-container">
							{convertedReviews &&
								convertedReviews.map((review) => (
									<div id={review.id}>
										<ReviewSection
											vendor={vendor}
											reviewId={review.id}
											sessionUserId={sessionUserId}
										/>
									</div>
								))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
export default StorePage;
