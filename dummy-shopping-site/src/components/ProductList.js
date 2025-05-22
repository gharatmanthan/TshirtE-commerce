import React from 'react';
import TShirtItem from './TShirtItem';

const ProductList = ({ products, addToCart }) => {
    return (
        <section aria-labelledby="product-list" className="product-list">
            <h2 id="product-list">Available T-Shirts</h2>
            <div className="product-grid">
                {products.map(product => (
                    <TShirtItem 
                        key={product.id} 
                        product={product} 
                        addToCart={addToCart} 
                    />
                ))}
            </div>
        </section>
    );
};

export default ProductList;