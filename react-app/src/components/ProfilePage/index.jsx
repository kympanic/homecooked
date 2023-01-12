import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UserInfo from "./UserInfo";
import ShopOwnerInfo from "./ShopOwnerInfo";
import UserReviews from "./UserReviews";

//note that this page is a public page!
//the nav bar button that links to it should get which page it sends you to thru session
//but!!!!!!!
//other users' profiles should be viewable by clicking on their usernames on reviews or on their stores

const ProfilePage = () => {
	const sessionUserId = useSelector((state) => state?.session.user.id);
	const { userId } = useParams();
	const user = useSelector((state) => state?.users[userId]);
	console.log(user);

	return (
		<div>
			<h1>Profile Page</h1>
			<div>
				<UserInfo user={user} />
			</div>
			{user?.shopName ? (
				<div>
					<ShopOwnerInfo user={user} />
				</div>
			) : null}
			{user?.id === sessionUserId ? (
				<div>
					<button>Edit Public Profile</button>
					<div>
						{" "}
						Note that this is the only means to edit profile image
						(when have you ever put in a profile image on sign up?)
					</div>
					<button>Change Password</button>
					<div>
						{" "}
						Note that this is the only way to change your password.
					</div>
				</div>
			) : null}
			{user?.shopName ? (
				<div>
					<Link to={`/store/${userId}`}>
						Click here to go to "{user?.shopName}"
					</Link>
				</div>
			) : user?.id === sessionUserId ? (
				<div>
					<button>Become a Vendor</button>
					<div>
						{" "}
						Note that this and a nav bar button are the only way to
						access this form.{" "}
					</div>
				</div>
			) : null}
			<div>
				<UserReviews user={user} />
			</div>
		</div>
	);
};

export default ProfilePage;
