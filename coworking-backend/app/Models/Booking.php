<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'date', 'pack_id', 'paid'];

    protected $casts = [
        'date' => 'date',
        'paid' => 'integer' // 0 = pending, 1 = paid, 2 = cancelled
    ];

    public function bookingPack()
    {
        return $this->belongsTo(BookingPack::class, 'pack_id');
    }

    public function getStatusAttribute()
    {
        return match($this->paid) {
            1 => 'paid',
            2 => 'cancelled',
            default => 'pending'
        };
    }
}