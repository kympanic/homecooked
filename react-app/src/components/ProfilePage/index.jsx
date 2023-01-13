import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";
import ShopOwnerInfo from "./ShopOwnerInfo";
import UserReviews from "./UserReviews";
import ModalEditUserProfile from "../Modals/EditUserProfile/ModalEditUserProfile";
import ModalAddShop from "../Modals/AddShopForms/ModalAddShop";

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
					<h1>Profile Page</h1>
					<div>
						<UserInfo user={user} />
					</div>
					{user.shopName ? (
						<div>
							<ShopOwnerInfo user={user} />
						</div>
					) : null}
					{user.id === sessionUserId ? (
						<div>
							<button
								onClick={() => setIsOpenEditUserProf(true)}
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
					{user.shopName ? (
						<div>
							<Link to={`/store/${userId}`}>
								Click here to go to "{user?.shopName}"
							</Link>
						</div>
					) : user.id === sessionUserId ? (
						<div>
							<button
								onClick={() => setIsOpenAddShop(true)}
							>
								Become a Vendor
							</button>
						</div>
					) : null}
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
						userId={user}
						/>
					)

					}
				</div>
			)}
		</div>
	);
};

export default ProfilePage;