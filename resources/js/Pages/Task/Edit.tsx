import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Projects, Task, Users } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";
import { Textarea } from "flowbite-react";
import { useState } from "react";
import Select from "react-select";

type Props = {
    task: Task;
    projects: Projects;
    users: Users;
};

export default function Create({ task, projects, users }: Props) {
    const [imagePreview, setImagePreview] = useState(task.image_path);
    const [projectSelectedOption, setProjectSelectedOption] = useState({
        value: task.project.id,
        label: task.project.name,
    });
    const [userSelectedOption, setUserSelectedOption] = useState({
        value: task.assigned_user.id,
        label: task.assigned_user.name,
    });
    const { data, setData, errors, post, processing, progress } = useForm({
        name: task.name,
        description: task.description,
        due_date: task.due_date,
        image: "",
        status: task.status,
        priority: task.priority,
        assigned_user_id: task.assigned_user.id,
        project_id: task.project.id,
        _method: "PUT",
    });

    const handleEdit = (e: any) => {
        e.preventDefault();

        post(route("tasks.update", task.id));
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const projectsOptions: any = [];
    projects.data.forEach((project) => {
        projectsOptions.push({ value: project.id, label: project.name });
    });

    const usersOptions: any = [];
    users.data.forEach((user) => {
        usersOptions.push({ value: user.id, label: user.name });
    });

    const handleProjectSelectedOption = (projectSelectedOption: {
        value: number;
        label: string;
    }) => {
        setProjectSelectedOption(projectSelectedOption);
        setData("project_id", projectSelectedOption.value);
    };
    const handleUserSelectedOption = (userSelectedOption: {
        value: number;
        label: string;
    }) => {
        setUserSelectedOption(userSelectedOption);
        setData("assigned_user_id", userSelectedOption.value);
    };

    const customStyles = {
        control: (provided: any) => ({
            ...provided,
            backgroundColor: "rgb(17,24,39)", // bg-gray-900
            color: "white", // Text color
            border: "1px solid rgba(255, 255, 255, 0.3)", // Border color
        }),
        option: (provided: any, state: any) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? "rgb(79,70,229)"
                : "rgb(17,24,39)", // bg-gray-700 on focus
            color: "white",
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: "rgb(209,213,219)", // Selected value color
        }),
        menu: (provided: any) => ({
            ...provided,
            backgroundColor: "rgb(17,24,39)", // bg-gray-900 for dropdown menu
        }),
    };
    return (
        <AuthenticatedLayout header={`Edit Task "${task.name}"`}>
            <Head title={`Edit Task "${task.name}"`} />

            <div className="p-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg-px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form
                                className="flex flex-col gap-5 justify-center itemc"
                                onSubmit={handleEdit}
                            >
                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="project_id"
                                        value="Project Name"
                                    />

                                    <Select
                                        id="project_id"
                                        className="text-black max-w-screen-md"
                                        options={projectsOptions}
                                        value={projectSelectedOption}
                                        onChange={(e: any) =>
                                            handleProjectSelectedOption(e)
                                        }
                                        styles={customStyles}
                                    />
                                    <InputError message={errors.status} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="assigned_user_id"
                                        value="Assigned User"
                                    />

                                    <Select
                                        id="assigned_user_id"
                                        className="text-black max-w-screen-md"
                                        options={usersOptions}
                                        value={userSelectedOption}
                                        onChange={(e: any) =>
                                            handleUserSelectedOption(e)
                                        }
                                        styles={customStyles}
                                    />
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
                                    />
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            className="w-1/2 object-cover"
                                            alt=""
                                        />
                                    )}
                                    <InputError message={errors.image} />
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
                                        className="max-w-screen-md dark:bg-gray-900 resize-none shadow-xl"
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
                                        value="Task Deadline"
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
                                    />
                                    <InputError message={errors.due_date} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="status"
                                        value="Task Status"
                                    />
                                    <SelectInput
                                        className="max-w-screen-md"
                                        onChange={(e: any) =>
                                            setData("status", e.target.value)
                                        }
                                        value={data.status}
                                        id="status"
                                        name="status"
                                    >
                                        <option value="">Select</option>
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
                                        className="pb-1"
                                        htmlFor="priority"
                                        value="Task Priority"
                                    />
                                    <SelectInput
                                        className="max-w-screen-md"
                                        onChange={(e: any) =>
                                            setData("priority", e.target.value)
                                        }
                                        value={data.priority}
                                        id="priority"
                                        name="priority"
                                    >
                                        <option value="">Select</option>
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
