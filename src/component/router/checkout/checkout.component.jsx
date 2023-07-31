import { useSelector } from 'react-redux';
import {
    selectCartItems,
    selectCartTotal,
  } from '../../../store/cart/cart.selector'
import CheckoutItem from '../../checkout-item/checkout-item.component';
import PaymentForm from '../../payment-form/payment-form.component';
import {CheckoutContainer,HeaderBlock,CheckoutHeader,Total} from  './checkout.styles.jsx';
import Button,{BUTTON_TYPE_CLASSES} from '../../button/button.component';
import { useNavigate } from 'react-router-dom';

const Checkout = () =>{
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const currentUser = useSelector((state)=>state.user.currentUser);
    const navigate = useNavigate();

    const goToSignIn = ()=>{
        navigate('/auth')
    }

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
            {
                (currentUser)?<PaymentForm/>:(
                    <>
                        <h3>Sign In to make the payment!</h3>
                        <Button children="Sign In" buttonType={BUTTON_TYPE_CLASSES.base} type="submit"  onClick={goToSignIn}/>
                    </>
                )
            }
        </CheckoutContainer>
    )
}

export default Checkout;