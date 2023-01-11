import { useSelector, useDispatch } from 'react-redux'
import {addItem, getCartItemById, updateCount} from '../../store/session'



const Product = ({id}) => {
    const dispatch = useDispatch()
    const prodId = id
    const product = useSelector((state) => state.products[prodId])
    const cartItem = useSelector(getCartItemById(prodId))
    const addToCart = () => {
        if (cartItem) return dispatch(updateCount(prodId, cartItem.count + 1));
        dispatch(addItem(prodId))
    }
    
    return (
        <div>
            <div>
                <img 
                src={product?.imageURL}
                alt={product?.name}
                />
            </div>
            <div>{product?.name}</div>
            <div>{product?.category}</div>
            <div>
                <span>${product?.price}</span>
            </div>
            <div>{product?.description}</div>
            <div>{product?.avgRating}</div>
            <div>
                <button onClick={addToCart}>Add to Cart</button>
                
            </div>
        </div>
    )
}

export default Product;