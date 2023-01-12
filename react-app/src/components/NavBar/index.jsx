import React from "react";
import {useState, useEffect} from 'react'
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({cart}) => {
	const [cartCount, setCartCount] = useState(0)
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
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;
