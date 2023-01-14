import { useSelector, useDispatch } from "react-redux";
import { addItem, getCartItemById, updateCount } from "../../store/session";
import { useState } from "react";
import ModalDeleteProduct from "../Modals/DeleteProduct/ModalDeleteProduct";
import ModalEditProduct from "../Modals/EditProduct/ModalEditProduct";
import ModalMenuDescription from "../Modals/MenuDescription/ModalMenuDescription";
import ModalAddReview from "../Modals/AddReview/ModalAddReview";
import "./menuproducts.css";
import styles from "../Modals/App.module.css";

const Product = ({ id, vendor }) => {
	const dispatch = useDispatch();
	const prodId = id;
	const product = useSelector((state) => state.products[prodId]);
	const cartItem = useSelector(getCartItemById(prodId));
	const sessionUserId = useSelector((state) => state?.session.user.id);

	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);
	const [isOpenDescription, setIsOpenDescription] = useState(false);
	const [isOpenReview, setIsOpenReview] = useState(false);
	const addToCart = () => {
		if (cartItem) return dispatch(updateCount(prodId, cartItem.count + 1));
		dispatch(addItem(prodId));
	};

	return (
		<div>
			{product && vendor && sessionUserId && (
				<>
					{vendor.id !== sessionUserId && (
						<div>
							<button
								className={styles.primaryBtn}
								onClick={() => setIsOpenReview(true)}
							>
								Add Review
							</button>
						</div>
					)}
					<div
						onClick={() => setIsOpenDescription(true)}
						className="menu-img-wrapper"
						style={{
							backgroundImage: "url(" + product.imageURL + ")",
						}}
					></div>

					<p>{product?.name}</p>

					<p>
						${(Math.round(product?.price * 100) / 100).toFixed(2)}
					</p>

					<p>Average Rating: {product?.avgRating}</p>

					{vendor.id === sessionUserId ? (
						<div>
							<button
								className={styles.primaryBtn}
								onClick={() => setIsOpenEdit(true)}
							>
								Edit
							</button>
							<button
								className={styles.primaryBtn}
								onClick={() => setIsOpenDelete(true)}
							>
								Delete
							</button>
						</div>
					) : (
						<div className="menu-products-content-buttons">
							<button
								className="add-to-cart-btn"
								onClick={addToCart}
							>
								Add to Cart
							</button>
						</div>
					)}
					{isOpenEdit && (
						<ModalEditProduct
							setIsOpen={setIsOpenEdit}
							product={product}
						/>
					)}
					{isOpenDelete && (
						<ModalDeleteProduct
							setIsOpen={setIsOpenDelete}
							product={product}
						/>
					)}
					{isOpenDescription && (
						<ModalMenuDescription
							setIsOpen={setIsOpenDescription}
							product={product}
						/>
					)}
					{isOpenReview && (
						<ModalAddReview
							setIsOpen={setIsOpenReview}
							product={product}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default Product;
