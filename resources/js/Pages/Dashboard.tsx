import TasksTable from "@/Components/TasksTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Tasks } from "@/types";
import { Head } from "@inertiajs/react";

interface Props {
    totalPendingTasks: number;
    mypendingTasks: number;
    totalCompletedTasks: number;
    mycompletedTasks: number;
    totalInProgressTasks: number;
    myInProgressTasks: number;
    activeTasks: Tasks;
    queryParams: any;
}

export default function Dashboard({
    totalPendingTasks,
    mypendingTasks,
    totalCompletedTasks,
    mycompletedTasks,
    totalInProgressTasks,
    myInProgressTasks,
    activeTasks,
    queryParams,
}: Props) {
    if (!queryParams) {
        queryParams = {};
    }
    return (
        <AuthenticatedLayout header="Dashboard">
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-wrap justify-between gap-5">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 flex-1 min-w-[250px]">
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-5">
                            <p className="text-amber-500 text-xl sm:text-2xl font-semibold">
                                Pending Tasks
                            </p>
                            <div className="text-lg sm:text-xl">
                                <span>{mypendingTasks} / </span>
                                <span>{totalPendingTasks}</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 flex-1 min-w-[250px]">
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-5">
                            <p className="text-blue-500 text-xl sm:text-2xl font-semibold">
                                In Progress Tasks
                            </p>
                            <div className="text-lg sm:text-xl">
                                <span>{myInProgressTasks} / </span>
                                <span>{totalInProgressTasks}</span>
                            </div>
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 flex-1 min-w-[250px]">
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-5">
                            <p className="text-green-500 text-xl sm:text-2xl font-semibold">
                                Completed Tasks
                            </p>
                            <div className="text-lg sm:text-xl">
                                <span>{mycompletedTasks} / </span>
                                <span>{totalCompletedTasks}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 overflow-x-auto text-gray-900 dark:text-gray-100">
                        <p className="text-xl font-semibold pb-5">
                            My Active Tasks
                        </p>

                        <div className="shadow-sm sm:rounded-lg overflow-x-auto">
                            <TasksTable
                                queryParams={queryParams}
                                tasks={activeTasks}
                                type="dashboard"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
