import React from 'react';

function ProductItem({ product }) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
}

export default ProductItem;