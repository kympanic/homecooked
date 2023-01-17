import { useSelector, useDispatch } from "react-redux";
import { updateCount, removeItem } from "../../store/session";
import { useState, useEffect } from "react";
import "./cartitems.css";
import styles from "../Modals/App.module.css";

const CartItem = ({ id, qty }) => {
	const [count, setCount] = useState(qty);
	const dispatch = useDispatch();
	const prodId = id;
	const product = useSelector((state) => state.products[prodId]);
	const user = useSelector((state) => state.users[product.userId])
	useEffect(() => {
		setCount(qty);
	}, [qty]);

	return (
		<div className="cartItemBox">
			<div className="vendorInfo">
				<div className="vendorImgBox">
					<img 
						className="cartVendorImg"
						src={user?.shopSplashImg}
						alt={user?.shopName}
					/>
				</div>
				<div className="vendorNameBox">
					{user?.shopName}
				</div>
			</div>
			<div className="itemImgBox">
				<img
					className="cart-product-img"
					src={product?.imageURL}
					alt={product?.name}
				/>
			</div>
			<div>{product?.name}</div>
			<div>
				<span>${(Math.round(product?.price * 100) / 100).toFixed(2)}</span>
			</div>
			<div>{product?.description}</div>
			<div className="quantityButtons">
				<label htmlFor="qty">Qty.</label>
				<input
					onChange={(e) => {
						setCount(e.target.value);
					}}
					onBlur={() =>
						dispatch(updateCount(product.id, Number(count)))
					}
					min="1"
					type="number"
					id="qty"
					name="qty"
					value={count}
					className="quantityBobble"
				/>
				<button
					className="cart-item-button"
					onClick={() => dispatch(updateCount(product.id, qty + 1))}
				>
					+
				</button>
				<button
					className="cart-item-button"
					onClick={() => dispatch(updateCount(product.id, qty - 1))}
				>
					-
				</button>
			</div>
			<div>
				<button 
					onClick={() => dispatch(removeItem(prodId))}
					className={styles.primaryBtn}
				>
					Remove item
				</button>
			</div>
		</div>
	);
};

export default CartItem;
