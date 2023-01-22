import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    // If found, increment quantity
    if (existingCartItem){
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }
    //return new array with modified cartItems/new cart item
    return [...cartItems, {...productToAdd, quantity:1}]
}

const deleteItem =  (cartItems, productToRemove) => {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id )
}

const removeCartItem = (cartItems, productToRemove) => {
    // find the item in the cart list
    const item = cartItems.find(cartItem => cartItem.id === productToRemove.id);

    if (item.quantity > 1){
        return cartItems.map(cartItem => cartItem.id === productToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem)
    }

    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id )
}



export const setIsCartOpen = (bool) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
}

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = (addCartItem(cartItems, productToAdd));
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems,productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}

export const clearItemFromCart = (cartItems,productToRemove) => {
    const newCartItems = deleteItem(cartItems,productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
}
