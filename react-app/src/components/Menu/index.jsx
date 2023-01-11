import Product from "./product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllProductsThunk } from "../../store/products";
import { useParams } from "react-router-dom";

const Menu = () => {
	const dispatch = useDispatch();
	const { userId } = useParams();
	const products = useSelector((state) => state?.users[userId]?.products);

	const vendor = useSelector((state) => state?.users[userId]);
	useEffect(() => {
		dispatch(getAllProductsThunk());
	}, [dispatch]);

	//probably need to pass the product id as a prop so get single product can be used
	return (
		<div className="menu">
			{products &&
				products.map((el) => (
					<div key={el.id} className="productBox">
						<Product id={el.id} vendor={vendor} />
						{/* {vendor?.id === sessionUserId && (
							<div>
								<button>Edit Item for owners only</button>
								<button>Delete Item for owners only</button>
							</div>
						)} */}
					</div>
				))}
		</div>
	);
};

export default Menu;
