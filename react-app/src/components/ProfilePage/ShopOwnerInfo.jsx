import { useSelector } from "react-redux";
import UserAvgRating from "./UserAvgRating";

const ShopOwnerInfo = ({user}) => {
    const products = useSelector((state) => Object.values(state.products));
    // const reviewAvg = products?.filter((product) => {
    //     return product.userId === parseInt(user.id);
    //     }).map(
    //         (el) => Number(el.avgRating)
    //         )?.reduce((a, b) => a + b) / user?.products?.length;
    
    
  

    return (
        <div>
            <div>{user?.zipcode}
                <p>Calculated location based on zip code</p></div>
            <div>Owner of {user?.shopName}</div>
            {user.products.length > 0 ? (
                <div>Rating: <UserAvgRating user={user} products={products}/></div>
            ) : null    
            }
        </div>
    )
}

export default ShopOwnerInfo;