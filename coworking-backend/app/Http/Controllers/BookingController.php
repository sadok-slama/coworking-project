<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BookingController extends Controller
{
    public function index(Request $request)
    {
        $query = Booking::with('bookingPack');

        // Filtres
        if ($request->filled('date')) {
            $query->whereDate('date', $request->date);
        }

        if ($request->has('status')) {
            $status = $request->status;
            if ($status === 'cancelled') {
                $query->where('paid', 2);
            } elseif ($status === 'paid') {
                $query->where('paid', 1);
            } elseif ($status === 'pending') {
                $query->where('paid', 0);
            }
        } elseif (!$request->has('show_cancelled')) {
            $query->where('paid', '<>', 2); 
        }

        $perPage = $request->query('per_page', 10);
        return $query->orderBy('date', 'desc')->paginate($perPage);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email',
            'date'    => 'required|date|after_or_equal:today',
            'pack_id' => 'required|exists:booking_packs,id',
            'paid'    => 'sometimes|boolean',
        ]);

        $booking = Booking::create($data);
        return response()->json($booking, 201);
    }

    public function show($id)
    {
        return Booking::with('bookingPack')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);
        
        $data = $request->validate([
            'name'    => 'sometimes|required|string|max:255',
            'email'   => 'sometimes|required|email',
            'date'    => 'sometimes|required|date',
            'pack_id' => 'sometimes|required|exists:booking_packs,id',
        ]);
        
        $booking->update($data);
        return response()->json($booking);
    }

    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();
        return response()->json(['message' => 'Réservation supprimée définitivement']);
    }

    public function markAsPaid($id): JsonResponse
    {
        $booking = Booking::findOrFail($id);
        
        if ($booking->paid === 2) {
            return response()->json(['message' => 'Impossible: réservation annulée'], 400);
        }

        $booking->update(['paid' => 1]);
        return response()->json(['message' => 'Réservation marquée comme payée']);
    }

    public function cancel($id): JsonResponse
    {
        $booking = Booking::findOrFail($id);
        
        if ($booking->paid === 2) {
            return response()->json(['message' => 'Réservation déjà annulée'], 400);
        }

        $booking->update(['paid' => 2]);
        return response()->json(['message' => 'Réservation annulée avec succès']);
    }
}