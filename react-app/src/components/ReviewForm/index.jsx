import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createReviewThunk } from "../../store/reviews";


const ReviewForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
    const { productId } = useParams()
	console.log(productId, "productId")

	const [rating, setRating] = useState("");
	const [body, setBody] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = {
            productId,
			rating,
			body
		};

		dispatch(createReviewThunk(productId, payload)).then(() => history.push("/"));
		// if (createdReview) {
		// 	go back to route
		history.push(`/products/${productId}`);
			// hideForm();
		// }
	};

		setRating("");
		setBody("");



	return (
		<div className="upload-page-background">
			<div>
				<h2>Write A Review</h2>
			</div>
			<div className="upload-form-container">
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="rating">Rating:</label>
						<input
							type="text"
							name="rating"
							value={rating}
							onChange={(e) => setRating(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="body">Your Review:</label>
						<input
							type="text"
							name="body"
							value={body}
							onChange={(e) => setBody(e.target.value)}
						/>
					</div>

					<div>
						<button type="submit">Submit</button>
						<Link to={"/"}>Cancel</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ReviewForm;
