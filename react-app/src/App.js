import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar/index";
import StorePage from "./components/StorePage";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";
import ProfilePage from "./components/ProfilePage";
import OrderPage from "./components/OrderPage";
import PageNotFound from "./components/PageNotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import { getAllUsersThunk } from "./store/users";
import { getAllProductsThunk } from "./store/products";
import { getAllReviewsThunk } from "./store/reviews";
import TestMenuPage from "./components/TestMenuPage";
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
		dispatch(getAllUsersThunk());
		dispatch(getAllProductsThunk());
		dispatch(getAllReviewsThunk());
	});

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			<NavBar />
			<Switch>
				<Route path="/" exact={true}>
					<HomePage />
				</Route>
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
				<ProtectedRoute path="/orders/:userId" exact={true}>
					<OrderPage />
				</ProtectedRoute>
				<ProtectedRoute path="/store/:userId" exact={true}>
					<StorePage />
				</ProtectedRoute>
				<ProtectedRoute path="/payments/:paymentId">
					<TestPaymentPage />
				</ProtectedRoute>
				<ProtectedRoute path="/products/:productId/edit" exact={true}>
					<TestEditProductPage />
				</ProtectedRoute>
				<ProtectedRoute path="/reviews/:reviewId/edit" exact={true}>
					<TestEditReviewPage />
				</ProtectedRoute>
				<Route path="/">
					<PageNotFound />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
