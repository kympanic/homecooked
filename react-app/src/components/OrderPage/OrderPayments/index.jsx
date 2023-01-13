import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ModalEditPayment from "../../Modals/EditPayment/ModalEditPayment";
import ModalDeletePayment from "../../Modals/DeletePayment/ModalDeletePayment";
import styles from "../../Modals/App.module.css";

const OrderPayments = ({ id }) => {
	const payment = useSelector((state) => state.payments[id]);
	const sessionUserId = useSelector((state) => state.session.user.id);

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
						<button onClick={() => setIsOpenSubmit(true)}>
							Checkout!
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default OrderPayments;
