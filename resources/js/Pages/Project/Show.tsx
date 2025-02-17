import Pagination from "@/Components/Pagination";
import TasksTable from "@/Components/TasksTable";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constans";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Project, Tasks } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { Alert } from "flowbite-react";
import { ToastContainer } from "react-toastify";

type Props = {
    project: Project;
    tasks: Tasks;
    queryParams: any;
};

export default function show({ project, queryParams, tasks }: Props) {
    if (!queryParams) {
        queryParams = {};
    }

    return (
        <AuthenticatedLayout editLink="projects" id={project.id} header={`Project "${project?.name}"`}>
            <Head title={`Project "${project?.name}"`} />
            <ToastContainer />

            <div className="p-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg-px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={project?.image_path}
                                alt={project?.name}
                                className="w-full object-cover h-64"
                            />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Project ID
                                        </label>
                                        <p className="mt-1">{project?.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Name
                                        </label>
                                        <p className="mt-1">{project?.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Project Status
                                        </label>
                                        <p className={`mt-1`}>
                                            <span
                                                className={`${
                                                    PROJECT_STATUS_CLASS_MAP[
                                                        project?.status
                                                    ]
                                                } px-2 py-1 rounded text-white`}
                                            >
                                                {
                                                    PROJECT_STATUS_TEXT_MAP[
                                                        project?.status
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Created By
                                        </label>
                                        <p className="mt-1">
                                            {project?.created_by?.name}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Due Date
                                        </label>
                                        <p className="mt-1">
                                            {project?.due_date}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Create Date
                                        </label>
                                        <p className="mt-1">
                                            {project?.created_at}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Updated By
                                        </label>
                                        <p className="mt-1">
                                            {project?.updated_by?.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="font-bold text-lg">
                                    Project Description
                                </label>
                                <p className="mt-1">{project?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-12">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-auto shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-lg font-semibold pb-5">
                                "{project?.name}" Tasks
                            </h2>

                            {!tasks.data.length && (
                                <Alert color="failure" className="my-2">
                                    <div className="flex gap-5  items-center flex-wrap">
                                        <p>There is no Tasks.</p>
                                        <Link
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded transition-all duration-250"
                                            href={route("tasks.create")}
                                        >
                                            Create New Task
                                        </Link>
                                    </div>
                                </Alert>
                            )}

                            <TasksTable
                                queryParams={queryParams}
                                tasks={tasks}
                                type="show"
                            />
                            <Pagination
                                links={tasks?.meta?.links}
                                queryParams={queryParams}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
