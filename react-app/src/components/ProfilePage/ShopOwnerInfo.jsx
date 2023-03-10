import { useSelector } from "react-redux";
import UserAvgRating from "./UserAvgRating";
import './userprofileinfo.css'
const zipCodeData = require("zipcode-city-distance");

const ShopOwnerInfo = ({user}) => {
    const products = useSelector((state) => Object.values(state.products));
    let zipInfo = zipCodeData.getInfo("zipcode", user?.zipcode);
	let location = Object.keys(zipInfo?.data.places)[0];
    
    
  

    return (
        <div className="shopownerInfoBox">
            <div>
                <p>Located in: {location}</p>
            </div>
            <div>Owner of {user?.shopName}</div>
            {user.products.length > 0 ? (
                <div>Rating: <UserAvgRating user={user} products={products}/></div>
            ) : null    
            }
        </div>
    )
}

export default ShopOwnerInfo;