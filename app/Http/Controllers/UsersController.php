<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sort_field = request('sort_field', 'created_at');
        $sort_order = request('sort_order', 'desc');

        if (request('name')) {
            $query->where('name', 'like', "%" . request("name") . "%");
        }

        $perPage = request('perPage') ?: 10;

        $users = UserResource::collection($query->orderBy($sort_field, $sort_order)->paginate($perPage));
        $queryParams = request()->query() ?: null;
        return Inertia::render('User/Index', compact('users', 'queryParams'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $user = new User();
        $user->fill($request->only(['name', 'email']));
        $user->password =  Hash::make($request->password);
        $user->save();
        $name = $user->name;

        return redirect()->route('users.index')->with('success', "User \"$name\" was created");
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {

        return Inertia::render('User/Show', compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/Edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $name = $user->name;
        $user->fill($request->only(['name', 'email']));
        if ($request->password) {
            $user->password =  Hash::make($request->password);
        }
        $user->save();

        return redirect()->route('users.index')->with('success', "User \"$name\" was updated");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();
        return redirect()->route('users.index')->with('success', "User \"$name\" was deleted");
    }
}
