import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import SortedTableHeadCell from "@/Components/SortedTableHeadCell";
import TextInput from "@/Components/TextInput";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constans";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Projects } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface Props {
    projects: Projects;
    queryParams: any;
}

export default function Index({ projects, queryParams }: Props) {
    const [loading, setLoading] = useState(false);
    const [perPage, serPerPage] = useState(projects.meta.per_page);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
        null
    );
    const success: any = usePage().props.success;
    const error: any = usePage().props.error;

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
        if (error) {
            toast.error(error);
        }
    }, [success]);

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
                router.get(route("projects.index"), queryParams);
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
        router.get(route("projects.index"), queryParams);
    };

    const handlePerPage = (number: number | string) => {
        setLoading(true);
        queryParams.perPage = number;
        router.get(route("projects.index"), queryParams);
    };

    return (
        <AuthenticatedLayout header="Projects" createLink="projects">
            <Head title="Projects" />
            <ToastContainer />

            {loading && (
                <div className="flex flex-row gap-1 bg-amber-500/75 hover:bg-amber-500 text-white font-semibold rounded px-5 py-1 fixed bottom-3 right-3 z-10">
                    <p>Loading</p>
                    <Spinner size="sm" color="success" aria-label="spinner " />
                </div>
            )}

            <div className="py-12">
                <div className="mx-auto max-w-8xl space-y-6 sm:px-6 lg:px-8">
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
                                <option value={projects.meta.total}>All</option>
                            </SelectInput>
                            <p>of entries</p>
                        </div>
                        <Table hoverable striped>
                            <Table.Head>
                                <Table.HeadCell>
                                    <SortedTableHeadCell
                                        fieldName="id"
                                        fieldValue="id"
                                        handleSorting={handleSorting}
                                        sort_field={queryParams.sort_field}
                                        sort_order={queryParams.sort_order}
                                    />
                                </Table.HeadCell>
                                <Table.HeadCell>image</Table.HeadCell>
                                <Table.HeadCell>
                                    <SortedTableHeadCell
                                        fieldName="name"
                                        fieldValue="name"
                                        handleSorting={handleSorting}
                                        sort_field={queryParams.sort_field}
                                        sort_order={queryParams.sort_order}
                                    />
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    <SortedTableHeadCell
                                        fieldName="status"
                                        fieldValue="status"
                                        handleSorting={handleSorting}
                                        sort_field={queryParams.sort_field}
                                        sort_order={queryParams.sort_order}
                                    />
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    <SortedTableHeadCell
                                        fieldName="create date"
                                        fieldValue="created_at"
                                        handleSorting={handleSorting}
                                        sort_field={queryParams.sort_field}
                                        sort_order={queryParams.sort_order}
                                    />
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    <SortedTableHeadCell
                                        fieldName="due date"
                                        fieldValue="due_date"
                                        handleSorting={handleSorting}
                                        sort_field={queryParams.sort_field}
                                        sort_order={queryParams.sort_order}
                                    />
                                </Table.HeadCell>
                                <Table.HeadCell>created by</Table.HeadCell>
                                <Table.HeadCell>actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Head>
                                <Table.HeadCell></Table.HeadCell>
                                <Table.HeadCell></Table.HeadCell>
                                <Table.HeadCell>
                                    <TextInput
                                        placeholder="Name Search"
                                        className="w-full"
                                        isFocused={queryParams?.name && true}
                                        defaultValue={queryParams?.name}
                                        onChange={(e) =>
                                            handleFiltering(
                                                "name",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Table.HeadCell>
                                <Table.HeadCell>
                                    <SelectInput
                                        className="w-full"
                                        defaultValue={queryParams?.status}
                                        onChange={(e) =>
                                            handleFiltering(
                                                "status",
                                                e.target.value
                                            )
                                        }
                                    >
                                        <option value="">All</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </SelectInput>
                                </Table.HeadCell>
                                <Table.HeadCell></Table.HeadCell>
                                <Table.HeadCell></Table.HeadCell>
                                <Table.HeadCell></Table.HeadCell>
                                <Table.HeadCell></Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {projects?.data?.map((project) => {
                                    return (
                                        <Table.Row key={project?.id}>
                                            <Table.Cell>
                                                {project?.id}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <img
                                                    src={project?.image_path}
                                                    alt={project?.name}
                                                    className="w-8 h-8"
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Link
                                                    className="text-white hover:text-gray-300 hover:underline transition-all duration-300"
                                                    href={route(
                                                        "projects.show",
                                                        project?.id
                                                    )}
                                                >
                                                    {project?.name}
                                                </Link>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span
                                                    className={`px-2 py-1 text-nowrap rounded text-white ${
                                                        PROJECT_STATUS_CLASS_MAP[
                                                            project?.status
                                                        ]
                                                    }`}
                                                >
                                                    {
                                                        PROJECT_STATUS_TEXT_MAP[
                                                            project?.status
                                                        ]
                                                    }
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                {project?.created_at}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {project?.due_date}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {project?.created_by.name}
                                            </Table.Cell>
                                            <Table.Cell className="space-x-2 flex justify-center items-center mt-1">
                                                <Link
                                                    className="text-blue-600"
                                                    href={`/projects/${project?.id}/edit`}
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    className="text-red-500"
                                                    onClick={() => {
                                                        router.delete(
                                                            route(
                                                                "projects.destroy",
                                                                project?.id
                                                            ),
                                                            {
                                                                onSuccess:
                                                                    () => {
                                                                        toast.success(
                                                                            success
                                                                        );
                                                                    },
                                                                onError: () => {
                                                                    toast.error(
                                                                        error
                                                                    );
                                                                },
                                                            }
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                        <Pagination
                            queryParams={queryParams}
                            links={projects?.meta?.links}
                            from={projects?.meta?.from}
                            to={projects?.meta?.to}
                            total={projects?.meta?.total}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
