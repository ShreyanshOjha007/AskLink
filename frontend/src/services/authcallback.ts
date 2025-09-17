"use server";
import axios from "axios";

export async function authcallback() {
    return axios.get("http://localhost:8086/api/auth/callback");
}