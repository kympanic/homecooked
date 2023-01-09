import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ModalEditProduct from "../Modals/EditProduct/ModalEditProduct";
import ModalDeleteProduct from "../Modals/DeleteProduct/ModalDeleteProduct";
import { useState } from "react";
import styles from "../Modals/App.module.css";

const EditPage = () => {
	const { productId } = useParams();
	const product = useSelector((state) => state.products[productId]);
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);

	return (
		<div>
			<p>Name: {product?.name}</p>
			<p>Description: {product?.description}</p>
			<p>Image Placeholder :{product?.imageUrl}</p>
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
		</div>
	);
};

export default EditPage;
