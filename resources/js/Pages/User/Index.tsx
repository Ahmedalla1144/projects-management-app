import Pagination from "@/Components/Pagination";
import SortedTableHeadCell from "@/Components/SortedTableHeadCell";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Users } from "@/types";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Spinner, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type Props = {
    users: Users;
    queryParams: any;
};

export default function Index({ users, queryParams }: Props) {
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        setTimeout(() => {
            router.get(route("users.index"), queryParams);
        }, 1000);
    };

    const handleSorting = (name: string) => {
        setLoading(true);
        if (name === queryParams.sort_field) {
            queryParams.sort_order =
                queryParams.sort_order === "asc" ? "desc" : "asc";
        } else {
            queryParams.sort_field = name;
            queryParams.sort_order = "asc";
        }
        router.get(route("users.index"), queryParams);
    };

    return (
        <AuthenticatedLayout header="Users" createLink="users">
            <Head title="Users" />
            <ToastContainer />

            {loading && (
                <div className="flex flex-row gap-1 bg-amber-500/75 hover:bg-amber-500 text-white font-semibold rounded px-5 py-1 fixed bottom-3 right-3 z-10">
                    <p>Loading</p>
                    <Spinner size="sm" color="success" aria-label="spinner " />
                </div>
            )}

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg sm:p-8 dark:bg-gray-800 overflow-x-auto">
                        <Table striped hoverable>
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
                                <Table.HeadCell>
                                    <SortedTableHeadCell
                                        fieldName="Name"
                                        fieldValue="name"
                                        handleSorting={handleSorting}
                                        sort_field={queryParams.sort_field}
                                        sort_order={queryParams.sort_order}
                                    />
                                </Table.HeadCell>
                                <Table.HeadCell>Email</Table.HeadCell>
                                <Table.HeadCell>
                                    <SortedTableHeadCell
                                        fieldName="created_at"
                                        fieldValue="created_at"
                                        handleSorting={handleSorting}
                                        sort_field={queryParams.sort_field}
                                        sort_order={queryParams.sort_order}
                                    />
                                </Table.HeadCell>
                                <Table.HeadCell>Actions</Table.HeadCell>
                            </Table.Head>
                            <Table.Head>
                                <Table.HeadCell></Table.HeadCell>
                                <Table.HeadCell>
                                    <TextInput
                                        placeholder="Name Search"
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
                                <Table.HeadCell></Table.HeadCell>
                                <Table.HeadCell></Table.HeadCell>
                                <Table.HeadCell></Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {users.data.map((user) => (
                                    <Table.Row key={user.id}>
                                        <Table.Cell>{user.id}</Table.Cell>
                                        <Table.Cell>{user.name}</Table.Cell>
                                        <Table.Cell>{user.email}</Table.Cell>
                                        <Table.Cell>
                                            {user.created_at}
                                        </Table.Cell>
                                        <Table.Cell className="space-x-2 flex justify-center items-center mt-1">
                                            <Link
                                                className="text-blue-600"
                                                href={`/users/${user.id}/edit`}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="text-red-500"
                                                onClick={() => {
                                                    router.delete(
                                                        route(
                                                            "users.destroy",
                                                            user.id
                                                        ),
                                                        {
                                                            onSuccess: () => {
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
                                ))}
                            </Table.Body>
                        </Table>

                        <Pagination
                            links={users.meta.links}
                            queryParams={queryParams}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
