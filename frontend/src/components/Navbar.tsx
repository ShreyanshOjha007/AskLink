"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
    const { token, logout } = useAuth();
    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    <Link href="/" className="flex z-40 font-semibold">
                        <span>AskLink.</span>
                    </Link>

                    <div className="hidden  items-center space-x-4 sm:flex">
                        <>
                            <Link
                                href="/pricing"
                                className={buttonVariants({
                                    variant: "ghost",
                                    size: "sm",
                                })}
                            >
                                Pricing
                            </Link>
                            {!token ? (
                                <Link
                                    href="/sign-up"
                                    className={buttonVariants({
                                        variant: "secondary",
                                        size: "sm",
                                    })}
                                >
                                    Sign-up
                                </Link>
                            ) : (
                                <Link
                                    href="/dashboard"
                                    className={buttonVariants({
                                        variant: "secondary",
                                        size: "sm",
                                    })}
                                >
                                    Dashboard
                                </Link>
                            )}
                            {token ? (
                                <Button onClick={() => logout()}>Logout</Button>
                            ) : (
                                <Link
                                    href="/login"
                                    className={buttonVariants({
                                        variant: "ghost",
                                        size: "sm",
                                    })}
                                >
                                    Login
                                </Link>
                            )}
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;