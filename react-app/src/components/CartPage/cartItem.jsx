import { useSelector, useDispatch } from 'react-redux'
import {addItem, getCartItemById, updateCount, removeItem} from '../../store/session'
import { useState, useEffect } from 'react'


const CartItem = ({ id, qty }) => {
    const [count, setCount] = useState(qty)
    const dispatch = useDispatch()
    const prodId = id
    const product = useSelector((state) => state.products[prodId])
    useEffect(() => {
		setCount(qty);
	}, [qty]);

    return (
        <div>
            <div>
                <img 
                src={product?.imageURL}
                alt={product?.name}
                />
            </div>
            <div>{product?.name}</div>
            <div>
                <span>${(Math.round(product?.price * 100) / 100).toFixed(2)}</span>
            </div>
            <div>{product?.description}</div>
            <div>
                <label htmlFor="qty">quantity bobble</label>
                <input onChange={(e) => {
                    setCount(e.target.value)
                    }} 
                    onBlur={() => dispatch(updateCount(product.id, Number(count)))}
                    min="1" type="number" id="qty" name="qty" value={count} />
               <button
					className="cart-item-button"
					onClick={() => dispatch(updateCount(product.id, qty + 1))}
				>
					+
				</button>
				<button
					className="cart-item-button"
					onClick={() => dispatch(updateCount(product.id, qty - 1))}
				>
					-
				</button>
            </div>
            <div>
                <button onClick={() => dispatch(removeItem(prodId))}>Remove item</button>
            </div>
        </div>
    )   
}

export default CartItem