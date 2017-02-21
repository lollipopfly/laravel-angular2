<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::resource('authenticate', 'AuthController', ['only' => ['index']]);
Route::post('authenticate', 'AuthController@authenticate');
Route::get('authenticate/get_user', 'AuthController@getAuthenticatedUser');
Route::post('authenticate/register', 'AuthController@register');
Route::post('authenticate/confirm', 'AuthController@confirm');
Route::post('authenticate/send_reset_code', 'AuthController@sendResetCode');
Route::post('authenticate/reset_password', 'AuthController@resetPassword');
