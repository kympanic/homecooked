import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAllCartItems } from "../../../store/session";
import { reset } from "../../../store/session";
import { useHistory } from "react-router-dom";
import { createOrderThunk } from "../../../store/orders";
const ModalSubmitOrder = ({ setIsOpen, payment }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(getAllCartItems);
	const userId = useSelector((state) => state.session.user.id);
	const history = useHistory();
	const products = useSelector((state) => Object.values(state.products));

	console.log(cartItems, "these are teh cart items");
	console.log(products, "these are all the products");
	console.log(payment, "this is the payment");
	const selectedProductIds = cartItems?.map((item) => {
		return item.id;
	});

	const selectedProductNames = products.map((product) => {
		return product.name;
	});
	console.log(selectedProductNames, "These are the names");
	console.log(selectedProductIds, "these are the product ids");

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newOrder = {
			user_id: userId,
			payment_id: payment.id,
			products_with_order: selectedProductIds,
		};

		dispatch(createOrderThunk(newOrder));

		setIsOpen(false);
		dispatch(reset());
		history.push("/");
		alert("Thank you for your Order!");
	};
	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>Food is in the Oven!</h5>
					</div>
					<button
						className={styles.closeBtn}
						onClick={() => setIsOpen(false)}
					>
						<RiCloseLine style={{ marginBottom: "-3px" }} />
					</button>
					<div className={styles.modalContent}></div>
					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button
								className={styles.submitBtn}
								onClick={handleSubmit}
							>
								Submit Your Order!
							</button>
							<button
								className={styles.cancelBtn}
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalSubmitOrder;
