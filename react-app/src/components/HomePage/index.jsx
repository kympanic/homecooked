import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsThunk } from "../../store/products";

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
						<p>{product.avgRating}</p>
						<p>{product.price}</p>
					</li>
				))}
			</div>
		</div>
	);
};

export default HomePage;
