import React, { useState } from 'react';

function ProductForm() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, description }),
    })
      .then(response => response.json())
      .then(data => console.log(data));
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={event => setName(event.target.value)} />
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={event => setPrice(event.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <textarea value={description} onChange={event => setDescription(event.target.value)} />
        </label>
        <br />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductForm;