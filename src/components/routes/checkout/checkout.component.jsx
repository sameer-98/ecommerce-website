import { useContext } from 'react';
import ListItem from '../../checkout-list-item/checkout-list-item';

import { CartContext } from '../../contexts/cart.context';

import { CheckoutContainer, CheckoutHeader, HeaderBlock, Total } from './checkout.styles';

const Checkout = () => {
  const { cartItems, total } = useContext(CartContext);

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
      {cartItems.map((cartItem) => (
        <ListItem key={cartItem.id} item={cartItem} />
      ))}
      <Total>TOTAL: ${total}</Total>
    </CheckoutContainer>
  );
};

export default Checkout;