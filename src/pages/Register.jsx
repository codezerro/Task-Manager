import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { addUser } from "../store/usersSlice.js";
// import { login } from "../store/authSlice";
// import { User } from "../types/auth";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");

    // redux
    const dispatch = useDispatch();

    const users = useSelector((state) => state.usersSlice.users);
    console.log("users", users);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        // check email and password1 and password2 are not empty
        if (!email || !password1 || !password2 || !name) {
            setError("Please fill in all fields");
            return;
        }
        // check email is valid or not
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError("Please enter a valid email address");
            return;
        }
        // check password1 and password2 length
        if (password1.length < 6 || password2.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }
        // check password1 and password2 are same or not
        if (password1 !== password2) {
            setError("Password and Confirm Password must be same");
            return;
        }

        // check email is already registered or not
        const isEmailRegistered = users.find((user) => user.email === email);
        if (isEmailRegistered) {
            setError("Email is already registered");
            return;
        }

        // register new user
        const newUser = {
            name: name,
            email: email,
            password: password1,
        };
        dispatch(addUser(newUser));
        // Simulate authentication
        // dispatch(login(newUser));
        // Redirect to dashboard
        // Navigate("/dashboard");
        // Or use history.push("/dashboard") if using react-router v5
        // Simulate successful registration

        // Reset state
        setName("");
        setEmail("");
        setPassword1("");
        setPassword2("");
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Create new account
                    </h2>
                </div>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    {error && (
                        <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded'>
                            {error}
                        </div>
                    )}
                    <div className='rounded-md shadow-sm space-y-4'>
                        <div>
                            <label htmlFor='name' className='sr-only'>
                                Name
                            </label>
                            <input
                                id='name'
                                name='name'
                                type='text'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                placeholder='Enter your name'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='sr-only'>
                                Email address
                            </label>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                placeholder='Email address'
                            />
                        </div>
                        <div>
                            <label htmlFor='password1' className='sr-only'>
                                Password
                            </label>
                            <input
                                id='password1'
                                name='password1'
                                type='password'
                                autoComplete='current-password'
                                required
                                value={password1}
                                onChange={(e) => setPassword1(e.target.value)}
                                className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                placeholder='Enter Password'
                            />
                        </div>
                        <div>
                            <label htmlFor='password2' className='sr-only'>
                                Password
                            </label>
                            <input
                                id='password2'
                                name='password2'
                                type='password'
                                autoComplete='current-password'
                                required
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                placeholder='Enter Password Again'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                            <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                                <UserPlus size={20} />
                            </span>
                            Sign up
                        </button>
                    </div>

                    <div className='text-center'>
                        <Link
                            to={"/login"}
                            className='text-blue-600 hover:text-blue-800 text-sm font-medium'
                        >
                            Already have an account? Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

/*
id: string;
name: string;
email: string;
password: string;
*/
