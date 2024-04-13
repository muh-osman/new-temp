<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;

// use Illuminate\Foundation\Auth\EmailVerificationRequest;


// Protected route
Route::middleware('auth:sanctum')->group(function () {

    // Return the authenticated user and his token
    // http://localhost:8000/api/user
    Route::get('user', function (Request $request) {
        return [
            'user' => $request->user(),
            'currentToken' => $request->bearerToken()
        ];
    });

    // Logout Route
    // http://localhost:8000/api/logout
    Route::post('/logout', [UserController::class, 'logout']);
});


// Register Route:
// http://localhost:8000/api/register
Route::post('/register', [UserController::class, 'register']);

// Login Route
// http://localhost:8000/api/login
Route::post('/login', [UserController::class, 'login']);


// Show all posts:      method GET    =>  http://localhost:8000/api/posts
// Create post:         method POST   =>  http://localhost:8000/api/posts
// Show post by id:     method GET    =>  http://localhost:8000/api/posts/1
// Update post by id:   method POST   =>  http://localhost:8000/api/posts/1?_method=PATCH
// Delete post by id:   method DELETE =>  http://localhost:8000/api/posts/1
Route::apiResource('posts', PostController::class);
