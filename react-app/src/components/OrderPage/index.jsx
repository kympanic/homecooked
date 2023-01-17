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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const OrderPage = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const history = useHistory();
	const products = useSelector((state) => state.products);
	const payments = useSelector((state) => Object.values(state.payments));
	const sessionUser = useSelector((state) => state?.session.user);
	const cartItems = useSelector(getAllCartItems);

	const selectedPayments = payments?.filter((payment) => {
		return payment.userId === sessionUser?.id;
	});

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
			<h1 className="cartPageTitle">Checkout</h1>
			<div className="cartPage">
				<div className="order-page-products">
					<div>
						<div className="cart">
							{cartItems.length === 0 && (
								<div className="emptyCart">
									<h2 className="emptyCartText">
										There are no cart items yet!
									</h2>
									<button
										onClick={handleNoItems}
										className={styles.buySomethingBtn}
									>
										Go buy something!
									</button>
								</div>
							)}
							{cartItems &&
								cartItems.map((el) => (
									<div>
										<div key={el.id}>
											<CartItem
												id={el.id}
												qty={el.count}
											/>
										</div>
										<div id="select-payment-box">
											<h1 classname="select-payment-text">
												Looks Good? Select a Payment and
												Eat!
											</h1>
											<FontAwesomeIcon
												className="arrow-right"
												icon={faArrowRight}
											/>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
				<div className="order-page-payments">
					<div>
						<h1 className="paymentMethodsTitle">Payment Methods</h1>
					</div>
					<div>
						{cartItems.length === 0 ? (
							<></>
						) : (
							<div className="checkoutBar">
								<span className="totalItemBox">
									Total Items:{" "}
									<span className="totalItems">
										{totalItems}
									</span>
								</span>
								<span className="totalPriceBox">
									Total Price:{" "}
									<span className="totalPrice">
										$
										{(
											Math.round(totalPrice * 100) / 100
										).toFixed(2)}
									</span>
								</span>
							</div>
						)}
					</div>
					<div>
						{selectedPayments.length === 0 ? (
							<div className="no-payment-saved-wrapper">
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
