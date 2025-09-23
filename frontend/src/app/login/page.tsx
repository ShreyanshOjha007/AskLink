"use client";
import React, { useState } from "react";
import Link from "next/link";
import {useAuth} from "@/context/AuthContext";
import toast from "react-hot-toast";
import {useRouter} from "next/navigation";
import {authLogin} from "@/actions/AuthService";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();
    const [data , setData] = useState<{email: string ; password: string}>({
        email: "",
        password: "",
    });

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setData((prev) => ({...prev, [name]: value}));
    }

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try{
            const response = await authLogin(data);
            console.log(response);
            console.log(response.status);
            if(response.token){
                toast.success("Login successful!");
                login(response.token);
                router.push("/");
            }
        }catch(error){
            console.log(error);
            toast.error("Email or password incorrect!");
        }finally {
            setLoading(false);
        }

    }

    return (
        <div className=" min-h-screen flex flex-col items-center justify-center text-black">
            <div className="w-full max-w-md border-gray-200 border-5 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
                {/* Heading */}
                <h1  className=" text-3xl font-bold mb-6">AskLink</h1>

                {/* Form */}
                <form className="w-full flex flex-col items-center space-y-5" onSubmit={onSubmitHandler}>
                    <div className="w-full">
                        <label className="font-Alan Sans block text-sm mb-2 ">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg  border border-gray-600 focus:outline-none font-Alan Sans focus:ring-2 focus:ring-white"
                            onChange={onChangeHandler}
                            value={data.email}
                        />
                    </div>

                    <div className="w-full">
                        <label className="font-Alan Sans block text-sm mb-2 ">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name='password'
                                onChange={onChangeHandler}
                                value={data.password}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 rounded-lg font-Alan Sans border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2 text-sm text-gray-900 hover:text-gray-600"
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
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-center text-sm text-gray-900">
                    Don&apos;t have an account?{" "}
                    <Link href="/sign-up" className="text-black underline hover:opacity-80">
                        Create
                    </Link>
                </p>
            </div>
        </div>
    );
}
