import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function ExpenseForm({ onSubmit, initialData, categories, onCancel }) {
  const [formData, setFormData] = useState({
    label: '',
    category: categories[0] || ' ',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        label: initialData.label || '',
        category: initialData.category || categories[0] || '',
        amount: initialData.amount || 0,
        date: initialData.date ? format(new Date(initialData.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
      });
    }
  }, [initialData, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
  ...prev,
  [name]: name === 'amount' ? value : value
}))};


  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation minimale
    if (!formData.label || !formData.category) {
      alert('Veuillez remplir tous les champs requis');
      return;
    }
    
    onSubmit({
      ...formData,
amount: parseFloat(formData.amount) || 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
      <div className="row g-3 align-items-end">
        <div className="col-md-4">
          <label className="form-label">Titre</label>
          <input
            type="text"
            className="form-control"
            name="label"
            value={formData.label}
            onChange={handleChange}
            placeholder="Description de la dépense"
            required
          />
        </div>
        
        <div className="col-md-2">
          <label className="form-label">Catégorie</label>
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="col-md-2">
          <label className="form-label">Montant (DT)</label>
          <input
            type="number"
            className="form-control"
            name="amount"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="col-md-2">
          <label className="form-label">Date</label>
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
            {initialData ? (
              <>
                <i className="bi bi-check-lg me-1"></i> Modifier
              </>
            ) : (
              <>
                <i className="bi bi-plus-lg me-1"></i> Ajouter
              </>
            )}
          </button>
        </div>
        
        {initialData && (
          <div className="col-md-2 d-grid">
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={onCancel}
            >
              <i className="bi bi-x-lg me-1"></i> Annuler
            </button>
          </div>
        )}
      </div>
    </form>
  );
}