import { useNavigate } from 'react-router-dom';

import './cart-dropdown.styles.scss';

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
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => <CartItem cartItem={item} key={item.id} />)}
            </div>
            <Button onClick={goToCheckoutHandler}>Go To Checkout</Button>
        </div>
    );
}
export default CartDropdown;