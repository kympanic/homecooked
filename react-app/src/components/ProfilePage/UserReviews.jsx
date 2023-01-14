import UserReview from "./UserReview";

const UserReviews = ({user}) => {	
	return (
		<div>
            {user.reviews && user.reviews.map((el) => 
            <div key={el.id} className="reviewBox">
                <UserReview key={el.id} user={user} review={el} />
            </div>
            )}
		</div>
	);
};

export default UserReviews;