import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#202124]">
            <form
                onSubmit={handleSubmit}
                className="w-[500px] rounded bg-[#525355] p-6 shadow-md"
            >
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
                        htmlFor="email"
                    >
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
            </form>
        </div>
    );
};

export default Register;
