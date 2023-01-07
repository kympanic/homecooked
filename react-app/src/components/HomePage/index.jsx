import { useState } from "react";
import { useSelector } from "react-redux";
import styles from "../Modals/Modal.button.css";
import ModalDeleteProduct from "../Modals/ModalDeleteProduct";
const HomePage = () => {
	const products = useSelector((state) => Object.values(state.products));
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<h1>Home Page</h1>
			<div>
				{products.map((product) => (
					<li key={product.id}>
						<p>{product.name}</p>
						<p>{product.description}</p>
						<p>{product.avgRating} stars</p>
						<p>{product.price}</p>
						<button
							className={styles.primaryBtn}
							onClick={() => setIsOpen(true)}
						>
							Delete
						</button>
						{isOpen && <ModalDeleteProduct setIsOpen={setIsOpen} />}
					</li>
				))}
			</div>
		</div>
	);
};

export default HomePage;
