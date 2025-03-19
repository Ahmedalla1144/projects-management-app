import { Tasks } from "@/types";
import { Spinner, Table } from "flowbite-react";
import SortedTableHeadCell from "./SortedTableHeadCell";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from "@/constans";
import { Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    tasks: Tasks;
    queryParams: any;
    type: string;
};

export default function TasksTable({ tasks, queryParams, type }: Props) {
    const url = new URL(location.href).pathname.split("/");
    const projectId = url[url.length - 1];
    const [loading, setLoading] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
        null
    );

    if (!queryParams) {
        queryParams = {};
    }
    const handleFiltering = (name: string, value: string) => {
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }
        setLoading(true);
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        setSearchTimeout(
            setTimeout(() => {
                if (type === "index") {
                    router.get(route("tasks.index"), queryParams);
                } else if (type === "show") {
                    router.get(route("projects.show", projectId), queryParams);
                } else if (type === "dashboard") {
                    router.get(route("dashboard"), queryParams);
                }
                setLoading(false);
            }, 600)
        );
    };

    const handleSorting = (name: string) => {
        if (name === queryParams.sort_field) {
            queryParams.sort_order =
                queryParams.sort_order === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_order = "asc";
        }
        if (type === "index") {
            router.get(route("tasks.index"), queryParams);
        } else if (type === "show") {
            router.get(route("projects.show", projectId), queryParams);
        } else if (type === "dashboard") {
            router.get(route("dashboard"), queryParams);
        }
    };

    const success: any = usePage().props.success;
    const error: any = usePage().props.error;

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error]);

    return (
        <>
            {loading && (
                <div className="flex flex-row gap-1 bg-amber-500/75 hover:bg-amber-500 text-white font-semibold rounded px-5 py-1 fixed bottom-3 right-3 z-10">
                    <p>Loading</p>
                    <Spinner size="sm" color="success" aria-label="spinner " />
                </div>
            )}

            <Table hoverable striped>
                <Table.Head>
                    <Table.HeadCell>
                        <SortedTableHeadCell
                            fieldValue="id"
                            fieldName="id"
                            handleSorting={handleSorting}
                            sort_field={queryParams.sort_field}
                            sort_order={queryParams.sort_order}
                        />
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <SortedTableHeadCell
                            fieldValue="project_id"
                            fieldName="project name"
                            handleSorting={handleSorting}
                            sort_field={queryParams.sort_field}
                            sort_order={queryParams.sort_order}
                        />
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <SortedTableHeadCell
                            fieldValue="name"
                            fieldName="name"
                            handleSorting={handleSorting}
                            sort_field={queryParams.sort_field}
                            sort_order={queryParams.sort_order}
                        />
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <SortedTableHeadCell
                            fieldValue="status"
                            fieldName="status"
                            handleSorting={handleSorting}
                            sort_field={queryParams.sort_field}
                            sort_order={queryParams.sort_order}
                        />
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <SortedTableHeadCell
                            fieldValue="priority"
                            fieldName="priority"
                            handleSorting={handleSorting}
                            sort_field={queryParams.sort_field}
                            sort_order={queryParams.sort_order}
                        />
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <SortedTableHeadCell
                            fieldValue="due_date"
                            fieldName="due deadline"
                            handleSorting={handleSorting}
                            sort_field={queryParams.sort_field}
                            sort_order={queryParams.sort_order}
                        />
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <SortedTableHeadCell
                            fieldValue="created_at"
                            fieldName="create date"
                            handleSorting={handleSorting}
                            sort_field={queryParams.sort_field}
                            sort_order={queryParams.sort_order}
                        />
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <SortedTableHeadCell
                            fieldValue="assigned_user_id"
                            fieldName="assigned user"
                            handleSorting={handleSorting}
                            sort_field={queryParams.sort_field}
                            sort_order={queryParams.sort_order}
                        />
                    </Table.HeadCell>
                    <Table.HeadCell>actions</Table.HeadCell>
                </Table.Head>
                <Table.Head>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell>
                        <TextInput
                            defaultValue={queryParams?.name}
                            isFocused={queryParams?.name && true}
                            onChange={(e) =>
                                handleFiltering("name", e.target.value)
                            }
                            placeholder="Name Search"
                        />
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <SelectInput
                            defaultValue={queryParams?.status}
                            onChange={(e) =>
                                handleFiltering("status", e.target.value)
                            }
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </SelectInput>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <SelectInput
                            defaultValue={queryParams?.priority}
                            onChange={(e) =>
                                handleFiltering("priority", e.target.value)
                            }
                        >
                            <option value="">All</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </SelectInput>
                    </Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                    <Table.HeadCell>
                        <TextInput
                            defaultValue={queryParams?.assigned_name}
                            isFocused={queryParams?.assigned_name && true}
                            onChange={(e) =>
                                handleFiltering("assigned_name", e.target.value)
                            }
                            placeholder="User Search"
                        />
                    </Table.HeadCell>
                    <Table.HeadCell></Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {tasks.data.map((task) => (
                        <Table.Row key={task?.id}>
                            <Table.Cell>{task?.id}</Table.Cell>
                            <Table.Cell>
                                <Link
                                    className="text-gray-100 hover:underline hover:text-gray-300"
                                    href={route(
                                        "projects.show",
                                        task?.project?.id
                                    )}
                                >
                                    {task?.project?.name}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <Link
                                    className="text-gray-100 hover:underline hover:text-gray-300"
                                    href={route("tasks.show", task?.id)}
                                >
                                    {task?.name}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                <span
                                    className={`${
                                        TASK_STATUS_CLASS_MAP[task?.status]
                                    } px-2 py-1 rounded text-white`}
                                >
                                    {TASK_STATUS_TEXT_MAP[task?.status]}
                                </span>
                            </Table.Cell>
                            <Table.Cell>
                                <span
                                    className={`text-white px-2 py-1 rounded ${
                                        TASK_PRIORITY_CLASS_MAP[task?.priority]
                                    }`}
                                >
                                    {TASK_PRIORITY_TEXT_MAP[task?.priority]}
                                </span>
                            </Table.Cell>
                            <Table.Cell className="text-nowrap">
                                {task?.due_date}
                            </Table.Cell>
                            <Table.Cell className="text-nowrap">
                                {task?.created_at}
                            </Table.Cell>
                            <Table.Cell className="text-nowrap">
                                {task?.assigned_user?.name}
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex flex-row gap-2 justify-center items-center">
                                    <Link
                                        prefetch="hover"
                                        href={route("tasks.edit", task?.id)}
                                        className="transition-all duration-200 font-medium text-indigo-500 hover:text-indigo-600 "
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        className="transition-all duration-200 font-medium text-red-500 hover:text-red-600 "
                                        onClick={() => {
                                            router.delete(
                                                route(
                                                    "tasks.destroy",
                                                    task?.id
                                                ),
                                                {
                                                    onSuccess: () => {
                                                        toast.success(success);
                                                    },
                                                }
                                            );
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
}
