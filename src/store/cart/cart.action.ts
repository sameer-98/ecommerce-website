import { createAction, withMatcher, ActionWithPayload } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { CategoryItem } from "../categories/category.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
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

const deleteItem =  (cartItems: CartItem[], productToRemove: CategoryItem): CartItem[] => {
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id )
}

const removeCartItem = (cartItems: CartItem[], productToRemove: CategoryItem): CartItem[] => {
    // find the item in the cart list
    const item = cartItems.find(cartItem => cartItem.id === productToRemove.id);

    if (item && item.quantity > 1){
        return cartItems.map(cartItem => cartItem.id === productToRemove.id ? 
            {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem)
    }

    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id )
}

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;


export const setIsCartOpen = withMatcher((bool: boolean): SetIsCartOpen => {
    return  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
})

export const setCartItems = withMatcher((cartItems: CartItem[]): SetCartItems => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
})

export const addItemToCart = (cartItems: CartItem[], productToAdd: CategoryItem) => {
    const newCartItems = (addCartItem(cartItems, productToAdd));
    return setCartItems(newCartItems)
}

export const removeItemFromCart = (cartItems: CartItem[], productToRemove: CategoryItem) => {
    const newCartItems = removeCartItem(cartItems,productToRemove);
    return setCartItems(newCartItems)

}

export const clearItemFromCart = (cartItems: CartItem[],productToRemove: CategoryItem)=> {
    const newCartItems = deleteItem(cartItems,productToRemove);
    return setCartItems(newCartItems)

};
