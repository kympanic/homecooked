import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useState, useEffect } from "react";
import { useSelector} from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart, faSearch} from "@fortawesome/free-solid-svg-icons";
import { getAllCartItems } from "../../store/session";
import { getAllUsersThunk } from "../../store/users";

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

	const stores = useSelector(getAllUsersThunk)
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
					<FontAwesomeIcon className="shopping" icon={faShoppingCart} />
						Cart
						<div className="cartCounter">{totalItems}</div>
					</NavLink>
				</li>

			</ul>
		</nav>
	);
};

export default NavBar;
