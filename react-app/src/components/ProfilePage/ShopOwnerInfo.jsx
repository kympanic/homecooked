import { useSelector } from "react-redux";

const ShopOwnerInfo = ({user}) => {
    const products = useSelector((state) => Object.values(state.products));


    const selectedProducts = products?.filter((product) => {
		return product?.userId === parseInt(user.id);
    });
    const reviewArr = selectedProducts.map((el) => Number(el.avgRating))
    const reviewAvg = reviewArr.reduce((a, b) => a + b) / reviewArr.length
    
    const reviewCommenter = () => {
        if (reviewAvg < 2) {
            return "Overwhelmingly Negative"
        } else if (reviewAvg >= 2 && reviewAvg < 3) {
            return "Negative"
        } else if (reviewAvg >= 3 && reviewAvg <= 3.5) {
            return "Mixed"
        } else if (reviewAvg > 3.5 && reviewAvg < 4.5) {
            return "Positive"
        } else if (reviewAvg > 4.5) {
            return "Overwhelmingly Positive"
        }
    }

    return (
        <div>
            <div>{user?.zipcode}
                <p>Calculated location based on zip code</p></div>
            <div>Owner of {user?.shopName}</div>
            <div>Rating: {reviewAvg}({reviewArr.length}), "{reviewCommenter()}"</div>
        </div>
    )
}

export default ShopOwnerInfo;