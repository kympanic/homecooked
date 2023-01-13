import { useSelector } from "react-redux";
import { useState } from "react";
import ModalEditPayment from "../../Modals/EditPayment/ModalEditPayment";
import styles from "../../Modals/App.module.css";

const OrderPayments = ({ id }) => {
	const payment = useSelector((state) => state.payments[id]);
	const sessionUserId = useSelector((state) => state.session.user.id);

	console.log(payment, "THIS IS THE PAYMENT");
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);
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
						{isOpenEdit && (
							<ModalEditPayment
								setIsOpen={setIsOpenEdit}
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
