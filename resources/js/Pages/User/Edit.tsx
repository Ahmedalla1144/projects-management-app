import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { User } from "@/types";
import { Head, Link, useForm } from "@inertiajs/react";

type Props = {
    user: User;
};

export default function Create({ user }: Props) {
    const { data, setData, errors, post, processing, progress } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        _method: 'PUT',
    });

    const handleEdit = (e: any) => {
        e.preventDefault();

        post(route("users.update", user.id));
    };

    return (
        <AuthenticatedLayout header={`Edit User "${user.name}"`}>
            <Head title={`Edit User "${user.name}"`} />

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
                                        htmlFor="name"
                                        value="User Name"
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
                                        placeholder="Enter name"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="email"
                                        value="User Email"
                                    />
                                    <TextInput
                                        className="max-w-screen-md"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        placeholder="Enter email"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="password"
                                        value="Password"
                                    />
                                    <TextInput
                                        className="max-w-screen-md"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        placeholder="Enter password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <InputLabel
                                        className="pb-1"
                                        htmlFor="password_confirmation"
                                        value="Confirm Password"
                                    />
                                    <TextInput
                                        className="max-w-screen-md"
                                        onChange={(e) =>
                                            setData("password_confirmation", e.target.value)
                                        }
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        value={data.password_confirmation}
                                        placeholder="Confirm Password"
                                    />
                                    <InputError message={errors.password_confirmation} />
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
                                        <Link href={route("users.index")}>
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
