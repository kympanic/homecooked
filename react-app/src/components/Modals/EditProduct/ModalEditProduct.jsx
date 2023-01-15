import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { editProductThunk } from "../../../store/products";
import { useState } from "react";

const ModalEditProduct = ({ setIsOpen, product }) => {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const editedProduct = {
			id: product.id,
			name,
			description,
			image_url: imageUrl,
			price,
			user_id: product.userId,
			category,
		};

		let data = await dispatch(editProductThunk(editedProduct));
		if (data) {
			setErrors(data);
		} else {
			setIsOpen(false);
		}
	};

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
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
							</div>
							<div>
								<label htmlFor="name">Name:</label>
								<input
									type="text"
									name="name"
									value={name}
									placeholder={product?.name}
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
									placeholder={product?.imageURL}
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
							<label>Category: </label>
							<select
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
								<option value="--">--</option>
								<option value="American">American</option>
								<option value="Asian">Asian</option>
								<option value="Italian">Italian</option>
								<option value="French">French</option>
								<option value="Mediterranean">Snacks</option>
								<option value="Vegetarian">Vegetarian</option>
								<option value="Vegan">Vegan</option>
								<option value="Indian">Indian</option>
								<option value="African">African</option>
								<option value="Ethnic">Ethnic</option>
								<option value="Fusion">Snacks</option>
								<option value="Dessert">Dessert</option>
								<option value="Snacks">Snacks</option>
								<option value="Other">Other</option>
							</select>
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
