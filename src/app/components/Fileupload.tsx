"use client"

import {
    ImageKitAbortError, ImageKitInvalidRequestError, ImageKitServerError, ImageKitUploadNetworkError, upload,
} from "@imagekit/next";
import { useState } from "react";

interface FileUploadProps {
    onSuccess: (res: any) => void
    onProgress?: (progress: number) => void
    fileType?: "image" | "video"
}

const Fileupload = ({
    onSuccess,
    onProgress,
    fileType
}: FileUploadProps) => {
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("Please upload valid video file type")
            }
        }
        if (file.size > 100 * 1024 * 1024) {
            setError("File size must be less than 100 MB")
        }
        return true
    }

    const authenticator = async () => {
        try {
            const response = await fetch("/api/");
            if (!response.ok) {
                // If the server response is not successful, extract the error text for debugging.
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            // Parse and destructure the response JSON for upload credentials.
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            // Log the original error for debugging before rethrowing a new error.
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };


    const handleUpload = async () => {
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }

        // Extract the first file from the file input
        const file = fileInput.files[0];

        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;


        // important task !
        try {
            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, // Optionally set a custom file name
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                // Abort signal to allow cancellation of the upload if needed.
                abortSignal: abortController.signal,
            });
            console.log("Upload response:", uploadResponse);
        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
            }
        }
    };

    return (
        <>
            <input
                type="file"
                accept={fileType === "video" ? "video/*" : "image/*"}
                onChange={handleFileChange}
            />
        </>
    );
};

export default Fileupload;