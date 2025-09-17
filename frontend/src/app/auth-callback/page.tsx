"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import {useEffect} from "react";
import {authcallback} from "@/services/authcallback";
import toast from "react-hot-toast";

const Page = () => {
    const route = useRouter()

    const searchParams = useSearchParams()
    const origin = searchParams.get('origin')

    useEffect(() => {
        async function run() {
            // const { getAccessToken } = getKindeServerSession();
            // const token = await getAccessToken();

            const res = await authcallback();
            console.log(res.status)
            if(res.status === 200){
                toast.success("Sign in successfully");
                route.push(`/dashboard`);
            }else {
                console.error(res);
                toast.error("Could not authenticate sign-in");
                route.push(`/`);
            }

        }

        run();

    }, []);



    return (
        <div className='w-full mt-24 flex justify-center'>
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
                <h3 className='font-semibold text-xl'>
                    Setting up your account...
                </h3>
                <p>You will be redirected automatically.</p>
            </div>
        </div>
    )
}

export default Page;


