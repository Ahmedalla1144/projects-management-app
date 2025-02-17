<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $totalPendingTasks = Task::query()->where('status', 'pending')->count();
        $mypendingTasks = Task::query()->where('status', 'pending')->where('assigned_user_id', $user->id)->count();

        $totalCompletedTasks = Task::query()->where('status', 'completed')->count();
        $mycompletedTasks = Task::query()->where('status', 'completed')->where('assigned_user_id', $user->id)->count();

        $totalInProgressTasks = Task::query()->where('status', 'in_progress')->count();
        $myInProgressTasks = Task::query()->where('status', 'in_progress')->where('assigned_user_id', $user->id)->count();

        $request = request();

        $query = Task::query()->where('assigned_user_id', Auth::id());

        if (request('name')) {
            $query->where('name', 'like', "%" . request("name") . "%");
        }
        if (request('status')) {
            $query->where('status', request('status'));
        }
        if (request('priority')) {
            $query->where('priority', request('priority'));
        }

        $sort_field = request('sort_field', 'created_at');
        $sort_order = request('sort_order', 'desc');

        $activeTasks = TaskResource::collection(
            $query
                ->whereIn('status', ['pending', 'in_progress'])
                ->orderBy($sort_field, $sort_order)
                ->limit(10)
                ->get()
        );

        $queryParams = $request->query() ?: null;

        return Inertia::render('Dashboard', compact(
            'totalPendingTasks',
            'mypendingTasks',
            'totalCompletedTasks',
            'mycompletedTasks',
            'totalInProgressTasks',
            'myInProgressTasks',
            'activeTasks',
            'queryParams'
        ));
    }
}
