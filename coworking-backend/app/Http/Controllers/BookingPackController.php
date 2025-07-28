<?php
// app/Http/Controllers/BookingPackController.php
namespace App\Http\Controllers;

use App\Models\BookingPack;
use Illuminate\Http\Request;

class BookingPackController extends Controller {
    public function index(Request $request) {
        $query = BookingPack::query();

        if ($request->filled('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->filled('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }
        if ($request->filled('duration')) {
            $query->where('duration', $request->duration);
        }

        return response()->json(
            $query->orderBy('price')->paginate($request->query('per_page', 10))
        );
    }

    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0'
        ]);

        $pack = BookingPack::create($data);
        return response()->json($pack, 201);
    }

    public function show($id) {
        return BookingPack::with('bookings')->findOrFail($id);
    }

    public function update(Request $request, $id) {
        $pack = BookingPack::findOrFail($id);
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string',
            'duration' => 'sometimes|required|integer|min:1',
            'price' => 'sometimes|required|numeric|min:0'
        ]);
        $pack->update($data);
        return response()->json($pack);
    }

    public function destroy($id) {
        $pack = BookingPack::findOrFail($id);
        $pack->delete();
        return response()->json(['message' => 'Pack supprimé']);
    }
}
