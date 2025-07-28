<?php

namespace App\Http\Controllers;
use App\Models\Sale;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index(Request $request)
{
    $query = Product::query();

    //  Recherche par nom (via "name" ou "search")
    if ($request->has('name') || $request->has('search')) {
        $name = $request->query('name') ?? $request->query('search');
        $query->where('name', 'like', '%' . $name . '%');
    }

    //  Filtrage par prix exact
    if ($request->has('price')) {
        $query->where('price', $request->query('price'));
    }

    //  Filtrage par plage de prix
    if ($request->has('min_price')) {
        $query->where('price', '>=', $request->query('min_price'));
    }
    if ($request->has('max_price')) {
        $query->where('price', '<=', $request->query('max_price'));
    }

    //  Tri dynamique
    if ($request->has('sort') && $request->has('order')) {
        $query->orderBy($request->query('sort'), $request->query('order'));
    }

    //  Pagination
    $perPage = $request->query('per_page', 10);
    $products = $query->paginate($perPage);

    return response()->json($products);
}

    // Créé un nouveau produit
    public function store(Request $request)
{
    // Validation des données reçues
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric|min:0',
    ]);

    // Création du produit avec les données validées
    $product = Product::create($validated);

    return response()->json($product, 201);
}


    // Affiche un produit spécifique
    public function show(Product $product)
    {
        return $product;
    }

    // Met à jour un produit
    public function update(Request $request, Product $product)
{
    // Validation des données reçues
    $validated = $request->validate([
        'name' => 'sometimes|required|string|max:255',
        'price' => 'sometimes|required|numeric|min:0',
    ]);

    // Mise à jour du produit avec les données validées
    $product->update($validated);

    return response()->json($product, 200);
}


    // Supprime un produit
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}
