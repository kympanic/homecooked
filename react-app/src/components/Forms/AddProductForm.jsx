// In react-app/src/components/Forms
// Adding a product form in React

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductThunk } from "../../store/products";

const AddProductForm = () => {
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

	const addProduct = async (e) => {
		e.preventDefault();

		const newProduct = {
			user_id: userId,
			name,
			description,
			image_url: imageUrl,
			price,
		};

		let data = await dispatch(createProductThunk(newProduct));
		if (data) {
			setErrors(data);
		}
	};

	return (
		<div>
			<form onSubmit={addProduct}>
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
				<button type="submit">Cook it!</button>
			</form>
		</div>
	);
};

export default AddProductForm;
