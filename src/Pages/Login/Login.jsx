import React, { createContext, useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const { signIn } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // 
    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(() => {
                toast.success("Login Sucessfully")
                navigate(from, { replace: true });
            })
            .catch(error => console.log(error))

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login to QuickMart</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
                        <input
                            type="email"
                            id="email"
                            {...register("email", { required: true })}
                            name='email'
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your email"

                        />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })}
                            name='password'
                            id="password"
                            className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Enter your password"

                        />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full btn btn-neutral text-yellow-300"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600">
                    Don’t have an account?{' '}
                    <Link to={'/signUp'} className="text-indigo-600 font-medium hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;