"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center  text-black">
            <div className="w-full max-w-md  rounded-2xl shadow-2xl p-8 flex flex-col items-center border-gray-200 border-5">
                {/* Heading */}
                <h1 className="text-3xl font-bold mb-6">AskLink</h1>

                {/* Form */}
                <form className="w-full flex flex-col items-center space-y-5 ">
                    <div className="w-full">
                        <label className="block text-sm mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg border  border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-sm mb-2">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 rounded-lg border  border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
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
                        className="w-full py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-200 transition"
                    >
                        Sign Up
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
