"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { uploadLink } from "@/actions/DashboardService";

interface UploadButtonProps {
    setFiles: React.Dispatch<React.SetStateAction<any[]>>;
    token: string | null;
}

const UploadButton: React.FC<UploadButtonProps> = ({ setFiles, token }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [link, setLink] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = async () => {
        if (!token) return toast.error("Unauthorized");
        if (!link.trim()) return toast.error("Please enter a link");

        setIsUploading(true);
        try {
            const uploadedFile = await uploadLink(token, link);
            setFiles((prev) => [uploadedFile, ...prev]); // add to top of list
            toast.success("Link uploaded successfully!");
            setLink(""); // clear input
            setIsOpen(false); // close dialog
        } catch (err: any) {
            toast.error(err.message || "Failed to upload link");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)}>Upload Link</Button>
            </DialogTrigger>

            <DialogContent className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Paste your link here"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="border rounded p-2 w-full"
                />

                <Button onClick={handleUpload} disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload"}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default UploadButton;
