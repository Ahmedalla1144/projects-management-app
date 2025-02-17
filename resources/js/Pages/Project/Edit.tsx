import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Project } from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

type Props = {
    project: Project;
};

export default function Create({ project }: Props) {
    const [imagePreview, setImagePreview] = useState(project.image_path);
    const success: any = usePage().props.success;
    usePage().props.success = null;
    const error: any = usePage().props.error;
    usePage().props.error = null;
    const { data, setData, errors, post, processing, progress } = useForm({
        name: project.name,
        description: project.description,
        due_date: project.due_date,
        image: "",
        status: project.status,
        _method: "PUT",
    });

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error]);

    const handleEdit = (e: any) => {
        e.preventDefault();

        post(route("projects.update", project.id));
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setData("image", file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };
    return (
        <AuthenticatedLayout header={`Edit Project "${project.name}"`}>
            <Head title={`Edit Project "${project.name}"`} />
            <ToastContainer />

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
                                        htmlFor="image"
                                        value="Project Image"
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
                                        value="Project Name"
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
                                        value="Project Description"
                                    />
                                    <TextInput
                                        className="max-w-screen-md"
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        id="description"
                                        type="text"
                                        name="description"
                                        value={data.description}
                                    />
                                    <InputError message={errors.description} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="due_date"
                                        value="Project Due Date"
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
                                        value="Project Status"
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
                                        <Link href={route("projects.index")}>
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
