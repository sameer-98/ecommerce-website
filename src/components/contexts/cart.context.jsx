import { createContext, useEffect, useState } from "react";


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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    total: 0,
    setTotal: () => {}
});


export const CartContextProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        setTotal(newTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems,productToRemove))
    }

    const clearItemFromCart = (productToRemove) => {
        setCartItems(deleteItem(cartItems,productToRemove))
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, total };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}