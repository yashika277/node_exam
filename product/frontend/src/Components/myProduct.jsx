import React, { useState, useEffect } from 'react';

function MyProducts() {
  const [myProducts, setMyProducts] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setUserId(userId);
    fetch(`/api/users/${userId}/products`)
      .then(response => response.json())
      .then(data => setMyProducts(data));
  }, [userId]);

  return (
    <div>
      <h1>My Products</h1>
      <ul>
        {myProducts.map(product => (
          <li key={product.id}>
            {product.name} - {product.price}
            {product.description && ` (${product.description})`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyProducts;