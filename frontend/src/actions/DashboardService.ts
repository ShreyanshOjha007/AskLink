import axios from "axios";


export const getUserFiles = async (token: string | null) => {
    if (!token) throw new Error("No token provided");

    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/file/getUserFiles`,
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );

    return res.data;
}

export const deleteUserFile = async (token: string | null, id: number) => {
    try {
        const res = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/file/deleteUserFile/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.status;
    } catch (err) {
        console.error("Failed to delete user file:", err);
        throw err;
    }
}

export const uploadLink = async (token: string | null, link: string) => {
    if (!token) throw new Error("Unauthorized");
    if (!link.trim()) throw new Error("Link cannot be empty");

    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/file/uploadLink`,
            { link },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error: any) {
        console.error("Failed to upload link:", error);
        throw error;
    }
};

