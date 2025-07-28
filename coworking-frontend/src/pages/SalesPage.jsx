import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SaleForm from '../components/SaleForm';
import { getSales, createSale, updateSale, deleteSale, getProducts } from '../services/api';

const formatAmount = (amount) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (typeof num !== 'number' || isNaN(num)) return 'N/A';
  return `${num.toFixed(2)} DT`;
};

export default function SalesPage() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [salesRes, productsRes] = await Promise.all([
        getSales({ per_page: 10 }),
        getProducts()
      ]);

      setSales(salesRes.data?.data || []);
      setProducts(productsRes.data?.data || []);
    } catch (err) {
      console.error('Erreur de chargement:', err);
      setError(err.message || 'Erreur de chargement des données');
      if (err.response?.status === 401 || err.response?.status === 500) {
        navigate('/login');
      }
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
        await updateSale(editing.id, data);
        showMsg('Vente modifiée avec succès!');
      } else {
        await createSale(data);
        showMsg('Vente ajoutée avec succès!');
      }

      setEditing(null);
      await loadData(); 
    } catch (err) {
      console.error('Erreur de sauvegarde:', err);
      setError(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette vente ?')) {
      try {
        await deleteSale(id);
        await loadData(); 
        showMsg('Vente supprimée avec succès!');
      } catch (err) {
        console.error('Erreur de suppression:', err);
        setError(err.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  const showMsg = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  if (isLoading) return <div className="text-center p-4">Chargement en cours...</div>;
  if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

  return (
  <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <div className="container py-4" style={{ width: '100vw' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/dashboard" className="btn btn-outline-secondary">
          Retour au Dashboard
        </Link>
      </div>

      <h2 className="mb-4 text-center">Gestion des ventes</h2>

      {message && <div className="alert alert-success text-center">{message}</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <SaleForm
        onSubmit={handleSubmit}
        initialData={editing}
        products={products}
        onCancel={() => setEditing(null)}
      />

      <div className="table-responsive mt-4">
        <table className="table table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Montant</th>
              <th>Méthode de paiement</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sales.length > 0 ? (
              sales.map(s => (
                <tr key={s.id}>
                  <td>{s.product?.name || 'N/A'}</td>
                  <td>{s.quantity || 'N/A'}</td>
                  <td>{formatAmount(s.amount)}</td>
                  <td>{s.payment_method || 'N/A'}</td>
                  <td>{s.date ? new Date(s.date).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button 
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => setEditing(s)}
                    >
                      <i className="bi bi-pencil"></i> Modifier
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(s.id)}
                    >
                      <i className="bi bi-trash"></i> Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">Aucune vente trouvée</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);}
