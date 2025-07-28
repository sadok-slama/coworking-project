import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
    }
  }, [initialData]);
const showMessage = (text) => {
  setMessage(text);
  setTimeout(() => setMessage(''), 3000);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    onSubmit({ name, price });
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row g-2">
        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Nom du produit"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Prix"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2 d-grid">
          <button type="submit" className="btn btn-success">
            {initialData ? 'Modifierr' : 'Ajouter'}
          </button>
        </div>
        {initialData && (
          <div className="col-md-2 d-grid">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Annuler
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
