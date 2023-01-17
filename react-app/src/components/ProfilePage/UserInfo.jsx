import './userprofileinfo.css'
import ShopOwnerInfo from './ShopOwnerInfo';
import brokenImg from './no-image.png'

const UserInfo = ({user}) => {
    return (
        <div className="userInfoBox">
            <div className="userProfileImgBox">
                <img
                className="userProfileImg" 
                src={user?.profileImg}
                alt=' '
                />
            </div>
            <div className="usernameBox">
                <h1 className="usernameDisplay">{user?.username}</h1>
            {user.shopName ? (
				<div className="shopownerInfo">
					<ShopOwnerInfo user={user} />
				</div>) : null}
            </div>
			
        </div>
    )
}

export default UserInfo;