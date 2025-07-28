import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const BookingList = ({ bookings, onEdit, onDelete, onMarkPaid, onCancel }) => {
    const [filterDate, setFilterDate] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [showCancelled, setShowCancelled] = useState(true);
    const [filteredBookings, setFilteredBookings] = useState(bookings);

    useEffect(() => {
        let result = [...bookings];
        
        // Filtre par date
        if (filterDate) {
            result = result.filter(b => format(new Date(b.date), 'yyyy-MM-dd') === filterDate);
        }
        
        // Filtre par statut
        if (statusFilter !== 'all') {
            if (statusFilter === 'cancelled') {
                result = result.filter(b => b.paid === 2);
            } else if (statusFilter === 'paid') {
                result = result.filter(b => b.paid === 1);
            } else if (statusFilter === 'pending') {
                result = result.filter(b => b.paid === 0);
            }
        }
        
        // Filtre annulées si non activé
        if (!showCancelled && statusFilter === 'all') {
            result = result.filter(b => b.paid !== 2);
        }

        setFilteredBookings(result);
    }, [bookings, filterDate, statusFilter, showCancelled]);

    return (
        <div className="mt-4">
            <div className="row mb-3 g-2">
                <div className="col-md-4">
                    <input 
                        type="date" 
                        className="form-control"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <select 
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="all">Tous statuts</option>
                        <option value="pending">En attente</option>
                        <option value="paid">Payées</option>
                        <option value="cancelled">Annulées</option>
                    </select>
                </div>
                <div className="col-md-4 form-check form-switch d-flex align-items-center">
                    <input
                        className="form-check-input me-2"
                        type="checkbox"
                        id="showCancelled"
                        checked={showCancelled}
                        onChange={() => setShowCancelled(!showCancelled)}
                    />
                    <label className="form-check-label" htmlFor="showCancelled">
                        Afficher annulées
                    </label>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Pack</th>
                            <th>Prix</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map(booking => (
                            <tr key={booking.id} className={booking.paid === 2 ? "table-secondary" : ""}>
                                <td>{booking.name}</td>
                                <td>{booking.email}</td>
                                <td>{format(new Date(booking.date), 'dd/MM/yyyy')}</td>
                                <td>{booking.booking_pack?.name}</td>
                                <td>{booking.booking_pack?.price} DT</td>
                                <td>
                                    {booking.paid === 2 ? (
                                        <span className="badge bg-secondary">Annulée</span>
                                    ) : booking.paid === 1 ? (
                                        <span className="badge bg-success">Payée</span>
                                    ) : (
                                        <span className="badge bg-warning">En attente</span>
                                    )}
                                </td>
                                <td>
                                    <div className="d-flex gap-1">
                                        {booking.paid !== 2 && (
                                            <>
                                                <button 
                                                    onClick={() => onEdit(booking)}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    Modifier
                                                </button>
                                                {booking.paid === 0 && (
                                                    <button
                                                        onClick={() => onMarkPaid(booking.id)}
                                                        className="btn btn-sm btn-success"
                                                    >
                                                        Payer
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => onCancel(booking.id)}
                                                    className="btn btn-sm btn-danger"
                                                >
                                                    Annuler
                                                </button>
                                            </>
                                        )}
                                        <button
                                            onClick={() => onDelete(booking.id)}
                                            className="btn btn-sm btn-outline-danger"
                                        >
                                            Supprimer
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookingList;