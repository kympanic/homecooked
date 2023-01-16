import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createPaymentThunk } from "../../../store/payments";
import { useHistory } from "react-router-dom";

const ModalAddPayment = ({ setIsOpen }) => {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.session.user.id);
	const history = useHistory();

	const [errors, setErrors] = useState([]);
	const [provider, setProvider] = useState("");
	const [accountNumber, setAccountNumber] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");

	const updateAccountNumber = (e) => {
		setAccountNumber(e.target.value);
	};
	const updateProvider = (e) => {
		setProvider(e.target.value);
	};

	const updateMonth = (e) => {
		setMonth(e.target.value);
	};

	const updateYear = (e) => {
		setYear(e.target.value);
	};

	//make sure to change the provider and account number and expiration into STRINGS!
	const handleSubmit = async (e) => {
		e.preventDefault();

		const newPayment = {
			user_id: userId,
			provider,
			account_number: accountNumber,
			expiration: month.toString() + year.toString(),
		};

<<<<<<< HEAD
		let data = dispatch(createPaymentThunk(newPayment));
=======
		let data = await dispatch(createPaymentThunk(newPayment));
>>>>>>> 8ec113c20d3806aacc10b717db39fe9a2af108b9
		if (data) {
			setErrors(data);
		} else {
			setIsOpen(false);
			const path = `/orders/${userId}`;
			history.push(path);
		}
	};

	const handleExistingPayment = (e) => {
		e.preventDefault();

		const path = `/orders/${userId}`;
		history.push(path);
	};

	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>
							Add a Payment Method!
						</h5>
					</div>
					<button
						className={styles.closeBtn}
						onClick={() => setIsOpen(false)}
					>
						<RiCloseLine style={{ marginBottom: "-3px" }} />
					</button>
					<div className={styles.modalContent}>
						<div>
							<h6>Already saved your payment?</h6>
							<button
								className={styles.cancelBtn}
								onClick={handleExistingPayment}
							>
								Use Existing Payment!
							</button>
						</div>
						{""}
						<form>
							<div>
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
							</div>
							<div>
								<label>Provider: </label>
								<select
									value={provider}
									onChange={updateProvider}
								>
									<option value="--">--</option>
									<option value="Mastercard">
										Mastercard
									</option>
									<option value="Visa">Visa</option>
									<option value="American Express">
										American Express
									</option>
								</select>
							</div>
							<div>
								<label>Account Number: </label>
								<input
									onKeyPress={(event) => {
										if (!/[0-9]/.test(event.key)) {
											event.preventDefault();
										}
									}}
									type="text"
									name="accountNumber"
									onChange={updateAccountNumber}
									value={accountNumber}
									maxLength={16}
								/>
							</div>
							<div>
								<label>Expiration Month: </label>
								<select value={month} onChange={updateMonth}>
									<option value="--">--</option>
									<option value="01">January</option>
									<option value="02">February</option>
									<option value="03">March</option>
									<option value="04">April</option>
									<option value="05">May</option>
									<option value="06">June</option>
									<option value="07">July</option>
									<option value="08">August</option>
									<option value="09">September</option>
									<option value="10">October</option>
									<option value="11">November</option>
									<option value="12">December</option>
								</select>
							</div>
							<div>
								<label>Expiration Year: </label>
								<select value={year} onChange={updateYear}>
									<option value="--">--</option>
									<option value="2023">2023</option>
									<option value="2024">2024</option>
									<option value="2025">2025</option>
									<option value="2026">2026</option>
									<option value="2027">2027</option>
									<option value="2028">2028</option>
									<option value="2029">2029</option>
									<option value="2030">2030</option>
								</select>
							</div>
						</form>
					</div>
					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button
								className={styles.submitBtn}
								onClick={handleSubmit}
							>
								Add Payment
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

export default ModalAddPayment;
