import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Récupère le token du localStorage au démarrage
const token = localStorage.getItem('token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token); // Stocke le token
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
};
// Bookings
export const getBookings = (params = {}) => api.get('/bookings', { params });
export const createBooking = (data) => api.post('/bookings', data);
export const updateBooking = (id, data) => api.put(`/bookings/${id}`, data);
export const deleteBooking = (id) => api.delete(`/bookings/${id}`);
export const markBookingAsPaid = (id) => api.patch(`/bookings/${id}/pay`);
export const cancelBooking = (id) => api.patch(`/bookings/${id}/cancel`);
// Booking Packs
export const getBookingPacks = () => api.get('/booking-packs');
export const getProducts = () => api.get('/products');
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const getSales = (params) => api.get('/sales', { params });
export const createSale = (data) => api.post('/sales', data);
export const updateSale = (id, data) => api.put(`/sales/${id}`, data);
export const deleteSale = (id) => api.delete(`/sales/${id}`);

// Remplacez toutes les fonctions expenses par :
export const getExpenses = () => api.get('/expenses');
export const createExpense = (data) => api.post('/expenses', data);
export const updateExpense = (id, data) => api.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);

export const createBookingPack = (data) => api.post('/booking-packs', data);
export const updateBookingPack = (id, data) => api.put(`/booking-packs/${id}`, data);
export const deleteBookingPack = (id) => api.delete(`/booking-packs/${id}`);

export const getDashboardStats = () => api.get('/dashboard-stats');

// Nouveaux endpoints pour les statistiques
export const getLast30DaysStats = () => api.get('/last-30-days-stats');
export const getBookingStats = () => api.get('/booking-stats');

export default api