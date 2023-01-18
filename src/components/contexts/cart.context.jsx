import { createContext, useReducer } from "react";
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    cartItems: [],
    cartTotal: 0,
    isCartOpen: false,
    cartCount: 0
}
const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){

        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        
        default:
            throw new Error (`unhandled type of ${type} in cartReducer`)
    }
 }

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0,
    setTotal: () => {}
});


export const CartContextProvider = ({children}) => {

    const [{cartItems, cartCount, cartTotal, isCartOpen}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

        const newTotal = newCartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS,
                {cartItems: newCartItems, 
                cartTotal: newTotal, 
                cartCount: newCartCount}))

    }

    const setIsCartOpen = (bool) => {
        dispatch(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = (addCartItem(cartItems, productToAdd));
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems,productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (productToRemove) => {
        const newCartItems = deleteItem(cartItems,productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}