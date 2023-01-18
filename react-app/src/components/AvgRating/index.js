const AvgRating = ({ user, products }) => {
	let reviewAvg;
	if (products) {
		reviewAvg =
			products
				?.filter((product) => {
					return product?.userId === parseInt(user.id);
				})
				.map((el) => Number(el.avgRating))
				?.reduce((a, b) => a + b) / user?.products?.length;
	}

	// const reviewCommenter = () => {
	// 	if (reviewAvg < 2) {
	// 		return "Overwhelmingly Negative";
	// 	} else if (reviewAvg >= 2 && reviewAvg < 3) {
	// 		return "Negative";
	// 	} else if (reviewAvg >= 3 && reviewAvg <= 3.5) {
	// 		return "Mixed";
	// 	} else if (reviewAvg > 3.5 && reviewAvg < 4.5) {
	// 		return "Positive";
	// 	} else if (reviewAvg > 4.5) {
	// 		return "Overwhelmingly Positive";
	// 	}
	// };

	return <span>{(Math.round(reviewAvg * 100) / 100).toFixed(2)}</span>;
};

export default AvgRating;
