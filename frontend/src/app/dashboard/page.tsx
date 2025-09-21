'use client'
import {useEffect} from "react";
import {useRouter} from "next/navigation";

const Page = () => {

    const router = useRouter();

    useEffect(() => {
        router.push("/auth-callback");
    }, [router]);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Page;