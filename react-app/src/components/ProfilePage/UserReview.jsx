import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalEditReview from "../Modals/EditReview/ModalEditReview";
import ModalDeleteReview from "../Modals/DeleteReview/ModalDeleteReview";

const UserReview = ({ user, review }) => {
	const product = useSelector((state) => state.products[review.productId]);
    const sessionUserId = useSelector((state) => state.session.user.id);

    const [isOpenEdit, setIsOpenEdit] = useState(false);
	const [isOpenDelete, setIsOpenDelete] = useState(false);

    console.log(review)
    console.log(product)
    return (
        <div>
            
            <div>
                <img 
                    src={product.imageURL}
                    alt={product.name}
                />
                <h3>{product.name}</h3>
                <p>Rating: {review.rating}</p>
                <p>{review.body}</p>
                <Link to={`/store/${product.userId}`}>Go to the store that sells this item</Link>
            </div>
            {sessionUserId === review.userId && (
                <div>
                    <button
                        onClick={() => setIsOpenEdit(true)}
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