"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { token, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !token) {
            router.replace("/login");
        }
    }, [token, loading, router]);

    if (loading || !token) return <p>Loading...</p>;

    return <>{children}</>;
}

export default ProtectedRoute;