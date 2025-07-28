<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use App\Models\Product;
use Illuminate\Http\Request;
use Carbon\Carbon;

class SaleController extends Controller
{
    public function index(Request $request)
{
    $query = Sale::with('product');

    if ($request->has('product_id')) {
        $query->where('product_id', $request->query('product_id'));
    }

    if ($request->has('date')) {
        $query->whereDate('date', $request->query('date'));
    }

    //  Trie les résultats par date descendante (plus récent en premier)
    $query->orderBy('date', 'desc');

    $perPage = $request->query('per_page', 10);
    return response()->json($query->paginate($perPage));
}


public function store(Request $request)
{
    $validated = $request->validate([
        'product_id' => 'required|exists:products,id',
        'quantity' => 'required|integer|min:1',
        'payment_method' => 'required|in:cash,card,transfer',
        'date' => 'required|date'
    ]);

    $product = Product::findOrFail($request->product_id);

    $sale = Sale::create([
        'product_id' => $request->product_id,
        'quantity' => $request->quantity,
        'payment_method' => $request->payment_method,
        'amount' => $product->price * $request->quantity,
        'date' => Carbon::parse($request->date), 

    ]);

    return response()->json($sale, 201);
}


    public function show($id)
    {
        return Sale::with('product')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $sale = Sale::findOrFail($id);

        $validated = $request->validate([
            'product_id'     => 'sometimes|required|exists:products,id',
            'quantity'       => 'sometimes|required|integer|min:1',
            'payment_method' => 'sometimes|required|in:cash,card,transfer',
            'date'           => 'sometimes|required|date',
        ]);

        if (isset($validated['product_id']) || isset($validated['quantity'])) {
            $product = Product::findOrFail($validated['product_id'] ?? $sale->product_id);
            $quantity = $validated['quantity'] ?? $sale->quantity;
            $validated['amount'] = $product->price * $quantity;
        }

        $sale->update($validated);

        return response()->json($sale->load('product'));
    }

    public function destroy($id)
    {
        Sale::findOrFail($id)->delete();
        return response()->json(['message' => 'Vente supprimée']);
    }
}
