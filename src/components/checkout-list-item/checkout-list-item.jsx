import { useContext } from "react";
import { CartContext } from "../contexts/cart.context";

import { CheckoutItemContainer,BaseSpan, Quantity, Value, Arrow, ImageContainer, RemoveButton  } from "./checkout-list-item.styles"; 

const ListItem = ({item}) => {

    const {name, quantity, price , imageUrl} = item;
    
    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);
    const addProduct = () => addItemToCart(item); 
    const removeProduct = () => removeItemFromCart(item);
    const clearItemHandler = () => clearItemFromCart(item);

    return(
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={`${imageUrl}`} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan>{name}</BaseSpan>
            <Quantity>
                <Arrow onClick={removeProduct}>
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addProduct}>
                    &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan>{price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
}

export default ListItem;