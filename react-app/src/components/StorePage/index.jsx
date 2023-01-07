import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "../Modals/Modal.button.css";
import ModalDeleteProduct from "../Modals/ModalDeleteProduct";

const StorePage = () => {
	const { userId } = useParams();
	const dispatch = useDispatch();
	const products = useSelector((state) => Object.values(state.products));

	const selectedProducts = [];

	products.map((product) => {
		if (product?.userId === userId) {
			selectedProducts.push(product);
		}
	});

	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<h1>Store Page</h1>
			<div>
				{selectedProducts.map((product) => (
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
export default StorePage;
