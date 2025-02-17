import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Projects, Users } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { Textarea } from "flowbite-react";
import { useState } from "react";

interface Props {
    users: Users;
    projects: Projects;
}

export default function Create({ projects, users }: Props) {
    const [imagePreview, setImagePreview] = useState("");
    const { data, setData, errors, post, processing } = useForm({
        name: "",
        description: "",
        image: "",
        status: "",
        priority: "",
        due_date: "",
        assigned_user_id: "",
        project_id: "",
    });
    const handleCreate = (e: any) => {
        e.preventDefault();

        post(route("tasks.store"));
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };
    return (
        <AuthenticatedLayout header="Create New Task">
            <Head title="Create Task" />

            <div className="p-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg-px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                className="flex flex-col gap-5 justify-center"
                                onSubmit={handleCreate}
                            >
                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="project_id"
                                        value="Project Name"
                                    />
                                    <SelectInput
                                        className="max-w-screen-md"
                                        onChange={(e) =>
                                            setData(
                                                "project_id",
                                                e.target.value
                                            )
                                        }
                                        id="project_id"
                                        name="project_id"
                                        required
                                    >
                                        <option value="">Select Project</option>
                                        {projects.data.map((project, id) => (
                                            <option key={project.id} value={project.id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.status} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="image"
                                        value="Task Image"
                                    />
                                    <TextInput
                                        className="max-w-screen-md"
                                        onChange={(e) => handleImageChange(e)}
                                        id="image"
                                        type="file"
                                        name="image"
                                        required
                                    />
                                    <InputError message={errors.image} />
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            className="w-1/2 object-cover"
                                            alt=""
                                        />
                                    )}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="name"
                                        value="Task Name"
                                    />
                                    <TextInput
                                        className="max-w-screen-md"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        required
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="description"
                                        value="Task Description"
                                    />
                                    <Textarea
                                        className="max-w-screen-md dark:bg-gray-900 resize-none"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        rows={3}
                                        required
                                        placeholder="Enter description"
                                        color=""
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="due_date"
                                        value="Task Due Date"
                                    />
                                    <TextInput
                                        className="max-w-screen-md"
                                        onChange={(e) =>
                                            setData("due_date", e.target.value)
                                        }
                                        id="due_date"
                                        type="date"
                                        name="due_date"
                                        value={data.due_date}
                                        required
                                    />
                                    <InputError message={errors.due_date} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="assigned_user_id"
                                        value="Task Assigne User"
                                    />
                                    <SelectInput
                                        className="max-w-screen-md"
                                        onChange={(e) =>
                                            setData(
                                                "assigned_user_id",
                                                e.target.value
                                            )
                                        }
                                        id="assigned_user_id"
                                        name="assigned_user_id"
                                        required
                                    >
                                        <option value="">Select User</option>
                                        {users.data.map((user) => (
                                            <option key={user.id} value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </SelectInput>
                                    <InputError message={errors.assigned_user_id} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="status"
                                        value="Task Status"
                                    />
                                    <SelectInput
                                        className="max-w-screen-md"
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        id="status"
                                        name="status"
                                        required
                                    >
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">
                                            In Progress
                                        </option>
                                        <option value="completed">
                                            Completed
                                        </option>
                                    </SelectInput>
                                    <InputError message={errors.status} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        htmlFor="priority"
                                        value="Task Priority"
                                    />
                                    <SelectInput
                                        className="max-w-screen-md"
                                        onChange={(e) =>
                                            setData("priority", e.target.value)
                                        }
                                        id="priority"
                                        name="priority"
                                        required
                                    >
                                        <option value="">
                                            Select Priority
                                        </option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </SelectInput>
                                    <InputError message={errors.priority} />
                                </div>

                                <div className="space-x-3 self-end py-3">
                                    <PrimaryButton
                                        className="w-max m-auto"
                                        disabled={processing}
                                        type="submit"
                                    >
                                        Save
                                    </PrimaryButton>
                                    <SecondaryButton
                                        className="w-max m-auto"
                                        disabled={processing}
                                    >
                                        <Link href={route("tasks.index")}>
                                            Cancel
                                        </Link>
                                    </SecondaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
