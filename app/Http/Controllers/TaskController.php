<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sort_field = request('sort_field', 'created_at');
        $sort_order = request('sort_order', 'desc');

        if (request('name')) {
            $query->where('name', 'like', "%" . request("name") . "%");
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        if (request('priority')) {
            $query->where('priority', request('priority'));
        }
        if (request('assigned_name')) {
            $query->whereHas(
                'assigned_user',
                function ($query) {
                    $query->where('name', 'like', "%" . request('assigned_name') . "%");
                }
            );
        }

        $perPage = request('perPage') ?: 20;

        $tasks = TaskResource::collection($query->orderBy($sort_field, $sort_order)->paginate($perPage));
        $queryParams = request()->query() ?: null;
        return Inertia::render(
            'Task/Index',
            compact(
                'tasks',
                'queryParams'
            )
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = ProjectResource::collection(Project::query()->orderBy('id', 'desc')->get());
        $users = UserResource::collection(User::query()->orderBy('name')->get());
        return Inertia::render('Task/Create', compact('projects', 'users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $validated = $request->validated();
        $validated['created_by'] = Auth::id();
        $validated['updated_by'] = Auth::id();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = 'task' . time() . '.' . $image->extension();
            Storage::disk('public')->put($imageName, file_get_contents($image));
            $validated['image_path'] = $imageName;
        }
        Task::create($validated);
        $name = $validated['name'];
        return redirect()->route('tasks.index')->with('success', "Task \"$name\" created successfully");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $task = TaskResource::make($task);
        return Inertia::render('Task/Show', compact('task'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = ProjectResource::collection(Project::query()->orderBy('name', 'asc')->get());
        $users = UserResource::collection(User::query()->orderBy('name')->get());
        $task = TaskResource::make($task);
        return Inertia::render('Task/Edit', compact('task', 'projects', 'users'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $validated = $request->validated();
        $validated['updated_by'] = Auth::id();
        if ($request->hasFile('image')) {
            if ($task->image_path) {
                Storage::disk('public')->delete($task->image_path);
            }
            $image = $request->file('image');
            $imageName = 'task' . time() . '.' . $image->extension();
            Storage::disk('public')->put($imageName, file_get_contents($image));
            $validated['image_path'] = $imageName;
        }
        $task->update($validated);
        $name = $task->name;
        return redirect()->route('tasks.index')->with('success', "Task \"$name\" updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;
        if ($task->image_path) {
            Storage::disk('public')->delete($task->image_path);
        }
        $task->delete();
        return redirect()->back()->with('success', "Task \"$name\" was deleted");
    }
}
