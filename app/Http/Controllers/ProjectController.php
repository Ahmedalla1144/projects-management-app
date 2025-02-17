<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $sort_field = request('sort_field', 'created_at');
        $sort_order = request('sort_order', 'desc');

        if (request("name")) {
            $query->where('name', 'like', "%" . request("name") . "%");
        }

        if (request("status")) {
            $query->where('status', request("status"));
        }

        $projects = ProjectResource::collection($query->orderBy($sort_field, $sort_order)->paginate(10));
        $queryParams = request()->query() ?: null;
        return Inertia::render('Project/Index', compact('projects', 'queryParams'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {

        $project = new Project();
        $project->fill($request->only(['name', 'description', 'status']));
        $project['created_by'] = Auth::user()->id;
        $project['updated_by'] = Auth::user()->id;
        $project['due_date'] = (new Carbon($request->due_date))->format('Y-m-d');

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = 'project' . time() . '.' . $image->extension();
            Storage::disk('public')->put($imageName, file_get_contents($image));
            $project->image_path = $imageName;
        }

        $project->save();
        return redirect()->route('projects.index')->with('success', 'Project Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();

        $sort_field = request('sort_field', 'created_at');
        $sort_order = request('sort_order', 'desc');

        if (request('name')) {
            $query->where('name', 'like', "%" . request('name') . "%");
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        if (request('priority')) {
            $query->where('priority', request('priority'));
        }
        $tasks = $query->orderBy($sort_field, $sort_order)->paginate(10);


        $tasks = TaskResource::collection($tasks);

        $project = ProjectResource::make($project);

        $queryParams = request()->query() ?: null;
        return Inertia::render('Project/Show', compact('project', 'tasks', 'queryParams'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        $project = ProjectResource::make($project);
        return Inertia::render('Project/Edit', compact('project'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $data['updated_by'] = Auth::id();

        if ($request->hasFile('image')) {
            if ($project->image_path) {
                Storage::disk('public')->delete($project->image_path);
            }
            $image = $request->file('image');
            $imageName = 'project' . time() . '.' . $image->extension();
            Storage::disk('public')->put($imageName, file_get_contents($image));
            $project->image_path = $imageName;
        }

        if ($data['status'] === "completed" && $project->tasks->where('status', "!=", 'completed')->count()) {
            return redirect()->back()->with('error', 'Cannot Update project with active tasks.');
        } else {
            $project->update($data);
            return redirect()->back()->with('success', 'Project updated Successfully');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        if ($project->image_path) {
            Storage::disk('public')->delete($project->image_path);
        }
        $project->delete();
        return redirect()->back()->with('success', 'Project deleted successfully');
    }
}
