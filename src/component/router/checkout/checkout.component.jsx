import { useSelector } from 'react-redux';
import {
    selectCartItems,
    selectCartTotal,
  } from '../../../store/cart/cart.selector'
import CheckoutItem from '../../checkout-item/checkout-item.component';
import PaymentForm from '../../payment-form/payment-form.component';
import {CheckoutContainer,HeaderBlock,CheckoutHeader,Total} from  './checkout.styles.jsx';

const Checkout = () =>{
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    
    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>
                {cartItems.map((cartItem)=><CheckoutItem key={cartItem.id} cartItem={cartItem} />)}
            <Total>Total: ${cartTotal}</Total>
            <PaymentForm/>
        </CheckoutContainer>
    )
}

export default Checkout;