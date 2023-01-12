import { useSelector } from "react-redux";

const ShopOwnerInfo = ({user}) => {
    const products = useSelector((state) => Object.values(state.products));

    console.log(products, "all products")
    console.log(user.products, "user products")
    const selectedProducts = products?.filter((product) => {
		return product?.userId === parseInt(user.id);
	});
    console.log(selectedProducts)
    
    return (
        <div>
            <div>{user?.zipcode}
                <p>Calculated location based on zip code</p></div>
            <div>Owner of {user?.shopName}</div>
            <div>Amalgamate Review Average. (Number of Reviews) "Commentary on average"</div>
        </div>
    )
}

export default ShopOwnerInfo;