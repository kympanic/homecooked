<<<<<<< HEAD
// import { useSelector, useDispatch } from "react-redux";
// import { getAllCartItems, reset } from "../../store/cart";
// // import CartItem from "./CartItem";

// function CartPage({ item }) {
// 	const [count, setCount] = useState(item.count);
// 	const dispatch = useDispatch();

// 	useEffect(() => {
// 		setCount(item.count);
// 	}, [item.count]);

// 	return (
// 		<li className="cart-item">
// 			<div className="cart-item-header">{item.name}</div>
// 			<div className="cart-item-menu">
// 				<input
// 					type="number"
// 					value={count}
// 					onChange={(e) => setCount(e.target.value)}
// 					onBlur={() => dispatch(updateCount(item.id, Number(count)))}
// 				/>
// 				<button
// 					className="cart-item-button"
// 					onClick={() => dispatch(updateCount(item.id, item.count + 1))}
// 				>
// 					+
// 				</button>
// 				<button
// 					className="cart-item-button"
// 					onClick={() => dispatch(updateCount(item.id, item.count - 1))}
// 				>
// 					-
// 				</button>
// 				<button
// 					className="cart-item-button"
// 					onClick={() => dispatch(removeItem(item.id))}
// 				>
// 					Remove
// 				</button>
// 			</div>
// 		</li>
// 	);
// }



// export default CartPage;
=======
const CartPage = () => {
	return (
		<div>
			<h1>Cart Page</h1>
		</div>
	);
};

export default CartPage;
>>>>>>> 42291acd5b681c2fa8da1256ab25aad66a8cc025
