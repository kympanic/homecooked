import "./userprofileinfo.css";
import ShopOwnerInfo from "./ShopOwnerInfo";

const UserInfo = ({ user }) => {
	const profilePlaceholderImg =
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/defaultprofileIMG.jpg";
	return (
		<div className="userInfoBox">
			<div className="userProfileImgBox">
				<img
					className="userProfileImg"
					src={
						user?.profileImg
							? user?.profileImg
							: profilePlaceholderImg
					}
					alt="Whoops! It looks like your link is broken."
				/>
			</div>
			<div className="usernameBox">
				<h1 className="usernameDisplay">{user?.username}</h1>
				{user.shopName ? (
					<div className="shopownerInfo">
						<ShopOwnerInfo user={user} />
					</div>
				) : null}
			</div>
		</div>
	);
};

export default UserInfo;
