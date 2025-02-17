import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";




export default function Create() {
    const [imagePreview, setImagePreview] = useState('')
    const {data, setData, errors, post, processing} = useForm({
        name: '',
        description: '',
        due_date: '',
        image: '',
        status: '',
    })
    const handleCreate = (e: any) => {
        e.preventDefault();

        post(route('projects.store'))
    }

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        setData('image', file)
        if(file) {
            const imageUrl = URL.createObjectURL(file)
            setImagePreview(imageUrl)
        }
    }
    return (
        <AuthenticatedLayout header="Create New Project">
            <Head title="Create Project" />

            <div className="p-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg-px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <form className="flex flex-col gap-5 justify-center" onSubmit={handleCreate}>
                                <div className="flex flex-col gap-2">
                                <InputLabel className="pb-1" htmlFor="image" value="Project Image" />
                                <TextInput className="max-w-screen-md" onChange={e => handleImageChange(e)} id="image" type="file" name="image" required/>
                                <InputError message={errors.image} />
                                {imagePreview &&<img src={imagePreview} className="w-1/2 object-cover" alt="" />}
                                </div>

                                <div className="flex flex-col gap-2">
                                <InputLabel className="pb-1" htmlFor="name" value="Project Name" />
                                <TextInput className="max-w-screen-md" onChange={e => setData('name', e.target.value)} id="name" type="text" name="name"  value={data.name} required/>
                                <InputError message={errors.name} />
                                </div>

                                <div className="flex flex-col gap-2">
                                <InputLabel className="pb-1" htmlFor="description" value="Project Description" />
                                <TextInput className="max-w-screen-md" onChange={e => setData('description', e.target.value)} id="description" type="text" name="description"  value={data.description} required />
                                <InputError message={errors.description} />
                                </div>

                                <div className="flex flex-col gap-2">
                                <InputLabel className="pb-1" htmlFor="due_date" value="Project Due Date" />
                                <TextInput className="max-w-screen-md" onChange={e => setData('due_date', e.target.value)} id="due_date" type="date" name="due_date"  value={data.due_date} required />
                                <InputError message={errors.due_date} />
                                </div>

                                <div className="flex flex-col gap-2">
                                <InputLabel className="pb-1" htmlFor="status" value="Project Status" />
                                <SelectInput className="max-w-screen-md" onChange={e => setData('status', e.target.value)} id="status" name="status" required >
                                    <option value="">Select</option>
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </SelectInput>
                                <InputError message={errors.status} />
                                </div>

                                <div className="space-x-3 self-end py-3">
                                    <PrimaryButton className="w-max m-auto" disabled={processing} type="submit">Save</PrimaryButton>
                                    <SecondaryButton className="w-max m-auto" disabled={processing} ><Link href={route('projects.index')}>Cancel</Link></SecondaryButton>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
