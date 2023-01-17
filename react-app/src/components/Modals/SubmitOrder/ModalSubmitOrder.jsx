import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getAllCartItems } from "../../../store/session";
import { reset } from "../../../store/session";
import { useHistory } from "react-router-dom";
import { createOrderThunk } from "../../../store/orders";
const ModalSubmitOrder = ({ setIsOpen, payment }) => {
	const dispatch = useDispatch();
	const cartItems = useSelector(getAllCartItems);
	const userId = useSelector((state) => state.session.user.id);
	const history = useHistory();

	const selectedProductIds = cartItems?.map((item) => {
		return item.id;
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		const newOrder = {
			user_id: userId,
			payment_id: payment.id,
			products_with_order: selectedProductIds,
		};

		await dispatch(createOrderThunk(newOrder));

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
						<h3 className={styles.heading}>You're Almost There!</h3>
					</div>
					<button
						className={styles.closeBtn}
						onClick={() => setIsOpen(false)}
					>
						<RiCloseLine style={{ marginBottom: "-3px" }} />
					</button>
					<div className={styles.modalContent}>
						<div>
							<img
								className="submit-order-img"
								src="https://soundcloud-clone-kpop-seeders.s3.us-west-2.amazonaws.com/imagesforhomecooked/simpsons-eating-i15601.jpeg"
								alt="homereating"
							/>
						</div>
					</div>
					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button
								className={styles.submitBtn}
								onClick={handleSubmit}
							>
								Submit Your Order!
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalSubmitOrder;
