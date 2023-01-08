import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createProductThunk } from "../../../store/products";

const ModalAddProduct = ({ setIsOpen }) => {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.session.user.id);

	const [errors, setErrors] = useState([]);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [price, setPrice] = useState("");

	const updateName = (e) => {
		setName(e.target.value);
	};
	const updateDescription = (e) => {
		setDescription(e.target.value);
	};
	const updateImageUrl = (e) => {
		setImageUrl(e.target.value);
	};

	const updatePrice = (e) => {
		setPrice(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const newProduct = {
			user_id: userId,
			name,
			description,
			image_url: imageUrl,
			price,
		};

		dispatch(createProductThunk(newProduct));
		setIsOpen(false);
		// if (data) {
		// 	setErrors(data);
		// }
	};

	return (
		<>
			<div className={styles.darkBG} onClick={() => setIsOpen(false)} />
			<div className={styles.centered}>
				<div className={styles.modal}>
					<div className={styles.modalHeader}>
						<h5 className={styles.heading}>Food is in the Oven!</h5>
					</div>
					<button
						className={styles.closeBtn}
						onClick={() => setIsOpen(false)}
					>
						<RiCloseLine style={{ marginBottom: "-3px" }} />
					</button>
					<div className={styles.modalContent}>
						<form>
							<div>
								{errors.map((error, ind) => (
									<div key={ind}>{error}</div>
								))}
							</div>
							<div>
								<label>Name: </label>
								<input
									type="text"
									name="name"
									onChange={updateName}
									value={name}
								/>
							</div>
							<div>
								<label>Description: </label>
								<input
									type="text"
									name="description"
									onChange={updateDescription}
									value={description}
								/>
							</div>
							<div>
								<label>Image URL: </label>
								<input
									type="text"
									name="imageUrl"
									onChange={updateImageUrl}
									value={imageUrl}
								/>
							</div>
							<div>
								<label>Price: </label>
								<input
									type="text"
									name="price"
									onChange={updatePrice}
									value={price}
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

export default ModalAddProduct;

//button usage

/* <button
className={styles.primaryBtn}
onClick={() => setIsOpen(true)}
>
Create Product
</button>
{isOpen && <ModalAddProduct setIsOpen={setIsOpen} />} */
