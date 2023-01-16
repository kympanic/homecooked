import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalEditReview from "../Modals/EditReview/ModalEditReview";
import ModalDeleteReview from "../Modals/DeleteReview/ModalDeleteReview";
import './productreview.css'
import styles from "../Modals/App.module.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserReview = ({ user, review }) => {
	const product = useSelector((state) => state.products[review.productId]);
    const sessionUserId = useSelector((state) => state.session.user.id);
    const allReviews = useSelector((state) => Object.values(state.reviews));
    const specificReview = allReviews.filter((el) => (el.userId === review.userId) && (el.productId === review.productId));

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
                    <p>Rating: <span className="theRatingTM">
                                    {specificReview[0].rating}
                                    <FontAwesomeIcon
							            className="star"
									    icon={faStar}
									/>
                                </span>
                    </p>
                    <div className="reviewText">
                        <p>{specificReview[0].body}</p>
                    </div>
                </div>
            </div>
            <div className="linkAndButtonBox">
                <Link className="storeLink" to={`/store/${product.userId}`}>Go to the store that sells this item</Link>
            {sessionUserId === specificReview[0].userId && (
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
							review={specificReview[0]}
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
							review={specificReview[0]}
						/>
					)}
                </div>
            )}
            </div>  
        </div>
    )
}

export default UserReview;