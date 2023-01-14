const UserAvgRating = ({ user, products }) => {
	const selectedProducts = products?.filter((product) => {
		return product?.userId === parseInt(user.id);
	});
	const reviewArr = selectedProducts.map((el) => Number(el.avgRating));
	const reviewAvg = reviewArr.reduce((a, b) => a + b) / reviewArr.length;
	return <span>{reviewAvg}</span>;
};

export default UserAvgRating;
