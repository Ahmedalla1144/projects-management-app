<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->method() !== 'GET' && Auth::user()->email !== 'ahmed.alla56756@gmail.com') {
            return redirect()->back()->with('error', 'Invalid request. You must be an admin to perform this action');
        }
        return $next($request);
    }
}
