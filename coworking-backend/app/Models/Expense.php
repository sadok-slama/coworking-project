<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = ['label', 'category', 'amount', 'date'];
    protected $attributes = [
    'label' => 'Non spécifié',
    'category' => 'Non catégorisé',
    'amount' => 0
];

protected $casts = [
    'amount' => 'decimal:2',
    'date' => 'date'
];
}
