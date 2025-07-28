import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const BookingForm = ({ onSubmit, initialData = null, onCancel, packs }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    pack_id: packs.length ? packs[0].id : '',
    paid: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        date: format(new Date(initialData.date), 'yyyy-MM-dd'),
        pack_id: initialData.pack_id,
        paid: initialData.paid
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        name: '',
        email: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        pack_id: packs.length ? packs[0].id : '',
        paid: false
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="row g-2">
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nom"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
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
        <div className="col-md-3">
          <select
            className="form-select"
            name="pack_id"
            value={formData.pack_id}
            onChange={handleChange}
            required
          >
            {packs.map(pack => (
              <option key={pack.id} value={pack.id}>
                {pack.name} — {pack.price} DT
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-1 d-grid">
          <button type="submit" className="btn btn-success">
            {initialData ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
        {initialData && (
          <div className="col-md-1 d-grid">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Annuler
            </button>
          </div>
        )}
      </div>
    </form>
  );
};

export default BookingForm;