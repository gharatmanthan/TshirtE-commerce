import React from 'react';

const TShirtItem = ({ tShirt, onAddToCart }) => {
    return (
        <div className="tshirt-item">
            <img src={tShirt.image} alt={tShirt.name} />
            <h3>{tShirt.name}</h3>
            <p>${tShirt.price.toFixed(2)}</p>
            <button onClick={() => onAddToCart(tShirt)}>Add to Cart</button>
        </div>
    );
};

export default TShirtItem;