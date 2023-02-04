import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCartItems, selectIsCartOpen } from '../../store/cart/cart.selector';
import CartItem from '../cart-item/cart-item.component';

import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button.component';

const CartDropdown = () => {

    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    const isCartOpen = useSelector(selectIsCartOpen);

    const navigate = useNavigate();

    const goToCheckoutHandler = useCallback(() => {
        navigate('/checkout')
        dispatch(setIsCartOpen(!isCartOpen))
    }, []);

    return(
        <CartDropdownContainer>
            <CartItems >
            {
                cartItems.length ? cartItems.map((item) => <CartItem cartItem={item} key={item.id} />):
                (<EmptyMessage>Your cart is empty</EmptyMessage>)
            }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
        </CartDropdownContainer>
    );
}
export default CartDropdown;