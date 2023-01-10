import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPaymentThunk } from "../../store/payments";

const PaymentTestPage = () => {
	const { paymentId } = useParams();
	const dispatch = useDispatch();
	const payment = useSelector((state) => state.payments[paymentId]);

	useEffect(() => {
		dispatch(getPaymentThunk(paymentId));
	});

	console.log(payment);
	return (
		<div>
			<h1>Payment test page</h1>
		</div>
	);
};

export default PaymentTestPage;
