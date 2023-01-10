import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createReviewThunk } from "../../store/reviews";

//Errors need to be shown properly
const AddReviewForm = () => {
	const dispatch = useDispatch();
	const userId = useSelector((state) => state.session.user.id);

	const [errors, setErrors] = useState([]);
	const [body, setBody] = useState("");
	const [rating, setRating] = useState("");

	const updateBody = (e) => {
		setBody(e.target.value);
	};
	const updateRating = (e) => {
		setRating(e.target.value);
	};

	const addReview = async (e) => {
		e.preventDefault();

		const newReview = {
			user_id: userId,
			product_id: product.id,
			body,
			rating,
		};

		let data = await dispatch(createReviewThunk(newReview));
		if (data) {
			setErrors(data);
		}
	};
	return (
		<div>
			<form onSubmit={addReview}>
				<div>
					{errors.map((error, ind) => (
						<div key={ind}>{error}</div>
					))}
				</div>
				<div>
					<label>Comment: </label>
					<input
						type="text"
						name="body"
						onChange={updateBody}
						value={body}
					/>
				</div>
				<div>
					<label>Rating: </label>
					<input
						type="text"
						name="rating"
						onChange={updateRating}
						value={rating}
					/>
				</div>
				<button type="submit">Add Comment!</button>
			</form>
		</div>
	);
};

export default AddReviewForm;
