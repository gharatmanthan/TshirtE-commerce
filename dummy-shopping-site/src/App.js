import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CookieConsent from './components/CookieConsent';
import { initializeAnalytics } from './utils/analytics';
import { getCartItems } from './utils/localStorage';

const App = () => {
    const [cartItems, setCartItems] = useState(getCartItems());

    useEffect(() => {
        initializeAnalytics();
    }, []);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    };

    return (
        <div>
            <Header />
            <main>
                <ProductList addToCart={addToCart} />
                <Cart items={cartItems} removeFromCart={removeFromCart} />
            </main>
            <CookieConsent />
        </div>
    );
};

export default App;