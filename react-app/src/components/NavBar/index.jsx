import React from "react";
import { NavLink, Link } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch} from 'react-redux'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { getAllCartItems } from "../../store/session";
import { login } from "../../store/session";
import logo from "./icon_logo_draft.png"
import "./navbar.css"
import ModalAddShop from "../Modals/AddShopForms/ModalAddShop";

const NavBar = () => {
	const cartItems = useSelector(getAllCartItems)
	const sessionUser = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const [isOpenAddShop, setIsOpenAddShop] = useState(false);

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
						className="barImg"
						src={logo}
						alt="HomeCooked Logo"
					/>
					<div className="barWords">Home</div>
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
					{sessionUser.shopName ? (
						<li className="barLink">
							<Link to={`/store/${sessionUser.id}`}>
								Click here to go to "{sessionUser?.shopName}"
							</Link>
						</li>
					) : (
						<li className="barLink">
							<button onClick={() => setIsOpenAddShop(true)}>
								Become a Vendor
							</button>
						</li>
					)}
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
					<div className="cartIcon">
						<FontAwesomeIcon className="shopping" icon={faShoppingCart} />
						Cart {" "}
					</div>

					<div className="cartCounter">{" "}{totalItems}</div>
				</NavLink>
			</li>
			{isOpenAddShop && (
				<ModalAddShop
					setIsOpen={setIsOpenAddShop}
					userId={sessionUser.id}
				/>
			)}
		</ul>
	);
};

export default NavBar;
