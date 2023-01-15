import "../storepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "../../Modals/App.module.css";
import ModalAddShopSplashImage from "../../Modals/AddShopForms/ModalAddShopSplashImage";
const zipCodeData = require("zipcode-city-distance");

const StoreHeader = ({ userId, storeAvg }) => {
	const vendor = useSelector((state) => state?.users[userId]);
	const sessionUser = useSelector((state) => state?.session.user);
	const sessionUserId = useSelector((state) => state?.session.user.id);

	const [isOpenShopSplashImg, setIsOpenShopSplashImg] = useState(false);

	let zipInfo = zipCodeData.getInfo("zipcode", vendor?.zipcode);
	let location = Object.keys(zipInfo?.data.places)[0];

	return (
		<>
			<div className="header-wrapper">
				{isOpenShopSplashImg && (
					<ModalAddShopSplashImage
						setIsOpen={setIsOpenShopSplashImg}
						userId={userId}
					/>
				)}
				{vendor.shopSplashImg ? (
					<div className="splash-img-container">
						<img
							className="shop-splash-img"
							src={vendor.shopSplashImg}
							alt="vendor-splash-img"
						/>
					</div>
				) : (
					<div className="splash-img-container">
						<img
							className="shop-splash-img"
							src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/waffle-hearts-gc346a3f34_1920.jpg"
							alt="vendor-splash-img"
						/>
					</div>
				)}
				{sessionUserId === vendor.id && (
					<button
						className={styles.editSplashBtn}
						onClick={() => setIsOpenShopSplashImg(true)}
					>
						Add Edit Splash
					</button>
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
						{vendor.category ? (
							<div id="shopinfo-cuisine-element">
								<p>Cuisine: {vendor.category}</p>
							</div>
						) : (
							<div id="shopinfo-cuisine-element">
								<p>Add Cuisine Category</p>
							</div>
						)}
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
								<p>Location: {location}</p>
							</div>
						) : (
							<div id="shopinfo-zipcode-element">
								<p>Location: {location}</p>
							</div>
						)}
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
						<div id="userinfo-profile-email-element">
							<p>email: {vendor.email}</p>
						</div>
						<div>
							<p>{vendor.phoneNumber}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StoreHeader;
