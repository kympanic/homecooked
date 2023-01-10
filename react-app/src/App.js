import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import StorePage from "./components/StorePage";
import HomePage from "./components/HomePage";
import EditPage from "./components/EditPage";
import CartPage from "./components/CartPage";
import ProfilePage from "./components/ProfilePage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import { getAllProductsThunk } from "./store/products";
import { getAllUsersThunk } from "./store/users";

import CreateReview from "./components/ReviewForm";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	useEffect(() => {
		dispatch(getAllProductsThunk());

		dispatch(getAllUsersThunk());
	});
	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path="/login" exact={true}>
					<LoginForm />
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUpForm />
				</Route>
				<Route path="/users/:userId" exact={true}>
					<ProfilePage />
				</Route>
				<Route path="/cart" exact={true}>
					<CartPage />
				</Route>
				<ProtectedRoute path="/products/:productId/edit" exact={true}>
					<EditPage />
				</ProtectedRoute>
				<ProtectedRoute path="/store/:userId" exact={true}>
					<StorePage />
				</ProtectedRoute>
				<Route path="/" exact={true}>
					<HomePage />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
