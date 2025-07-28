import React, { useEffect, useState } from 'react';
import PackForm from '../components/PackForm';
import {
  getBookingPacks,
  createBookingPack,
  updateBookingPack,
  deleteBookingPack
} from '../services/api';
import { Link } from 'react-router-dom';

export default function PacksPage() {
  const [packs, setPacks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  const load = async () => {
    const res = await getBookingPacks({ per_page: 10 });
    setPacks(res.data.data);
  };

  useEffect(() => { load(); }, []);

  const show = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const onSubmit = async (data) => {
    try {
      if (editing) {
        await updateBookingPack(editing.id, data);
        show('Pack modifié');
      } else {
        await createBookingPack(data);
        show('Pack ajouté');
      }
      setEditing(null);
      load();
    } catch (err) {
      console.error("Erreur lors de l'enregistrement :", err);
    }
  };

  const onDelete = async (id) => {
    if (!window.confirm('Supprimer ce pack ?')) return;
    try {
      await deleteBookingPack(id);
      show('Pack supprimé');
      load();
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
  };

  return (
    <div className="container-fluid mt-4">
      {/* Retour */}
      <div className="container py-4" style={{ width: '100vw' }}>
        <Link to="/dashboard" className="btn btn-outline-secondary">
          Retour au Dashboard
        </Link>
      </div>

      {/* Titre */}
      <h2 className="mb-4 text-center">Gestion des Packs</h2>

      {/* Message */}
      {message && <div className="alert alert-success text-center">{message}</div>}

      {/* Formulaire */}
      <div className="container mb-4">
        <div className="card shadow">
          <div className="card-body">
            <h5 className="text-primary fw-bold mb-3 text-center">
              {editing ? 'Modifier un Pack' : 'Ajouter un Pack'}
            </h5>
            <PackForm 
              onSubmit={onSubmit} 
              initialData={editing} 
              onCancel={() => setEditing(null)} 
            />
          </div>
        </div>
      </div>

      {/* Liste des Packs */}
      <div className="container">
        <div className="card shadow">
          <div className="card-body">
            <h5 className="text-success fw-bold mb-3 text-center">Liste des Packs</h5>
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Durée (j)</th>
                    <th>Prix (DT)</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packs.map(p => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.description}</td>
                      <td>{p.duration}</td>
                      <td>{parseFloat(p.price).toFixed(2)}</td>
                      <td className="text-center">
                        <button
                          onClick={() => setEditing(p)}
                          className="btn btn-sm btn-outline-primary me-2"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => onDelete(p.id)}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                  {packs.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center text-muted">Aucun pack trouvé.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
