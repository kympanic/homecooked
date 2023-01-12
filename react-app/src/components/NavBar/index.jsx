import React from "react";
import {useState, useEffect} from 'react'
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import { useSelector} from 'react-redux'

import { getAllCartItems } from "../../store/session";

const NavBar = () => {
	const cartItems = useSelector(getAllCartItems)

	const [ totalItems, setTotalItems ] = useState(0);

	useEffect(() => {
		let itemCount = 0;
		cartItems.forEach(item => {
			itemCount += item.count
		});
		setTotalItems(itemCount);
	}, [cartItems, totalItems])
	return (
		<nav>
			<ul>
				<li>
					<NavLink to="/" exact={true} activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/login" exact={true} activeClassName="active">
						Login
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/sign-up"
						exact={true}
						activeClassName="active"
					>
						Sign Up
					</NavLink>
				</li>

				<li>
					<LogoutButton />
				</li>
				<li>
					<NavLink to ="/cart" exact={true}>
						Cart
						<div className="cartCounter">{totalItems}</div>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
