"use client";

import React, { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {register} from "@/actions/AuthService";
import toast from "react-hot-toast";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [data , setData] = useState<{ name: string ; email: string; password: string }>({
        name: "",
        email: "",
        password: "",
    });

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setData((prev) => ({...prev, [name]: value}));

    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try{
            if(!data.name || !data.email || !data.password){
                toast.error("Please, enter your name and password");
                return;
            }
            const response = await register(data);
            console.log(response);
            console.log(response.status);
            if(response.status === 201){
                toast.success("Sign up successfully");
                router.push("/login");
            }else if(response.status === 409){
                toast.error(`User with ${data.email} already exists`);
            }else {
                toast.error("Something went wrong");
            }
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        }finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center  text-black">
            <div className="w-full max-w-md  rounded-2xl shadow-2xl p-8 flex flex-col items-center border-gray-200 border-5">
                {/* Heading */}
                <h1 className="text-3xl font-bold mb-6">AskLink</h1>

                {/* Form */}
                <form className="w-full flex flex-col items-center space-y-5 " onSubmit={onSubmitHandler}>
                    <div className="w-full">
                        <label className="block text-sm mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg border  border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                            onChange={onChangeHandler}
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 rounded-lg border  border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                                onChange={onChangeHandler}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2 text-sm text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-700 transition"
                        disabled={loading}
                    >
                        {loading ? "Loading...." : "Sign-up"}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-black">
                    Already have an account?{" "}
                    <Link href="/login" className="text-black underline hover:opacity-80">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
