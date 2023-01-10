import { useContext } from 'react';
import ListItem from '../../checkout-list-item/checkout-list-item';

import { CartContext } from '../../contexts/cart.context';


import './checkout.styles.scss';

const Checkout = () => {
  const { cartItems, total } = useContext(CartContext);

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <ListItem key={cartItem.id} item={cartItem} />
      ))}
      <div className='total'>TOTAL: ${total}</div>
    </div>
  );
};

export default Checkout;