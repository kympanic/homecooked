import "./sidebar.css";
import styles from "../../Modals/App.module.css";
import ModalChangeShopName from "../../Modals/AddShopForms/ModalChangeShopName";
import ModalChangeShopCategory from "../../Modals/AddShopForms/ModalChangeShopCategory";
import ModalAddProduct from "../../Modals/AddProduct/ModalAddProduct";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faBowlFood,
	faSignature,
	faStore,
} from "@fortawesome/free-solid-svg-icons";
const SideBar = ({ userId }) => {
	const sidebarCollapsed = localStorage.getItem("sidebar-collapsed");
	const [isOpenChangeName, setIsOpenChangeName] = useState(false);
	const [isOpenChangeCat, setIsOpenChangeCat] = useState(false);
	const [isExpanded, setIsExpanded] = useState(
		sidebarCollapsed ? false : true
	);
	const [isOpen, setIsOpen] = useState(false);

	const handleToggler = () => {
		if (isExpanded) {
			setIsExpanded(false);
			localStorage.setItem("sidebar-collapsed", true);
			return;
		}
		setIsExpanded(true);
		localStorage.removeItem("sidebar-collapsed");
	};

	return (
		<div className={isExpanded ? "Sidebar" : "Sidebar collapsed"}>
			<div className="sidebar-header">
				<FontAwesomeIcon
					className="sidebar-icon-header"
					onClick={handleToggler}
					icon={faBars}
				/>
				<h3 className="sidebar-text">Edit Shop</h3>
			</div>
			<div classname="sidebar-items">
				<div className="item">
					<FontAwesomeIcon
						className="sidebar-icon"
						icon={faSignature}
					/>
					<span
						className="sidebar-text"
						onClick={() => setIsOpenChangeName(true)}
					>
						Edit Shop Name
					</span>
				</div>
				<div className="item">
					<FontAwesomeIcon className="sidebar-icon" icon={faStore} />
					<span
						className="sidebar-text"
						onClick={() => setIsOpenChangeCat(true)}
					>
						Edit Shop Cuisine
					</span>
				</div>
				<div className="item">
					<FontAwesomeIcon
						className="sidebar-icon"
						icon={faBowlFood}
					/>
					<span
						className="sidebar-text"
						onClick={() => setIsOpen(true)}
					>
						Create Product
					</span>
				</div>

				<div />

				{isOpen && <ModalAddProduct setIsOpen={setIsOpen} />}
				{isOpenChangeName && (
					<ModalChangeShopName
						setIsOpen={setIsOpenChangeName}
						userId={userId}
					/>
				)}
				{isOpenChangeCat && (
					<ModalChangeShopCategory
						setIsOpen={setIsOpenChangeCat}
						userId={userId}
					/>
				)}
			</div>
		</div>
	);
};

export default SideBar;