<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{

    public function index()
{
    $expenses = Expense::orderBy('date', 'desc')
        ->get()
        ->map(function ($expense) {
            return [
                'id' => $expense->id,
                'label' => $expense->label ?? 'Non spécifié',
                'category' => $expense->category ?? 'Non catégorisé',
                'amount' => $expense->amount ?? 0,
                'date' => $expense->date,
                // ...
            ];
        });

    return response()->json(['data' => $expenses]);
}

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'label' => 'required|string|max:255',
                'category' => 'required|string|max:100',
                'amount' => 'required|numeric|min:0',
                'date' => 'required|date'
            ]);

            $expense = Expense::create($validated);
            return response()->json([
                'success' => true,
                'data' => $expense
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la création'
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $expense = Expense::findOrFail($id);
            
            $validated = $request->validate([
                'label' => 'sometimes|string|max:255',
                'category' => 'sometimes|string|max:100',
                'amount' => 'sometimes|numeric|min:0',
                'date' => 'sometimes|date'
            ]);

            $expense->update($validated);
            return response()->json([
                'success' => true,
                'data' => $expense
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $expense = Expense::findOrFail($id);
            $expense->delete();
            return response()->json([
                'success' => true,
                'message' => 'Dépense supprimée',
                'data' => ['id' => $id]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression'
            ], 500);
        }
    }
}