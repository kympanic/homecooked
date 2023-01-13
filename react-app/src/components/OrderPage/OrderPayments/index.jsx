import { useSelector } from "react-redux";
import { useState } from "react";

const OrderPayments = ({ id }) => {
	const payment = useSelector((state) => state.payments[id]);
	const sessionUserId = useSelector((state) => state.session.user.id);

	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);
	return (
		<div>
			<h1>ORDER PAYMENTS</h1>
		</div>
	);
};

export default OrderPayments;
