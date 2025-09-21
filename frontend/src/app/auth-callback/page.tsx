"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const Page = () => {
    const route = useRouter();
    // const searchParams = useSearchParams();
    // const origin = searchParams.get("origin");
    const { getToken } = useKindeBrowserClient();

    useEffect(() => {
        async function run() {
            try {

                const token = getToken();
                console.log(token);
                if(!token){
                    console.log("nhi mila kuch");
                    route.push("/")
                }

                const res = await axios.post("http://localhost:8086/api/auth/callback",{
                    header: {
                        "Authorization": `Bearer ${token}`,
                    }
                });

                if (res.status === 200) {
                    toast.success("Sign in successfully");
                    route.push(`/dashboard`);
                } else {
                    console.error(res);
                    toast.error("Could not authenticate sign-in");
                    route.push(`/`);
                }
            } catch (err) {
                console.error(err);
                toast.error("Server error during sign-in");
                route.push(`/`);
            }
        }

        run();
    }, [getToken, route]);

    return (
        <div className="w-full mt-24 flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
                <h3 className="font-semibold text-xl">Setting up your account...</h3>
                <p>You will be redirected automatically.</p>
            </div>
        </div>
    );
};

export default Page;
