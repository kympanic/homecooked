import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./forms.css"

const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<>
		<h3>Please Provide Your Details Below</h3>
			<form onSubmit={onLogin}>
				<div>
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input
						name="email"
						type="text"
						placeholder="Email"
						value={email}
						onChange={updateEmail}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						name="password"
						type="password"
						placeholder="Password"
						value={password}
						onChange={updatePassword}
					/>
					<button className="button-form" type="submit">
						Login
					</button>
				</div>
			</form>
		</>
	);
};

export default LoginForm;
