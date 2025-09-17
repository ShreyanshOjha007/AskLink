"use server";
import axios from "axios";

export async function maaChodDo() {
    await axios.get("http://localhost:8086/api/machod");
    return null
}