import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../store/authSlice.js";
import { LogIn } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersSlice.users);

    const handleSubmit = (e) => {
        console.log({ email, password });
        e.preventDefault();
        setError("");

        // check email and password are not empty
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        // check email is valid or not
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError("Please enter a valid email address");
            return;
        }
        // check password length
        if (password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }
        // check email is already registered or not
        const isEmailRegistered = users.find((user) => user.email === email);
        if (!isEmailRegistered) {
            setError("Email is not registered");
            return;
        }
        // check password is correct or not
        const isPasswordCorrect = users.find(
            (user) => user.email === email && user.password === password
        );
        if (!isPasswordCorrect) {
            setError("Password is incorrect");
            return;
        }

        dispatch(login({ email, password }));
        // Simulate authentication
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md'>
                <div>
                    <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
                        Sign in to your account
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
                            <label htmlFor='password' className='sr-only'>
                                Password
                            </label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                                placeholder='Password'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        >
                            <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                                <LogIn size={20} />
                            </span>
                            Sign in
                        </button>
                    </div>

                    <div className='text-center'>
                        <Link
                            to={"/register"}
                            className='text-blue-600 hover:text-blue-800 text-sm font-medium'
                        >
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
