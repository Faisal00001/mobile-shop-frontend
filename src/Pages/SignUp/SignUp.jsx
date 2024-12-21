import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form"
import { FaGoogle } from "react-icons/fa6";
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignUp = () => {

    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { createUser, updateUserProfile, logOut } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(() => {
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            role: data.role,
                        };
                        axiosPublic
                            .post("/users", userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    toast.success("User registered successfully!");

                                    // Log out the user
                                    logOut()
                                        .then(() => {
                                            reset(); // Reset the form after logout
                                            navigate("/login"); // Navigate to login page
                                        })
                                        .catch((error) => console.error("Logout failed", error));
                                }
                            })
                            .catch((error) => console.error("User save failed", error));
                    })
                    .catch((error) => console.error("Profile update failed", error));
            })
            .catch((error) => console.error("Sign-up failed", error));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     const form = e.target
    //     const name = form.target.value
    // };

    const handleGoogleSignUp = () => {
        console.log("Google Sign Up clicked");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold text-center text-gray-700">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            {...register("name", { required: true })}
                            name="name"
                            type="text"
                            placeholder="Your name"

                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>
                    <div>
                        <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700">
                            Photo URL
                        </label>
                        <input
                            id="photoURL"
                            {...register("photoURL", { required: true })}
                            name="photoURL"
                            type="text"
                            placeholder="Your photo URL"

                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            {...register("email", { required: true })}
                            name="email"
                            type="email"
                            placeholder="Your email"

                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })}
                            name="password"
                            type="password"
                            placeholder="Your password"

                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Select Role
                        </label>
                        <select
                            id="role"
                            {...register("role", { required: true })}
                            name="role"
                            defaultValue="buyer"
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                        {errors.role && <span className="text-red-600">Role is required</span>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-medium btn btn-neutral text-yellow-300  focus:outline-none"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Google Sign-Up Button */}
                {/* <button
                    onClick={handleGoogleSignUp}
                    className="w-full flex gap-2 items-center justify-center btn btn-neutral text-yellow-300 focus:outline-none"
                >
                    <FaGoogle className="text-2xl" />
                    Sign Up with Google
                </button> */}

                {/* Footer */}
                <p className="text-sm text-center text-gray-500">
                    Already have an account?{" "}
                    <a href="/login" className="font-medium text-blue-600 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
