<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'price'];

    // Relation : Product a plusieurs Sales
    public function sales()
    {
        return $this->hasMany(Sale::class);
    }
}
