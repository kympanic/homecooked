import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { editProductThunk } from "../../../store/products";
import { useState } from "react";
import { useSelector } from "react-redux";

const ModalEditProduct = ({ setIsOpen, product }) => {
	const userId = useSelector((state) => state.session.user.id);

	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [price, setPrice] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const editedProduct = {
			id: product.id,
			name,
			description,
			image_url: imageUrl,
			price,
			user_id: userId,
		};
		dispatch(editProductThunk(editedProduct));
		setIsOpen(false);
	};

	//inside of modalContent div, customize your own info
	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>Edit Your Meal!</h5>
					</div>
					<button
						className={styles.closeBtn}
						onClick={() => setIsOpen(false)}
					>
						<RiCloseLine style={{ marginBottom: "-3px" }} />
					</button>
					<div className={styles.modalContent}>
						<form onSubmit={handleSubmit}>
							<div>
								<label htmlFor="name">Name:</label>
								<input
									type="text"
									name="name"
									value={name}
									placeholder={product.name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor="imageUrl">
									Your Food Image Url:
								</label>
								<input
									type="url"
									name="imageUrl"
									value={imageUrl}
									placeholder={product.imageUrl}
									onChange={(e) =>
										setImageUrl(e.target.value)
									}
								/>
							</div>
							<div>
								<label htmlFor="description">
									Description:
								</label>
								<input
									type="text"
									name="description"
									value={description}
									placeholder={product?.description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
								/>
							</div>
							<div>
								<label htmlFor="price">Price:</label>
								<input
									type="text"
									name="price"
									value={price}
									placeholder={product?.price}
									onChange={(e) => setPrice(e.target.value)}
								/>
							</div>
						</form>
					</div>
					<div className={styles.modalActions}>
						<div className={styles.actionsContainer}>
							<button
								className={styles.submitBtn}
								onClick={handleSubmit}
							>
								Submit
							</button>
							<button
								className={styles.cancelBtn}
								onClick={() => setIsOpen(false)}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalEditProduct;
