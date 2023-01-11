import { useSelector, useDispatch } from "react-redux";
import { addItem, getCartItemById, updateCount } from "../../store/session";
import "./menuproducts.css";

const Product = ({ id }) => {
	const dispatch = useDispatch();
	const prodId = id;
	const product = useSelector((state) => state.products[prodId]);
	const cartItem = useSelector(getCartItemById(prodId));
	const addToCart = () => {
		if (cartItem) return dispatch(updateCount(prodId, cartItem.count + 1));
		dispatch(addItem(prodId));
	};

	return (
		<div className="menu-products-container">
			<div className="menu-products-left-container">
				<div id="menu-product-img-container">
					<img
						id="menu-product-img"
						src={product?.imageURL}
						alt={product?.name}
					/>
				</div>
			</div>
			<div className="menu-products-right-container">
				<div className="menu-products-content-header">
					<div>{product?.name}</div>
				</div>
				<div className="menu-products-content-body">
					<span>${product?.price}</span>
					<div>{product?.avgRating}</div>
					<div>{product?.category}</div>
				</div>
				<div className="menu-products-content-footer">
					<div>{product?.description}</div>
				</div>
				<div className="menu-products-content-buttons">
					<button onClick={addToCart}>Add to Cart</button>
				</div>
				<div></div>
			</div>
		</div>
	);
};

export default Product;
