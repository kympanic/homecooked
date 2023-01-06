import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
const ProductForm = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [price, setPrice] = useState("");

	return (
		<div className="upload-page-background">
			<div>
				<h2>Create your Delicious Meal</h2>
			</div>
			<div className="upload-form-container">
				<form>
					{/* onSubmit={handleSubmit} */}
					<div>
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="imageUrl">Your Food Image Url:</label>
						<input
							type="url"
							name="imageUrl"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="description">Description:</label>
						<input
							type="text"
							name="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="price">Price:</label>
						<input
							type="text"
							name="price"
							value={price}
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

export default ProductForm;
