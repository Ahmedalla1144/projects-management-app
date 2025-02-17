import Pagination from "@/Components/Pagination";
import TasksTable from "@/Components/TasksTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Tasks } from "@/types";
import { Head } from "@inertiajs/react";
import { ToastContainer } from "react-toastify";

interface Props {
    tasks: Tasks;
    queryParams: any;
}

export default function Index({ tasks, queryParams }: Props) {
    if (!queryParams) {
        queryParams = {};
    }

    return (
        <AuthenticatedLayout header="Tasks" createLink="tasks">
            <Head title="Taks" />
            <ToastContainer />

            <div className="py-12">
                <div className="mx-auto max-w-9xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 overflow-x-auto">
                        <TasksTable
                            type="index"
                            queryParams={queryParams}
                            tasks={tasks}
                        />
                        <Pagination
                            queryParams={queryParams}
                            links={tasks.meta.links}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
