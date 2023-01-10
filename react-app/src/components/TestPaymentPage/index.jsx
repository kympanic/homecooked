import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPaymentThunk } from "../../store/payments";

//This page is for testing editing and deleting payments
const TestPaymentPage = ({ user }) => {
	const { paymentId } = useParams();
	const dispatch = useDispatch();
	const payment = useSelector((state) => state.payments[paymentId]);

	console.log(payment);

	useEffect(() => {
		dispatch(getPaymentThunk(paymentId));
	}, [dispatch]);

	return (
		<div>
			<h1>Payment test page</h1>
			<p>Account Number: XXXX-XXXX-XXXX-{payment?.accountNumber}</p>
			<p>Provider: {payment?.provider}</p>
			<p>Expiration: {payment?.expiration}</p>
		</div>
	);
};

export default TestPaymentPage;
