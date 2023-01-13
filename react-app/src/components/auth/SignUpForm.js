import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
	const [errors, setErrors] = useState([]);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [zipcode, setZipcode] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onSignUp = async (e) => {
		e.preventDefault();
		const newUser = {
			username,
			email,
			password,
			phone_number: phoneNumber,
			zipcode,
		};
		if (password === repeatPassword) {
			const data = await dispatch(
				signUp(newUser)
				// signUp(
				// 	username,
				// 	email,
				// 	password,
				// 	phoneNumber,
				// 	zipcode
				// )
			);
			if (data) {
				setErrors(data);
			}
		}
	};

	const updateUsername = (e) => {
		setUsername(e.target.value);
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePhoneNumber = (e) => {
		setPhoneNumber(e.target.value);
	};

	const updateZipcode = (e) => {
		setZipcode(e.target.value);
	};
	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	const updateRepeatPassword = (e) => {
		setRepeatPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<form onSubmit={onSignUp}>
			<div>
				{errors.map((error, ind) => (
					<div key={ind}>{error}</div>
				))}
			</div>
			<div>
				<label>User Name</label>
				<input
					type="text"
					name="username"
					onChange={updateUsername}
					value={username}
				></input>
			</div>
			<div>
				<label>Email</label>
				<input
					type="text"
					name="email"
					onChange={updateEmail}
					value={email}
				></input>
			</div>
			<div>
				<label>Phone Number</label>
				<input
					type="text"
					name="phoneNumber"
					onChange={updatePhoneNumber}
					value={phoneNumber}
				></input>
			</div>
			<div>
				<label>Zipcode</label>
				<input
					type="text"
					name="zipcode"
					onChange={updateZipcode}
					value={zipcode}
				></input>
			</div>
			<div>
				<label>Password</label>
				<input
					type="password"
					name="password"
					onChange={updatePassword}
					value={password}
				></input>
			</div>
			<div>
				<label>Repeat Password</label>
				<input
					type="password"
					name="repeat_password"
					onChange={updateRepeatPassword}
					value={repeatPassword}
					required={true}
				></input>
			</div>
			<button type="submit">Sign Up</button>
		</form>
	);
};

export default SignUpForm;
