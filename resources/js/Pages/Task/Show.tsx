import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constans";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Task } from "@/types";
import { Head, Link } from "@inertiajs/react";
import { ToastContainer } from "react-toastify";

type Props = {
    task: Task;
};

export default function show({ task }: Props) {
    return (
        <AuthenticatedLayout
            editLink="tasks"
            id={task.id}
            header={`Task "${task.name}"`}
        >
            <Head title={`Task "${task.name}"`} />
            <ToastContainer />

            <div className="p-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg-px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div>
                            <img
                                src={task.image_path}
                                alt={task.name}
                                className="w-full object-cover h-64"
                            />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="grid gap-1 grid-cols-2">
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Project
                                        </label>
                                        <p className="mt-1">
                                            <Link
                                                href={route(
                                                    "projects.show",
                                                    task.project.id
                                                )}
                                                className="mt-1 hover:text-gray-300 hover:underline transition-all duration-200"
                                            >
                                                {task.project.name}
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task ID
                                        </label>
                                        <p className="mt-1">{task.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Name
                                        </label>
                                        <p className="mt-1">{task.name}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Status
                                        </label>
                                        <p className={`mt-1`}>
                                            <span
                                                className={`${
                                                    TASK_STATUS_CLASS_MAP[
                                                        task.status
                                                    ]
                                                } px-2 py-1 rounded text-white`}
                                            >
                                                {
                                                    TASK_STATUS_TEXT_MAP[
                                                        task.status
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Task Priority
                                        </label>
                                        <p className={`mt-1`}>
                                            <span
                                                className={`${
                                                    TASK_PRIORITY_CLASS_MAP[
                                                        task.priority
                                                    ]
                                                } px-2 py-1 rounded text-white`}
                                            >
                                                {
                                                    TASK_PRIORITY_TEXT_MAP[
                                                        task.priority
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
                                            {task.created_by.name}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="font-bold text-lg">
                                            Due Date
                                        </label>
                                        <p className="mt-1">{task.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Create Date
                                        </label>
                                        <p className="mt-1">
                                            {task.created_at}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="font-bold text-lg">
                                            Updated By
                                        </label>
                                        <p className="mt-1">
                                            {task.updated_by.name}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="font-bold text-lg">
                                    Task Description
                                </label>
                                <p className="mt-1">{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
