<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\NoteController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Add Notes route with middleware
    Route::get('notes', function () {
        return Inertia::render('notes');
    })->name('notes');
    
    Route::get('mynotes', [NoteController::class, 'index'])->name('notes.index');
    Route::post('mynotes', [NoteController::class, 'store'])->name('notes.store');
    Route::put('mynotes/{id}', [NoteController::class, 'update'])->name('notes.update');
    Route::delete('mynotes/{id}', [NoteController::class, 'destroy'])->name('notes.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
