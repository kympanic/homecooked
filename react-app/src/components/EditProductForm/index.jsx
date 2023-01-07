import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { editProductThunk } from "../../store/products";

const EditProductForm = () => {
	const { productId } = useParams();
	const history = useHistory();

	const sessionUser = useSelector((state) => state.session.user);
	const selectedProduct = useSelector((state) => state.products[productId]);

	const userId = sessionUser.id;

	//TODO
	//check to see if the logged in user is the owner of the product.
	//if not, user is redirected to homepage

	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [price, setPrice] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const editedProduct = {
			id: productId,
			name,
			description,
			image_url: imageUrl,
			price,
			user_id: userId,
		};

		dispatch(editProductThunk(editedProduct)).then(() => history.push("/"));

		setName("");
		setDescription("");
		setImageUrl("");
		setPrice("");
	};

	return (
		<div className="upload-page-background">
			<div>
				<h2>Something not right? Edit your food information here</h2>
			</div>
			<div className="upload-form-container">
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							name="name"
							value={name}
							placeholder={selectedProduct?.name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="imageUrl">Your Food Image Url:</label>
						<input
							type="url"
							name="imageUrl"
							value={imageUrl}
							placeholder={selectedProduct?.imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="description">Description:</label>
						<input
							type="text"
							name="description"
							value={description}
							placeholder={selectedProduct?.description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="price">Price:</label>
						<input
							type="text"
							name="price"
							value={price}
							placeholder={selectedProduct?.price}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</div>
					<div>
						<button type="submit">Upload</button>
						<Link to={"/"}>Cancel</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditProductForm;
