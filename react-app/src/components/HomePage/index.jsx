import { useSelector } from "react-redux";

const HomePage = () => {
	const products = useSelector((state) => Object.values(state.products));

	return (
		<div>
			<h1>Home Page</h1>
			<div>
				{products.map((product) => (
					<li key={product.id}>
						<p>{product.name}</p>
						<p>{product.description}</p>
						<p>{product.avgRating} stars</p>
						<p>{product.price}</p>
					</li>
				))}
			</div>
		</div>
	);
};

export default HomePage;
