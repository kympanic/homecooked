import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getPaymentThunk } from "../../store/payments";
import { getAllCartItems } from "../../store/session";
import ModalAddPaymentNone from "../Modals/AddPaymentNone/ModalAddPaymentNone";
import CartItem from "../CartPage/cartItem";

import styles from "../Modals/App.module.css";
import OrderPayments from "./OrderPayments";
import "./orderpage.css";
import { getOrdersThunk } from "../../store/orders";

const OrderPage = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const products = useSelector((state) => state.products);
	const payments = useSelector((state) => Object.values(state.payments));
	const sessionUser = useSelector((state) => state?.session.user);
	const cartItems = useSelector(getAllCartItems);

	const [totalItems, setTotalItems] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [isOpenPaymentAdd, setIsOpenPaymentAdd] = useState(false);
	if (sessionUser.id !== parseInt(userId)) {
		history.push("/");
	}

	useEffect(() => {
		dispatch(getPaymentThunk(userId));
		dispatch(getOrdersThunk(userId));
	}, [dispatch, userId]);

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

	const handleNoItems = (e) => {
		e.preventDefault();
		history.push("/");
	};

	return (
		<div className="order-page-main-container">
			<h1>THIS IS THE ORDER PAGE</h1>
			<div className="order-page-wrapper">
				<div className="order-page-products">
					<div>
						<div>
							{cartItems.length === 0 && (
								<div>
									<h2>There are no cart items yet!</h2>
								</div>
							)}
							{cartItems &&
								cartItems.map((el) => (
									<div key={el.id} className="cartItemBox">
										<CartItem id={el.id} qty={el.count} />
									</div>
								))}
						</div>
					</div>
					<div>
						{cartItems.length === 0 ? (
							<div>
								<button onClick={handleNoItems}>
									Go buy something!
								</button>
							</div>
						) : (
							<div>
								<span>Total Items: {totalItems}</span>
								<span>
									Total Price: $
									{(
										Math.round(totalPrice * 100) / 100
									).toFixed(2)}
								</span>
							</div>
						)}
					</div>
				</div>
				<div className="order-page-payments">
					<div>
						<h1>Payment Methods</h1>
					</div>

					<div>
						{payments.length === 0 ? (
							<div>
								<h1>No Payment Saved!</h1>
								<button
									className={styles.primaryBtn}
									onClick={() => setIsOpenPaymentAdd(true)}
								>
									Add Payment Info
								</button>
								{isOpenPaymentAdd && (
									<ModalAddPaymentNone
										setIsOpen={setIsOpenPaymentAdd}
									/>
								)}
							</div>
						) : (
							<div>
								{payments &&
									payments.map((payment) => (
										<div key={payment.id}>
											<div className="payment-content">
												<OrderPayments
													id={payment.id}
													cartItems={cartItems}
												/>
											</div>
										</div>
									))}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
