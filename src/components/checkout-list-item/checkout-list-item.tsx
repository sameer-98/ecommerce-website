
import { CheckoutItemContainer,BaseSpan, Quantity, Value, Arrow, ImageContainer, RemoveButton  } from "./checkout-list-item.styles"; 
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useDispatch, useSelector } from "react-redux";
import { FC } from "react";
import { CartItem } from "../../store/cart/cart.types";

type CheckoutListItemProp = {
    item: CartItem;
}

const ListItem: FC<CheckoutListItemProp> = ({item}) => {

    const {name, quantity, price , imageUrl} = item;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    
    const addProduct = () => dispatch(addItemToCart(cartItems,item)); 
    const removeProduct = () => dispatch(removeItemFromCart(cartItems,item));
    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems,item));

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