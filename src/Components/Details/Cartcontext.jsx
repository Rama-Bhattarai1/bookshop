


import React, { createContext, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const userId = localStorage.getItem('userId');

    const addToCart = async (product) => {
        try {
            const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    
            if (existingItemIndex !== -1) {
                // Product already exists in the cart, increment the quantity
                const existingItem = cartItems[existingItemIndex];
                const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 };
                const updatedCartItems = [...cartItems];
                updatedCartItems[existingItemIndex] = updatedItem;
    
                setCartItems(updatedCartItems);
    
               
            } else {
                // Product does not exist, add it to the cart
                const payload = {
                    user_id: userId,
                    product_id: product.id,
                    quantity: 1
                };
    
                const response = await axios.post('http://127.0.0.1:8000/api/carts', payload);
    
                if (response.status === 200) {
                    setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
                    console.log('Product added to cart successfully:', response.data);
                }
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };
    

    return (
        <CartContext.Provider value={{ cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
