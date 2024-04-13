<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

// use Illuminate\Foundation\Auth\EmailVerificationRequest;
// use Illuminate\Auth\Events\Verified;
// use Illuminate\Support\Facades\URL;

class UserController extends Controller
{


    // Register
    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'email' => 'required|string|email|unique:users,email',
                'password' => 'required|string|min:8',
            ]);

            $user = User::create([
                'email' => $validatedData['email'],
                'password' => Hash::make($validatedData['password']),
                'role' => 3, // Set the default role value here
            ]);

            // Automatically log in the user after registration
            Auth::login($user);

            $token = $user->createToken('new_user')->plainTextToken;

            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'email' => $user->email,
                    'role' => $user->role,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ],
                'message' => 'User registered and logged in successfully. Please verify your email.',
                'token' => $token
            ], 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Registration failed. ' . $e->getMessage()], 500);
        }
    }



    // Logout
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'message' => 'Logged out successfully.'
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Logout failed. ' . $e->getMessage()], 500);
        }
    }

    // login
    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            if (Auth::attempt($request->only('email', 'password'))) {
                $user = Auth::user();
                $token = $user->createToken('authToken')->plainTextToken;

                return response()->json([
                    'user' => $user,
                    'message' => 'Login successful.',
                    'token' => $token,
                ]);
            }

            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->getMessage()], 422);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Login failed. ' . $e->getMessage()], 500);
        }
    }

}
