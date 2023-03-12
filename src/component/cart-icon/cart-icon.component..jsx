import  {CartIconContainer,ItemCount,ShoppingIcon} from './cart-icon.styles.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCartCount,
    selectIsCartOpen,
  } from '../../store/cart/cart.selector';
  import { setIsCartOpen } from '../../store/cart/cart.action';


const CartIcon = () =>{
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
    // const res=cartItems.reduce((accumulator,currentElement)=>accumulator=accumulator+currentElement.quantity,0);
return (
    <CartIconContainer onClick={toggleIsCartOpen} >
        <ShoppingIcon className="shopping-icon"/>
        <ItemCount >{cartCount}</ItemCount>
    </CartIconContainer>
)
}

export default CartIcon;