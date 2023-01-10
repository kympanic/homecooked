// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { deleteReviewThunk, editReviewThunk } from "../../store/reviews";

// const SingleReview = ({
// 	review: { id, body, rating, userId, },
// }) => {
// 	const dispatch = useDispatch();
// 	const [showEdit, setShowEdit] = useState(false);
// 	const [editBody, setEditBody] = useState(body);

// 	const user = useSelector((store) => store.session.user);

// 	const handleEdiit = (e) => {
// 		e.preventDefault();
// 		const payload = {
//             id,
// 			user_id: userId,
//             product_id: productId,
// 			rating,
// 			body
// 		};
//         dispatch(editReviewThunk(id))
//     }
//     useEffect(() => {
// 		const newErrors = [];
// 		if (!body) {
// 			newErrors.push("Review is required");
// 		}
// 		if (!rating) {
// 			newErrors.push("Rating field is required");
// 		}
// 		// if(stars < 1.0 || stars > 5.0)
// 		// {
// 		// 	newErrors.push("Stars field needs to be a decimal number between 1.0 and 5.0");
// 		// }
// 		// setValidationErrors(newErrors);
// 	}, [body, rating]);

// 	const handleDelete = () =>
// 		dispatch(deleteReviewThunk({ id, user_id: userId }));

// 	return (
// 		<div>
// 			{showEdit ? (
// 				<>
// 					<textarea
// 						style={{ display: "block" }}
// 						value={editBody}
// 						onChange={(e) => setEditBody(e.target.value)}
// 					></textarea>
// 					<button
// 						style={{ display: "block" }}
// 						onClick={() => {
// 							setEditBody(body);
// 							setShowEdit((prev) => !prev);
// 						}}
// 					>
// 						Cancel Edit
// 					</button>
// 					<button
// 						style={{ display: "block" }}
// 						onClick={() => {
// 							handleEdit();
// 							setShowEdit((prev) => !prev);
// 						}}
// 					>
// 						Submit Edit
// 					</button>
// 				</>
// 			) : (
// 				<p>{editBody}</p>
// 			)}

// 			{user && user.id === userId && !showEdit ? (
// 				<>
// 					<button
// 						style={{ display: "block" }}
// 						onClick={() => setShowEdit((prev) => !prev)}
// 					>
// 						Edit Review
// 					</button>
// 					<button
// 						style={{ display: "block" }}
// 						onClick={() => handleDelete()}
// 					>
// 						Delete Review
// 					</button>
// 				</>
// 			) : null}
// 		</div>
// 	);
// };

// export default SingleReview;
