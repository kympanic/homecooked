import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { getAllCartItems } from "../../store/session";
import { login } from "../../store/session";
import logo from "./icon_logo_draft.png"
import "./navbar.css"

const NavBar = () => {
	const cartItems = useSelector(getAllCartItems)
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	
	const demoUser = {
		email: "demo@aa.io",
		password: "password",
	};
	
	const handleClick = (e) => {
		e.preventDefault();
		return dispatch(login(demoUser.email, demoUser.password));
	};

	const [ totalItems, setTotalItems ] = useState(0);

	useEffect(() => {
		let itemCount = 0;
		cartItems.forEach(item => {
			itemCount += item.count
		});
		setTotalItems(itemCount);
	}, [cartItems, totalItems])

	return (
		<ul className="navbar">
			<li className="barLink">
				<NavLink to="/" exact={true} activeClassName="active">
					<img 
						src={logo}
						alt="HomeCooked Logo"
					/>
					Home
				</NavLink>
			</li>
			{sessionUser ? (
				<>
					<li className="barLink">
						<LogoutButton />
					</li>
					<li className="barLink">
						<NavLink to={`/users/${sessionUser.id}`} exact={true}>
							{sessionUser.username}
						</NavLink>
					</li>
				</>
			) : (
				<>
					<li className="barLink">
						<NavLink to="/login" exact={true} activeClassName="active">
							Login
						</NavLink>
					</li>
					<li className="barLink">
						<NavLink
							to="/sign-up"
							exact={true}
							activeClassName="active"
						>
							Sign Up
						</NavLink>
					</li>
					<li className="barLink">
						<button onClick={handleClick}>
							Demo Login
						</button>
					</li>
				</>	
			)}
			<li className="barLink">
				<NavLink to ="/cart" exact={true}>
				<FontAwesomeIcon className="shopping" icon={faShoppingCart} />
					Cart
					<div className="cartCounter">{totalItems}</div>
				</NavLink>
			</li>
		</ul>
	);
};

export default NavBar;
