<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BookingPack extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'duration', 'price'];

    // Relation : BookingPack a plusieurs Bookings
    public function bookings()
    {
        return $this->hasMany(Booking::class, 'pack_id');
    }
}
