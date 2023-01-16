import UserReview from "./UserReview";
import "./storepage.css";
import './userreview.css'
import './profilereviews.css'

const UserReviews = ({user}) => {	
	return (
		<div className="reviewBox">
            <h2 className="reviewTitle">Here's What This User Has Reviewed:</h2>
            {user.reviews && user.reviews.map((el) => 
            <div key={el.id} className="store-reviews-section">
                <UserReview key={el.id} user={user} review={el} />
            </div>
            )}
		</div>
	);
};

export default UserReviews;