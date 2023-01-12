import CartItem from "./cartItem";
import { useSelector} from 'react-redux'
import { useState, useEffect } from "react";

import { getAllCartItems } from "../../store/session";

const CartPage = () => {
	const cartItems = useSelector(getAllCartItems)
	const products = useSelector((state) => state.products)

	//hmmm. totalItems and totalPrice need to update whenever the count of any item changes
	//so we need these to be in a useEffect!
	//and it'll probably be easiest to handle these values as part of state. ok.
	const [ totalItems, setTotalItems ] = useState(0);
	const [ totalPrice, setTotalPrice ] = useState(0);

	useEffect(() => {
		let itemCount = 0;
		let price = 0;

		//gotta set the quantity of items and the price to zero
		//iterate over the cart
		cartItems.forEach(item => {
			itemCount += item.count
			price += (products[item.id].price * item.count)
		});
		setTotalItems(itemCount);
		setTotalPrice(price);
	}, [cartItems, totalItems, totalPrice, products])

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
				<span>Total Items: {totalItems}</span>
				<span>Total Price: ${(Math.round(totalPrice * 100) / 100).toFixed(2)}</span>
				<button>Proceed To Checkout</button>

			</div>
		</div>
	);
};

export default CartPage;
