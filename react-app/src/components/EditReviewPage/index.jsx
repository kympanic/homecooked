import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../Modals/App.module.css";
import ModalDeleteReview from "../Modals/DeleteReview/ModalDeleteReview";
import ModalEditReview from "../Modals/EditReview/ModalEditReview";
import { getAllReviewsThunk } from "../../store/reviews";

const EditReviewPage = () => {
	const { reviewId } = useParams();
	const dispatch = useDispatch();

	const review = useSelector((state) => state.reviews[reviewId]);

	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);

	useEffect(() => {
		dispatch(getAllReviewsThunk());
	}, [dispatch]);

	return (
		<div>
			<p>Body: {review?.body}</p>
			<p>rating: {review?.rating}</p>
			<div>Buttons Below</div>
			<div>
				<button
					className={styles.primaryBtn}
					onClick={() => setIsOpenDelete(true)}
				>
					Delete
				</button>
				{isOpenDelete && (
					<ModalDeleteReview
						setIsOpen={setIsOpenDelete}
						review={review}
					/>
				)}
			</div>
			<div>
				<button
					className={styles.primaryBtn}
					onClick={() => setIsOpenEdit(true)}
				>
					Edit
				</button>
				{isOpenEdit && (
					<ModalEditReview
						setIsOpen={setIsOpenEdit}
						review={review}
					/>
				)}
			</div>
		</div>
	);
};

export default EditReviewPage;
