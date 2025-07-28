import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RevenueExpenseChart from '../components/RevenueExpenseChart';
import BookingStats from '../components/BookingStats';
import { getDashboardStats } from '../services/api';
import { FiBox, FiPackage, FiDollarSign, FiCalendar, FiCreditCard, FiTrendingUp, FiPieChart } from 'react-icons/fi';

export default function Dashboard() {
  const [stats, setStats] = useState({
    revenus: 0,
    depenses: 0,
    reservationsActives: 0,
    isLoading: true,
    error: null
  });

const navigate = useNavigate();
const handleLogout = () => {
  localStorage.removeItem('token');
  navigate('/login');
};

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await getDashboardStats();
        const possibleData = response.data.data ?? response.data;

        if (
          possibleData.revenus === undefined ||
          possibleData.depenses === undefined ||
          possibleData.reservationsActives === undefined
        ) {
          throw new Error('Structure de réponse inattendue');
        }

        setStats({
          revenus: parseFloat(possibleData.revenus || 0),
          depenses: parseFloat(possibleData.depenses || 0),
          reservationsActives: possibleData.reservationsActives || 0,
          isLoading: false,
          error: null
        });

      } catch (err) {
        console.error('Erreur dashboard:', err);
        setStats(prev => ({
          ...prev,
          isLoading: false,
          error: err.message || 'Erreur de chargement'
        }));
      }
    };

    loadStats();
  }, []);

  if (stats.isLoading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
        <span className="visually-hidden">Chargement...</span>
      </div>
    </div>
  );

  if (stats.error) return (
    <div className="container mt-4">
      <div className="alert alert-danger text-center">{stats.error}</div>
    </div>
  );

  return (
    <div className="container-fluid py-4 px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 fw-bold text-dark mb-0">Tableau de Bord</h1>
          <button onClick={handleLogout} className="btn btn-outline-danger"> ➡️ Déconnexion</button>

      </div>

      {/* Cartes de statistiques */}
      <div className="row g-4 mb-4">
        <div className="col-xl-4 col-md-6">
          <div className="card border-0 shadow-sm h-100 hover-scale">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-uppercase text-muted small fw-semibold">Ventes du Mois</span>
                  <h2 className="mt-2 mb-0 fw-bold">{stats.revenus.toFixed(2)} DT</h2>
                </div>
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                  <FiDollarSign className="text-primary" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/sales" className="btn btn-sm btn-primary px-3 py-2 rounded-pill">
                  <span>Voir détails</span>
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6">
          <div className="card border-0 shadow-sm h-100 hover-scale">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-uppercase text-muted small fw-semibold">Réservations du Mois</span>
                  <h2 className="mt-2 mb-0 fw-bold">{stats.reservationsActives}</h2>
                </div>
                <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                  <FiCalendar className="text-success" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/bookings" className="btn btn-sm btn-success px-3 py-2 rounded-pill">
                  <span>Gérer réservations</span>
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-md-6">
          <div className="card border-0 shadow-sm h-100 hover-scale">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="text-uppercase text-muted small fw-semibold">Dépenses du Mois</span>
                  <h2 className="mt-2 mb-0 fw-bold">{stats.depenses.toFixed(2)} DT</h2>
                </div>
                <div className="bg-danger bg-opacity-10 p-3 rounded-circle">
                  <FiCreditCard className="text-danger" size={24} />
                </div>
              </div>
              <div className="mt-4">
                <Link to="/expenses" className="btn btn-sm btn-danger px-3 py-2 rounded-pill">
                  <span>Voir dépenses</span>
                  <i className="bi bi-arrow-right ms-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 py-3 d-flex align-items-center">
              <FiTrendingUp className="me-2" size={20} />
              <h5 className="mb-0 fw-semibold">Revenus vs Dépenses (30 derniers jours)</h5>
            </div>
            <div className="card-body pt-0">
              <RevenueExpenseChart />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 py-3 d-flex align-items-center">
              <FiPieChart className="me-2" size={20} />
              <h5 className="mb-0 fw-semibold">Statistiques des Réservations</h5>
            </div>
            <div className="card-body pt-0">
              <BookingStats />
            </div>
          </div>
        </div>
      </div>
          
      {/* Section Gestion */}
      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white border-0 py-3">
          <h5 className="mb-0 fw-semibold">Gestion</h5>
        </div>
        <div className="card-body">
          <div className="d-flex flex-wrap gap-3">
            <Link to="/packs" className="btn btn-outline-primary d-flex align-items-center px-4 py-2 rounded-pill">
              <FiPackage className="me-2" size={18} />
              <span>Gérer Packs</span>
            </Link>
            <Link to="/products" className="btn btn-outline-primary d-flex align-items-center px-4 py-2 rounded-pill">
              <FiBox className="me-2" size={18} />
              <span>Gérer Produits</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}