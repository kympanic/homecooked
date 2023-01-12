import CartItem from "./cartItem";
import { useDispatch, useSelector} from 'react-redux'
import { useState } from "react";

import { getAllCartItems } from "../../store/session";

const CartPage = () => {
	const dispatch = useDispatch();
	const cartItems = useSelector(getAllCartItems)
	const products = useSelector((state) => state.products)

	const totalItems = () => {
		return;
	}

	return (
		<div>
			<h1>Cart Page</h1>
			<div>
				<h2>This has items in it, mapped to a list</h2>
				<div>
					{cartItems && cartItems.map((el) =>
					<div key={el.id} className="cartItemBox">
						<CartItem id={el.id} qty={el.count} />
					</div>
					)}
				</div>
			</div>
			<div>
				<h2>This takes us to the checkout form</h2>
				<span>Total Items: Number</span>
				<span>Total Price: $Number</span>
				<button>Proceed To Checkout</button>

			</div>
		</div>
	);
};

export default CartPage;
>>>>>>> 42291acd5b681c2fa8da1256ab25aad66a8cc025
