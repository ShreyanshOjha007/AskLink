
import {useRouter} from "next/router";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {redirect} from "next/navigation";

const Page = async () => {
    const { getUser } = getKindeServerSession()
    const user = await getUser()

    redirect('/auth-callback?origin=dashboard')


    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Page;