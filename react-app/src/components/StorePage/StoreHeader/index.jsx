import "../storepage.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "../../Modals/App.module.css";
import ModalAddShopSplashImage from "../../Modals/AddShopForms/ModalAddShopSplashImage";
import SideBar from "../SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
const zipCodeData = require("zipcode-city-distance");

const StoreHeader = ({ userId, storeAvg }) => {
	const vendor = useSelector((state) => state?.users[userId]);
	const sessionUser = useSelector((state) => state?.session.user);
	const sessionUserId = useSelector((state) => state?.session.user.id);

	const [isOpenShopSplashImg, setIsOpenShopSplashImg] = useState(false);
	const [showNav, setShowNav] = useState(false);
	let zipInfo = zipCodeData.getInfo("zipcode", vendor?.zipcode);
	let location = Object.keys(zipInfo?.data.places)[0];

	const profilePlaceholderImg =
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/defaultprofileIMG.jpg";
	const shopLogoPlaceholderImg =
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/defaultshoplogo.jpg";
	const shopSplashPlaceholderImg =
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/defaultshopsplash.jpg";

	const onSplashError = (e) => {
		e.target.src = shopSplashPlaceholderImg;
	};
	const onShopLogoError = (e) => {
		e.target.src = shopLogoPlaceholderImg;
	};

	const onProfileImgError = (e) => {
		e.target.src = profilePlaceholderImg;
	};

	return (
		<>
			<div className="header-wrapper">
				{isOpenShopSplashImg && (
					<ModalAddShopSplashImage
						setIsOpen={setIsOpenShopSplashImg}
						userId={userId}
					/>
				)}
				{vendor.shopSplashImg && (
					<div className="splash-img-container">
						<img
							className="shop-splash-img"
							src={
								vendor.shopSplashImg
									? vendor.shopSplashImg
									: shopSplashPlaceholderImg
							}
							alt="vendor-splash-img"
							onError={onSplashError}
						/>
					</div>
				)}
				{sessionUserId === vendor.id && (
					<button
						className={styles.editSplashBtn}
						onClick={() => setIsOpenShopSplashImg(true)}
					>
						Edit Splash
					</button>
				)}
				<div className="store-info-container">
					<div className="shop-info-container">
						<div className="shop-logo-img-container">
							<img
								className="shop-logo-img"
								src={
									vendor.shopLogoImg
										? vendor.shopLogoImg
										: shopLogoPlaceholderImg
								}
								alt="vendor-shop-logo"
								onError={onShopLogoError}
							/>
						</div>
						<div className="shopInfoBox">
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
								<div>
									<div>
										<p>Zipcode: {vendor.zipcode}</p>
									</div>
									<div id="shopinfo-zipcode-element">
										<SideBar userId={userId} />
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="user-info-container">
						<div id="userinfo-profile-img-element">
							<img
								id="storepage-profile-img"
								src={
									vendor.profileImg
										? vendor.profileImg
										: profilePlaceholderImg
								}
								alt={vendor.username}
								onError={onProfileImgError}
							/>
						</div>
						<div id="userinfo-profile-name-element">
							<a href={`/users/${vendor.id}`}>
								{vendor.username}
							</a>
						</div>
						<div id="userinfo-profile-email-element">
							<FontAwesomeIcon
								className="header-email-icon"
								icon={faEnvelope}
							/>
							<p>{vendor.email}</p>
						</div>
						<div id="userinfo-profile-phone-element">
							<FontAwesomeIcon
								className="header-email-icon"
								icon={faPhone}
							/>
							<p>{vendor.phoneNumber}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default StoreHeader;
