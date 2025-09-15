import {useRouter} from "next/router";
import {redirect, useSearchParams} from "next/navigation";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import toast from "react-hot-toast";

const Page = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const origin = searchParams.get("origin");

    const handleAuth = async () => {
        try{
            const { getAccessToken } = getKindeServerSession();
            const accessToken = await getAccessToken();
            if (!accessToken) {
                toast.error("Please sign in first");
                await router.push("/");
                return;
            }

            const res = await fetch("http://localhost:8086/api/auth/callback",{
                method: "POST",
                headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
                },
            });

            if (res.status === 200) {
                toast.success("Welcome to AskLink");
                await router.push(`${origin}`);
            }else {
                toast.error("Oops something went wrong");
                await router.push("/");
            }
        }
        catch(error){
            console.error(error);
            toast.error("Please sign in first");
            redirect("/")
        }
    }
}
export default Page;