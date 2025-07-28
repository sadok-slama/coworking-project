import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function SaleForm({ onSubmit, initialData, products, onCancel }) {
  const [formData, setFormData] = useState({
    product_id: '',
    quantity: 1,
    payment_method: 'cash',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        product_id: initialData.product_id,
        quantity: initialData.quantity,
        payment_method: initialData.payment_method,
        date: format(new Date(initialData.date), 'yyyy-MM-dd')
      });
    } else if (products.length > 0) {
      setFormData(prev => ({
        ...prev,
        product_id: products[0].id
      }));
    }
  }, [initialData, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-md-4">
          <select
            className="form-select"
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            required
          >
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.price} DT
              </option>
            ))}
          </select>
        </div>
        
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="col-md-2">
          <select
            className="form-select"
            name="payment_method"
            value={formData.payment_method}
            onChange={handleChange}
            required
          >
            <option value="cash">Espèces</option>
            <option value="card">Carte</option>
            <option value="transfer">Virement</option>
          </select>
        </div>
        
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="col-md-2 d-grid">
          <button type="submit" className="btn btn-success">
            {initialData ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
        
        {initialData && (
          <div className="col-md-2 d-grid">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Annuler
            </button>
          </div>
        )}
      </div>
    </form>
  );
}