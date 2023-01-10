import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalEditProduct from "../Modals/EditProduct/ModalEditProduct";
import ModalDeleteProduct from "../Modals/DeleteProduct/ModalDeleteProduct";
import ModalAddReview from "../Modals/AddReview/ModalAddReview";
import { useState } from "react";
import styles from "../Modals/App.module.css";
import { useEffect } from "react";
import { getAllProductsThunk } from "../../store/products";

//This page is for testing product editing and deleting. As well as adding a review to a product
const TestEditProductPage = () => {
	const { productId } = useParams();
	const dispatch = useDispatch();
	const product = useSelector((state) => state.products[productId]);
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);
	const [isOpenReview, setIsOpenReview] = useState(false);

	useEffect(() => {
		dispatch(getAllProductsThunk());
	}, [dispatch]);

	return (
		<div>
			<p>Name: {product?.name}</p>
			<p>Description: {product?.description}</p>
			<p>Image:</p>
			<img
				src={product?.imageURL}
				alt={product?.name}
				style={{ width: "300px" }}
			/>
			<p>$ {product?.price}</p>
			<div>
				<button
					className={styles.primaryBtn}
					onClick={() => setIsOpenDelete(true)}
				>
					Delete
				</button>
				{isOpenDelete && (
					<ModalDeleteProduct
						setIsOpen={setIsOpenDelete}
						product={product}
					/>
				)}
			</div>
			<div>
				<button
					className={styles.primaryBtn}
					onClick={() => setIsOpenEdit(true)}
				>
					Edit
				</button>
				{isOpenEdit && (
					<ModalEditProduct
						setIsOpen={setIsOpenEdit}
						product={product}
					/>
				)}
			</div>
			<div>
				<button
					className={styles.primaryBtn}
					onClick={() => setIsOpenReview(true)}
				>
					Add Review
				</button>
				{isOpenReview && (
					<ModalAddReview
						setIsOpen={setIsOpenReview}
						product={product}
					/>
				)}
			</div>
		</div>
	);
};

export default TestEditProductPage;
