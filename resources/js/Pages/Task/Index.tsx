import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TasksTable from "@/Components/TasksTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Tasks } from "@/types";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

interface Props {
    tasks: Tasks;
    queryParams: any;
}

export default function Index({ tasks, queryParams }: Props) {
    const [loading, setLoading] = useState(false);
    const [perPage, serPerPage] = useState(tasks.meta.per_page);
    if (!queryParams) {
        queryParams = {};
    }

    const handlePerPage = (number: number | string) => {
        setLoading(true);
        queryParams.perPage = number;
        router.get(route("tasks.index"), queryParams);
    };

    return (
        <AuthenticatedLayout header="Tasks" createLink="tasks">
            <Head title="Taks" />
            <ToastContainer />

            <div className="py-12">
                <div className="mx-auto max-w-9xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 overflow-x-auto">
                        <div className="flex gap-1 items-center text-gray-800 dark:text-gray-300 pb-2 text-sm inh">
                            <p>Showing</p>
                            <SelectInput
                                onChange={(e) => handlePerPage(e.target.value)}
                                value={perPage}
                                className="h-10 text-sm"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                <option value={250}>250</option>
                                <option value={500}>500</option>
                                <option value={tasks.meta.total}>All</option>
                            </SelectInput>
                            <p>of entries</p>
                        </div>
                        <TasksTable
                            type="index"
                            queryParams={queryParams}
                            tasks={tasks}
                        />
                        <Pagination
                            queryParams={queryParams}
                            links={tasks.meta.links}
                            from={tasks.meta.from}
                            to={tasks.meta.to}
                            total={tasks.meta.total}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
