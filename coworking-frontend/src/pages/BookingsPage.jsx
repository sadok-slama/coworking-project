import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  getBookings, 
  createBooking, 
  updateBooking, 
  deleteBooking, 
  markBookingAsPaid,
  cancelBooking,
  getBookingPacks 
} from '../services/api';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [packs, setPacks] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

const loadData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const [bookingsRes, packsRes] = await Promise.all([
                getBookings({ show_cancelled: true }), 
                getBookingPacks()
            ]);
            setBookings(bookingsRes.data.data);
            setPacks(packsRes.data.data);
        } catch (err) {
            console.error('Error loading data:', err);
            setError('Erreur lors du chargement des données');
            if (err.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setIsLoading(false);
        }
    };

  const handleSubmit = async (bookingData) => {
    try {
      if (editingBooking) {
        await updateBooking(editingBooking.id, bookingData);
      } else {
        await createBooking(bookingData);
      }
      await loadData();
      setEditingBooking(null);
    } catch (err) {
      console.error('Error saving booking:', err);
      alert(err.response?.data?.message || 'Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer définitivement cette réservation?')) {
      try {
        await deleteBooking(id);
        await loadData();
      } catch (err) {
        console.error('Error deleting booking:', err);
        alert('Erreur lors de la suppression');
      }
    }
  };

  const handleMarkAsPaid = async (id) => {
    try {
      const response = await markBookingAsPaid(id);
      if (response.status === 400) {
        alert(response.data.message);
        return;
      }
      await loadData();
    } catch (err) {
      console.error('Error marking as paid:', err);
      alert('Erreur lors du marquage comme payé');
    }
  };

  const handleCancel = async (id) => {
        if (window.confirm('Annuler cette réservation ?')) {
            try {
                await cancelBooking(id);
                await loadData();
            } catch (err) {
                console.error('Error cancelling booking:', err);
                alert('Erreur lors de l\'annulation');
            }
        }
    };

    if (isLoading) return <div className="text-center my-5">Chargement en cours...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <div className="container py-4" style={{ width: '100vw' }}>
                <Link to="/dashboard" className="btn btn-outline-secondary">
                Retour au Dashboard
                </Link>
            </div>
            <h2 className="mb-4">Gestion des Réservations</h2>
            
            <BookingForm 
                onSubmit={handleSubmit}
                initialData={editingBooking}
                onCancel={() => setEditingBooking(null)}
                packs={packs}
            />
            <BookingList 
                bookings={bookings}
                onEdit={setEditingBooking}
                onDelete={handleDelete}
                onMarkPaid={handleMarkAsPaid}
                onCancel={handleCancel}
            />
        </div>
    );
};

export default BookingsPage;