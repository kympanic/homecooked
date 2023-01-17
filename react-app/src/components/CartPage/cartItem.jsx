import { useSelector, useDispatch } from "react-redux";
import { updateCount, removeItem } from "../../store/session";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cartitems.css";
import styles from "../Modals/App.module.css";

const CartItem = ({ id, qty }) => {
	const [count, setCount] = useState(qty);
	const dispatch = useDispatch();
	const prodId = id;
	const product = useSelector((state) => state.products[prodId]);
	const user = useSelector((state) => state.users[product.userId]);
	useEffect(() => {
		setCount(qty);
	}, [qty]);

	//dealing with broken images
	const placeHolderImg =
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/defaultshopsplash.jpg";

	const productPlaceholder =
		"https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/shop+pictures/default-food-image.jpeg";
	const onImageError = (e) => {
		e.target.src = placeHolderImg;
	};

	const onProductError = (e) => {
		e.target.src = productPlaceholder;
	};

	return (
		<div className="cartItemBox">
			<Link className="vendorInfo" to={`/store/${user.id}`}>
				<div className="vendorImgBox">
					<img
						className="cartVendorImg"
						src={user?.shopSplashImg}
						alt={user?.shopName}
						onError={onImageError}
					/>
				</div>
				<div className="vendorNameBox">{user?.shopName}</div>
			</Link>
			<div className="itemInfo">
				<div className="itemImgBox">
					<img
						className="cart-product-img"
						src={product?.imageURL}
						alt={product?.name}
						onError={onProductError}
					/>
				</div>
				<div className="nameAndPriceBox">
					<div className="itemName">{product?.name}</div>
					<div>
						<span className="itemPrice">
							$
							{(Math.round(product?.price * 100) / 100).toFixed(
								2
							)}
						</span>
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
				<div className="qtyAndDescBox">
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
							onClick={() =>
								dispatch(updateCount(product.id, qty + 1))
							}
						>
							+
						</button>
						<button
							className="cart-item-button"
							onClick={() =>
								dispatch(updateCount(product.id, qty - 1))
							}
						>
							-
						</button>
					</div>
					<div className="itemDesc">{product?.description}</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
