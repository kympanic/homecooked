import { useSelector } from "react-redux";
import { useState } from "react";
import ModalEditPayment from "../../Modals/EditPayment/ModalEditPayment";
import ModalDeletePayment from "../../Modals/DeletePayment/ModalDeletePayment";
import ModalSubmitOrder from "../../Modals/SubmitOrder/ModalSubmitOrder";
import { getAllCartItems } from "../../../store/session";
import styles from "../../Modals/App.module.css";
import "../orderpage.css";

const OrderPayments = ({ id }) => {
	const payment = useSelector((state) => state.payments[id]);
	const sessionUserId = useSelector((state) => state.session.user.id);
	const cartItems = useSelector(getAllCartItems);
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);
	const [isOpenSubmit, setIsOpenSubmit] = useState(false);
	return (
		<div>
			{payment && sessionUserId === payment.userId && (
				<div className="paymentCard">
					<div className="cardInfo">
						<h3 className="cardText">
							Provider:
							<span className="cardInfoText">
								{payment.provider}
							</span>
						</h3>
						<h4 className="cardText">
							Account No:
							<span className="cardInfoText">
								XXXX-XXXX-XXXX-{payment.accountNumber}
							</span>
						</h4>
						<h4 className="cardText">
							Expiration:
							<span className="cardInfoText">
								{payment.expiration}
							</span>
						</h4>
						{payment.orders.length > 0 ? (
							<div className="paymentButtons">
								<button
									className={styles.editPaymentBtn}
									onClick={() => setIsOpenEdit(true)}
								>
									Edit
								</button>
							</div>
						) : (
							<div className="paymentButtons">
								<button
									className={styles.primaryBtn}
									onClick={() => setIsOpenEdit(true)}
								>
									Edit
								</button>
								<button
									className={styles.primaryBtn}
									onClick={() => setIsOpenDelete(true)}
								>
									Delete
								</button>
							</div>
						)}

						{cartItems.length > 0 && (
							<div>
								<button
									onClick={() => setIsOpenSubmit(true)}
									className={styles.submitOrderBtn}
								>
									Select this payment method
								</button>
								{isOpenSubmit && (
									<ModalSubmitOrder
										setIsOpen={setIsOpenSubmit}
										payment={payment}
									/>
								)}
							</div>
						)}
					</div>
					<div>
						{isOpenEdit && (
							<ModalEditPayment
								setIsOpen={setIsOpenEdit}
								payment={payment}
							/>
						)}
						{isOpenDelete && (
							<ModalDeletePayment
								setIsOpen={setIsOpenDelete}
								payment={payment}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default OrderPayments;
