"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";

const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file, onSuccess) => {
    setUploading(true);
    const uploadingToast = toast.loading("Uploading image...");

    try {
      // Step 1: Get signature from API
      const sigRes = await fetch("/api/upload");
      const { timestamp, signature, apiKey, cloudName, folder } = await sigRes.json();

      // Step 2: Create formData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("folder", folder);

      // Step 3: Upload to Cloudinary
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await uploadRes.json();
      toast.dismiss(uploadingToast);

      if (uploadRes.ok) {
        toast.success("Image uploaded successfully ✅");
        onSuccess(data.secure_url);
      } else {
        toast.error(data.error?.message || "Upload failed ❌");
      }
    } catch (err) {
      toast.dismiss(uploadingToast);
      toast.error("Something went wrong ❌");
      console.error("Cloudinary upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, uploading };
};

export default useCloudinaryUpload;
