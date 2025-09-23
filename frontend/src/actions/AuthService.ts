import axios from 'axios';

export const authLogin = async (data: {email: string ; password: string}) => {
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, data);
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error; // propagate to caller (optional)
    }
};


export const register = async (data : {name: string ; email: string, password: string}) => {
    try{
        return await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);

    }catch(error){
        console.error("Register error:", error);
        throw error;
    }
}