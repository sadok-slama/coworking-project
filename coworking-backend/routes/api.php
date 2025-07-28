<?php
use App\Http\Controllers\BookingController;
use App\Http\Controllers\BookingPackController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ExpenseController;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
Route::post('/register', function(Request $req) {
    $data = $req->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users',
        'password' => 'required|string|min:6',
    ]);
    $data['password'] = Hash::make($data['password']);
    $user = User::create($data);
    $token = $user->createToken('default')->plainTextToken;
    return response()->json(['token' => $token], 201);
});

Route::post('/login', function(Request $req) {
    $data = $req->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);
    $user = User::where('email', $data['email'])->first();
    if (!$user || !Hash::check($data['password'], $user->password)) {
        return response()->json(['message'=>'Identifiants invalides'], 401);
    }
    $token = $user->createToken('default')->plainTextToken;
    return response()->json(['token' => $token]);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('booking-packs', BookingPackController::class);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('bookings', BookingController::class);
    Route::apiResource('sales', SaleController::class);
    Route::apiResource('expenses', ExpenseController::class);
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::patch('/bookings/{id}/pay', [BookingController::class, 'markAsPaid']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);
    Route::get('/booking-packs', [BookingPackController::class, 'index']);
    Route::patch('/bookings/{id}/pay', [BookingController::class, 'markAsPaid']);
    Route::apiResource('bookings', BookingController::class);
    Route::patch('/bookings/{id}/cancel', [BookingController::class, 'cancel']); // Nouvelle route
    Route::apiResource('sales', SaleController::class)->except(['create', 'edit']);
    

});


Route::middleware('auth:sanctum')->get('/user', function(Request $req) {
    return $req->user();
});

Route::middleware('auth:sanctum')->get('/dashboard-stats', function () {
    try {
        $now = Carbon::now();
        $startOfMonth = $now->startOfMonth()->format('Y-m-d');
        $endOfMonth = $now->endOfMonth()->format('Y-m-d');

        // Revenus du mois
        $revenus = DB::table('sales')
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->sum('amount') ?? 0;

        // Dépenses du mois
        $depenses = DB::table('expenses')
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->sum('amount') ?? 0;

        // Réservations actives (futures)
        $reservationsActives = DB::table('bookings')
            ->whereBetween('date', [$startOfMonth, $endOfMonth]) // Filtrer par mois courant
            ->where('paid', true)
            ->count();

        return response()->json([
            'revenus' => $revenus,
            'depenses' => $depenses,
            'reservationsActives' => $reservationsActives
        ]);
    } catch (\Throwable $e) {
        Log::error('Erreur dans /dashboard-stats: ' . $e->getMessage());
        return response()->json(['error' => 'Erreur serveur'], 500);
    }
});

// Statistiques des 30 derniers jours
Route::middleware('auth:sanctum')->get('/last-30-days-stats', function () {
    try {
        $endDate = Carbon::today(); // inclus aujourd'hui
        $startDate = Carbon::now()->copy()->subDays(29); // aujourd’hui inclus = 30 jours

        
        $results = [];
        $currentDate = $startDate->copy();
        
        while ($currentDate <= $endDate) {
            $dateStr = $currentDate->format('Y-m-d');
            
            // Revenus du jour
            $revenue = DB::table('sales')
                ->whereDate('date', $dateStr)
                ->sum('amount') ?? 0;
            
            // Dépenses du jour
            $expense = DB::table('expenses')
                ->whereDate('date', $dateStr)
                ->sum('amount') ?? 0;
            
            $results['labels'][] = $dateStr;
            $results['revenues'][] = $revenue;
            $results['expenses'][] = $expense;
            
            $currentDate->addDay();
        }
        
        return response()->json($results);
    } catch (\Throwable $e) {
        Log::error('Erreur dans /last-30-days-stats: ' . $e->getMessage());
        return response()->json(['error' => 'Erreur serveur'], 500);
    }
});

// Statistiques des réservations
Route::middleware('auth:sanctum')->get('/booking-stats', function () {
    try {
        $now = Carbon::now();
        $startOfMonth = $now->copy()->startOfMonth()->format('Y-m-d');
        $endOfMonth = $now->copy()->endOfMonth()->format('Y-m-d');
        $daysInMonth = $now->daysInMonth;
        
        // Total des réservations payées ce mois
        $monthlyTotal = DB::table('bookings')
            ->whereBetween('date', [$startOfMonth, $endOfMonth])
            ->where('paid', 1) // Seulement les payées
            ->count();
        
        // Moyenne journalière
        $dailyAverage = $daysInMonth > 0 ? $monthlyTotal / $daysInMonth : 0;
        
        // Répartition par pack
        $packStats = DB::table('bookings')
            ->join('booking_packs', 'bookings.pack_id', '=', 'booking_packs.id')
            ->select(
                'booking_packs.name as pack_name', 
                DB::raw('COUNT(bookings.id) as count')
            )
            ->whereBetween('bookings.date', [$startOfMonth, $endOfMonth])
            ->where('bookings.paid', 1)
            ->groupBy('booking_packs.name', 'booking_packs.id')
            ->get();
        
        $packNames = $packStats->pluck('pack_name')->toArray();
        $packCounts = $packStats->pluck('count')->toArray();
        
        return response()->json([
            'dailyAverage' => $dailyAverage,
            'monthlyTotal' => $monthlyTotal,
            'packNames' => $packNames,
            'packCounts' => $packCounts
        ]);
    } catch (\Throwable $e) {
        Log::error('Erreur booking stats: ' . $e->getMessage());
        return response()->json([
            'error' => 'Erreur serveur',
            'details' => $e->getMessage()
        ], 500);
    }
});