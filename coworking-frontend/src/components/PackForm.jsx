import React, { useState, useEffect } from 'react';

export default function PackForm({ onSubmit, initialData, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    duration: 1,
    price: 0
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === 'duration'
          ? parseInt(value)
          : name === 'price'
          ? parseFloat(value)
          : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {/* Nom du pack */}
        <div className="mb-3 col-md-6">
          <label htmlFor="name" className="form-label">Nom du Pack</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
            placeholder="Ex: Pack Étudiant"
            required
          />
        </div>

        {/* Durée */}
        <div className="mb-3 col-md-6">
          <label htmlFor="duration" className="form-label">Durée (jours)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            className="form-control"
            value={form.duration}
            onChange={handleChange}
            min={1}
            required
          />
        </div>
      </div>

      {/* Description */}
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          rows={3}
          value={form.description}
          onChange={handleChange}
          placeholder="Décrivez le contenu du pack"
        />
      </div>

      {/* Prix */}
      <div className="mb-3 col-md-6">
        <label htmlFor="price" className="form-label">Prix (DT)</label>
        <input
          type="number"
          id="price"
          name="price"
          className="form-control"
          value={form.price}
          onChange={handleChange}
          min={0}
          step="0.01"
          required
        />
      </div>

      {/* Boutons */}
      <div className="d-flex justify-content-between mt-4">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Modifier le Pack' : 'Ajouter le Pack'}
        </button>
        {initialData && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
