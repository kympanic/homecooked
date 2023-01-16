import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalEditReview from "../Modals/EditReview/ModalEditReview";
import ModalDeleteReview from "../Modals/DeleteReview/ModalDeleteReview";
import './productreview.css'
import styles from "../Modals/App.module.css";

const UserReview = ({ user, review }) => {
	const product = useSelector((state) => state.products[review.productId]);
    const sessionUserId = useSelector((state) => state.session.user.id);

    const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);

    return (
        <div className="singleReview">
            <div>
                <div className="nameAndImgBox">
                    <img 
                        id="review-img"
                        src={product.imageURL}
                        alt={product.name}
                    />
                    <h1 className="reviewName">{product.name}</h1>
                </div>
                <div className="ratingBox">
                    <p>Rating: <span className="theRatingTM">{review.rating}</span></p>
                </div>
                <div>
                    <p>{review.body}</p>
                </div>
                <Link to={`/store/${product.userId}`}>Go to the store that sells this item</Link>
            </div>
            {sessionUserId === review.userId && (
                <div>
                    <button
                        onClick={() => setIsOpenEdit(true)}
                        className={styles.primaryBtn}
                    >
                        Edit Comment
                    </button>
                    {isOpenEdit && (
						<ModalEditReview
							setIsOpen={setIsOpenEdit}
							review={review}
						/>
					)}
                    <button
                        onClick={() => setIsOpenDelete(true)}
                        className={styles.primaryBtn}
                    >
                        Delete Comment
                    </button>
                    {isOpenDelete && (
						<ModalDeleteReview
							setIsOpen={setIsOpenDelete}
							review={review}
						/>
					)}
                </div>
            )}
        </div>
    )
}

export default UserReview;