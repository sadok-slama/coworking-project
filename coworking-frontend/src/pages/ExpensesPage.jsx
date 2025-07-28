import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import { getExpenses, createExpense, updateExpense, deleteExpense } from '../services/api';

const formatAmount = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) return 'N/A';
  return `${parseFloat(amount).toFixed(2)} DT`;
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categories = ['Loyer', 'Fournitures', 'Maintenance', 'Salaires', 'Autre'];

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getExpenses();
      
      // Vérification approfondie de la structure de réponse
      if (response && response.data && Array.isArray(response.data.data)) {
        setExpenses(response.data.data);
      } else {
        throw new Error('Structure de données invalide');
      }
    } catch (err) {
      console.error('Erreur de chargement:', err);
      setError(err.message || 'Erreur de chargement des données');
      setExpenses([]);
      if (err.response?.status === 401) navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (data) => {
  try {
    setMessage('');
    setError(null);
    
    if (editing) {
      await updateExpense(editing.id, data);
      showMsg('Dépense modifiée!');
    } else {
      await createExpense(data);
      showMsg('Dépense ajoutée!');
    }

    await loadData(); // Rafraîchit la liste complète depuis l’API
    setEditing(null);
  } catch (err) {
    console.error('Erreur:', err.response || err);
    setError(err.response?.data?.message || 'Erreur lors de la sauvegarde');
  }
};


  const handleDelete = async (id) => {
    if (window.confirm('Supprimer cette dépense?')) {
      try {
        await deleteExpense(id);
        setExpenses(prev => prev.filter(e => e.id !== id));
        showMsg('Dépense supprimée!');
      } catch (err) {
        console.error('Erreur suppression:', err);
        setError('Erreur lors de la suppression');
      }
    }
  };
    const safeDisplay = (value, fallback = 'N/A') => {
  if (value === null || value === undefined) return fallback;
  if (typeof value === 'number' && isNaN(value)) return fallback;
  if (typeof value === 'string' && value.trim() === '') return fallback;
  return value;
};
  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  if (isLoading) return (
    <div className="text-center p-4">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );

  if (error) return (
    <div className="container mt-4 alert alert-danger">
      <h4>Erreur</h4>
      <p>{error}</p>
      <button className="btn btn-primary mt-2" onClick={loadData}>
        Réessayer
      </button>
    </div>
  );

  return (
    <div className="container mt-4">
<div className="container py-4" style={{ width: '100vw' }}>
          <Link to="/dashboard" className="btn btn-outline-secondary">
          <i className="bi bi-arrow-left me-2"></i> Retour au Dashboard
        </Link>
      </div>
      
      <h2 className="mb-4">Gestion des Dépenses</h2>
      
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      
      <ExpenseForm
        onSubmit={handleSubmit}
        initialData={editing}
        categories={categories}
        onCancel={() => setEditing(null)}
      />

      <div className="table-responsive mt-4">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Montant</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map(exp => (
                <tr key={exp.id}>
                  <td>{exp.label || 'N/A'}</td>
                  <td>{exp.category || 'N/A'}</td>
                  <td>{formatAmount(exp.amount)}</td>
                  <td>{exp.date ? new Date(exp.date).toLocaleDateString() : 'N/A'}</td>
                <td>
                    <button 
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => setEditing(exp)}
                    >
                      <i className="bi bi-pencil"></i> Modifier
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(exp.id)}
                    >
                      <i className="bi bi-trash"></i> Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Aucune dépense enregistrée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}