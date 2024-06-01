<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public function register(RegisterRequest $request) {

        $user = User::create($request->getData());

        return response()->json([
            'user' => $user
        ], Response::HTTP_CREATED);
    }

    public function login (LoginRequest $request) {

        $credentials = ['email' => $request->email, 'password' => $request->password];

        $auth = auth()->attempt($credentials);

        if (!$auth) {
            throw ValidationException::withMessages([
                'message' => ['The credentials you entered are incorrect']
            ]);
        }

        $token = $request->user()->createToken('LARAVEL_APP');

        return response()->json([
            'user' => auth()->user(),
            'token' => $token->plainTextToken,
            'type' => 'Bearer'
        ], Response::HTTP_OK);
    }

    public function logout(Request $request) {
        $userId = $request->user_id;
        DB::table('personal_access_tokens')
        ->where('tokenable_id', $userId)->delete();

        return response()->json([
            'message' => 'Logout'
        ], Response::HTTP_OK);
    }
}
