import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createReviewThunk } from "../../store/reviews";


const CreateReview = () => {
	const dispatch = useDispatch();
	const history = useHistory();
    const { productId } = useParams()
	// console.log(productId, "productId")

	const reviews = useSelector((state) => state.reviews)
	const userId = useSelector((state) => state.session.user.id)
	// console.log(userId, "userId")
	const [rating, setRating] = useState("");
	const [body, setBody] = useState("");
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = {
			user_id: userId,
            product_id: productId,
			rating,
			body
		};

		dispatch(createReviewThunk(productId, payload))

		// 	go back to route
		history.push(`/products/${productId}`);
			// hideForm();
		// }
		setRating("");
		setBody("");
	};

useEffect(() => {
		const newErrors = [];
		if (!body) {
			newErrors.push("Review is required");
		}
		if (!rating) {
			newErrors.push("Rating field is required");
		}
		// if(stars < 1.0 || stars > 5.0)
		// {
		// 	newErrors.push("Stars field needs to be a decimal number between 1.0 and 5.0");
		// }
		// setValidationErrors(newErrors);
	}, [body, rating]);

	const handleCancelClick = (e) => {
		e.preventDefault();
		history.push(`/products/${productId}`);

	};


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
						<button
							className="small-btn"
							type="button"
							onClick={handleCancelClick}
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateReview;
