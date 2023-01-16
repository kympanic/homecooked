import { useSelector } from "react-redux";
import { useState } from "react";
import ModalEditPayment from "../../Modals/EditPayment/ModalEditPayment";
import ModalDeletePayment from "../../Modals/DeletePayment/ModalDeletePayment";
import ModalSubmitOrder from "../../Modals/SubmitOrder/ModalSubmitOrder";
import { getAllCartItems } from "../../../store/session";
import styles from "../../Modals/App.module.css";

const OrderPayments = ({ id }) => {
	const payment = useSelector((state) => state.payments[id]);
	// const sessionUserId = useSelector((state) => state.session.user.id);
	const cartItems = useSelector(getAllCartItems);
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);
	const [isOpenSubmit, setIsOpenSubmit] = useState(false);
	return (
		<div>
			{payment && (
				<div>
					<div>
						<h3>Provider: {payment.provider}</h3>
						<h4>
							Account No: XXXX-XXXX-XXXX-{payment.accountNumber}
						</h4>
						<h4>Expiration:{payment.expiration}</h4>
						{cartItems.length > 0 && (
							<div>
								<button onClick={() => setIsOpenSubmit(true)}>
									Select this payment
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
