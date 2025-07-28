<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id', 'quantity', 'amount', 'payment_method', 'date'
    ];
    protected $casts = [
    'date' => 'date', // ou 'datetime' si ton champ est datetime
    ];


    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
