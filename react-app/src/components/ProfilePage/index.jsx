import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";
import UserReviews from "./UserReviews";
import ModalEditUserProfile from "../Modals/EditUserProfile/ModalEditUserProfile";
import ModalAddShop from "../Modals/AddShopForms/ModalAddShop";
import styles from "../Modals/App.module.css";
import "./userprofileinfo.css";

//note that this page is a public page!
//the nav bar button that links to it should get which page it sends you to thru session
//but!!!!!!!
//other users' profiles should be viewable by clicking on their usernames on reviews or on their stores

const ProfilePage = () => {
	const sessionUserId = useSelector((state) => state.session.user.id);
	const { userId } = useParams();
	const user = useSelector((state) => state.users[userId]);
	const [isOpenEditUserProf, setIsOpenEditUserProf] = useState(false);
	const [isOpenAddShop, setIsOpenAddShop] = useState(false);

	return (
		<div>
			{user && userId && (
				<div>
					<div className="userInfoAndStoreLinkBox">
						<div className="userInfo">
							<div className="basicUserBox">
								<UserInfo user={user} />
							</div>
							{/* {user.shopName ? (
								<div className="shopownerInfo">
									<ShopOwnerInfo user={user} />
								</div>
							) : null} */}
							{user.id === sessionUserId ? (
								<div className="editProfileBox">
									<button
										onClick={() =>
											setIsOpenEditUserProf(true)
										}
										className={styles.primaryBtn}
									>
										Edit Public Profile
									</button>
									{/* <button>Change Password</button>
								<div>
									{" "}
									Note that this is the only way to change your
									password.
								</div> */}
								</div>
							) : null}
						</div>
						{user.shopName ? (
							<div
								style={{ zIndex: "0" }}
								className="storeLinkBox"
							>
								<Link to={`/store/${userId}`}>
									<img
										className="storeLinkImg"
										src={user.shopSplashImg}
										alt="ShopSplash"
									/>
									<p className="storeLinkText">
										Click here to go to "{user?.shopName}"
									</p>
								</Link>
							</div>
						) : user.id === sessionUserId ? (
							<div className="storeLinkBox">
								<button
									onClick={() => setIsOpenAddShop(true)}
									className="addStoreButton"
								>
									Become a Vendor
								</button>
							</div>
						) : null}
					</div>
					<div>
						<UserReviews user={user} />
					</div>
					{isOpenEditUserProf && (
						<ModalEditUserProfile
							setIsOpen={setIsOpenEditUserProf}
							userId={userId}
						/>
					)}
					{isOpenAddShop && (
						<ModalAddShop
							setIsOpen={setIsOpenAddShop}
							userId={userId}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export default ProfilePage;
