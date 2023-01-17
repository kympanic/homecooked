import CartItem from "./cartItem";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { getAllCartItems } from "../../store/session";
import ModalAddPayment from "../Modals/AddPayment/ModalAddPayment";
import { useHistory } from "react-router-dom";
import styles from "../Modals/App.module.css";
import "./cartitems.css";

const CartPage = () => {
	const cartItems = useSelector(getAllCartItems);
	const products = useSelector((state) => state.products);
	const history = useHistory();
	//hmmm. totalItems and totalPrice need to update whenever the count of any item changes
	//so we need these to be in a useEffect!
	//and it'll probably be easiest to handle these values as part of state. ok.
	const [totalItems, setTotalItems] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		let itemCount = 0;
		let price = 0;

		//gotta set the quantity of items and the price to zero
		//iterate over the cart
		cartItems.forEach((item) => {
			itemCount += item.count;
			price += products[item.id].price * item.count;
		});
		setTotalItems(itemCount);
		setTotalPrice(price);
	}, [cartItems, totalItems, totalPrice, products]);

	// console.log(cartItems);

	const handleNoItems = (e) => {
		e.preventDefault();
		history.push("/");
	};

	return (
	<div>
		<h1 className="cartPageTitle">Your Cart</h1>
		<div className="cartPage">
			<div>
				<div className="cart">
					{cartItems.length === 0 && (
						<div className="emptyCart">
							<h2 className="emptyCartText">There are no cart items yet!</h2>
						</div>
					)}
					{cartItems &&
						cartItems.map((el) => (
							<div key={el.id}>
								<CartItem id={el.id} qty={el.count} />
							</div>
						)
					)}
				</div>
			</div>
			<div className="checkout">
				{cartItems.length === 0 ? (
					<div className="emptyCheckout">
						<button 
							onClick={handleNoItems}
							className={styles.primaryBtn}
						>
							Go buy something!
						</button>
						<div className="cartpage-middle-right-container">
								<h2 id="storepage-middle-title">
									Never Go Hungry Again
								</h2>
								<p id="homepage-middle-p">
									Homecooked is available on Web, iOS,
									and Android
								</p>
								<div id="homepage-middle-icons">
									<img
										onClick={() =>
											history.push(
												"/ourgroupisthebest"
											)
										}
										src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/googleimgfixed.png"
										alt="google-icon"
									/>
									<img
										onClick={() =>
											history.push(
												"/ourgroupisthebest"
											)
										}
									src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/appleiconfixed.png"
									alt="apple-icon"
								/>
							</div>
						</div>
					</div>
				) : (
					<div className="checkoutBar">
						<span className="totalItemBox">Total Items: <span className="totalItems">{totalItems}</span></span>
						<span className="totalPriceBox">
							Total Price: <span className="totalPrice">
								${(Math.round(totalPrice * 100) / 100).toFixed(2)}</span>
						</span>
						<button
							className={styles.primaryBtn}
							onClick={() => setIsOpen(true)}
						>
							Checkout!
						</button>
						<div className="cartpage-middle-right-container">
								<h2 id="storepage-middle-title">
									Never Go Hungry Again
								</h2>
								<p id="homepage-middle-p">
									Homecooked is available on Web, iOS,
									and Android
								</p>
								<div id="homepage-middle-icons">
									<img
										onClick={() =>
											history.push(
												"/ourgroupisthebest"
											)
										}
										src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/googleimgfixed.png"
										alt="google-icon"
									/>
									<img
										onClick={() =>
											history.push(
												"/ourgroupisthebest"
											)
										}
									src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/images/appleiconfixed.png"
									alt="apple-icon"
								/>
							</div>
						</div>
					</div>
				)}
				{isOpen && <ModalAddPayment setIsOpen={setIsOpen} />}
			</div>
		</div>
	</div>	
	);
};

export default CartPage;
