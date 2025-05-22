import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);

    return (
        <div className="cart">
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>
                                <div className="cart-item">
                                    <img src={item.image} alt={item.name} />
                                    <div>
                                        <h3>{item.name}</h3>
                                        <p>Price: ${item.price.toFixed(2)}</p>
                                        <button onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Total Amount: ${totalAmount}</h3>
                </div>
            )}
        </div>
    );
};

export default Cart;