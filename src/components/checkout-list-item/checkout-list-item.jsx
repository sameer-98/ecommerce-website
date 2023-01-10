import { useContext } from "react";
import { CartContext } from "../contexts/cart.context";

import './checkout-list-item.styles.scss'

const ListItem = ({item}) => {

    const {name, quantity, price , imageUrl} = item;
    
    const {addItemToCart, removeItemFromCart, clearItemFromCart} = useContext(CartContext);
    const addProduct = () => addItemToCart(item); 
    const removeProduct = () => removeItemFromCart(item);
    const clearItemHandler = () => clearItemFromCart(item);

    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={`${imageUrl}`} alt={`${name}`} />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={removeProduct}>
                    &#10094;
                </div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={addProduct}>
                    &#10095;
                </div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={clearItemHandler}>&#10005;</div>
        </div>
    );
}

export default ListItem;