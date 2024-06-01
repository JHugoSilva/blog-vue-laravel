<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('auth')->controller(AuthController::class)->group(function(){
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::delete('logout', 'logout')->middleware('auth:sanctum');
});

Route::middleware('auth:sanctum')->controller(PostController::class)->group(function(){
    Route::get('posts', 'index');
    Route::post('post', 'store');
    Route::put('post/{id}', 'update');
    Route::delete('post/{id}', 'destroy');
    Route::post('upload', 'addImage');
});

Route::get('ping', function(){
    return 'pong';
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');