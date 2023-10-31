import { useRegisterMutation } from "@/queries/users";
import { useAuthStore } from "@/states/auth_store";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "@/layouts/AuthLayout";
import MutationWrapper from "@/components/wrappers/MutationWrapper";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const registerMutation = useRegisterMutation();
    const navigator = useNavigate();
    const { setLoggedUser } = useAuthStore();

    useEffect(() => {
        if (registerMutation.isSuccess) {
            setLoggedUser(registerMutation.data);
            navigator("/");
        }
    }, [registerMutation, navigator, setLoggedUser]);

    const handleSubmit = () => {
        registerMutation.mutate(formData);
    };

    return (
        <AuthLayout firstText="Join on">
            <MutationWrapper mutation={registerMutation} errorAllowed={true}>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="w-[500px] rounded bg-[#525355] p-6 shadow-md"
                >
                    <div className="mb-4">
                        <label className="mb-2 block text-sm font-bold text-white" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            placeholder="Email"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="mb-2 block text-sm font-bold text-white"
                            htmlFor="username"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="mb-2 block text-sm font-bold text-white"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="focus:shadow-outline rounded bg-[#e67e22] px-4 py-2 font-bold text-white hover:bg-[#d35400] focus:outline-none"
                        >
                            Register
                        </button>
                        <Link
                            to="/login"
                            className="inline-block align-baseline text-sm font-bold text-white hover:text-[#e67e22]"
                        >
                            Already registered?
                        </Link>
                    </div>
                    {registerMutation.isError ? (
                        <div className="gap 2 flex flex-col text-center">
                            <p className="text-red-500">{registerMutation.error?.message}</p>
                            <p className="text-red-500">
                                {JSON.stringify(registerMutation.error?.errors)}
                            </p>
                        </div>
                    ) : (
                        <></>
                    )}
                </form>
            </MutationWrapper>
        </AuthLayout>
    );
};

export default Register;
