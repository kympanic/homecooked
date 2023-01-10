import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";
import styles from "../Modals/App.module.css";
import ModalDeleteReview from "../Modals/DeleteReview/ModalDeleteReview";

const EditReviewPage = () => {
	const { reviewId } = useParams();
	const review = useSelector((state) => state.reviews[reviewId]);
	const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);

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
					<ModalDeleteReview setIsOpen={setIsOpenDelete} />
				)}
			</div>
			{/* <div>
				<button
					className={styles.primaryBtn}
					onClick={() => setIsOpenEdit(true)}
				>
					Edit
				</button>
				{isOpenEdit && (
					<ModalEditProduct
						setIsOpen={setIsOpenEdit}
						product={product}
					/>
				)}
			</div> */}
		</div>
	);
};

export default EditReviewPage;
