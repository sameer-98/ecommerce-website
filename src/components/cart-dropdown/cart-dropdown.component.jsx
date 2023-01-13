import { useNavigate } from 'react-router-dom';

import { CartDropdownContainer, EmptyMessage, CartItems } from './cart-dropdown.styles';

import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';

import Button from '../button/button.component';

const CartDropdown = () => {
    const {cartItems, setIsCartOpen,isCartOpen} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate('/checkout')
        setIsCartOpen(!isCartOpen)
    }

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