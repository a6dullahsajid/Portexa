import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { v2 as cloudinary } from "cloudinary";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/firebaseAdmin";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getProfileImagePublicId = (imageUrl) => {
  try {
    const url = new URL(imageUrl);
    if (url.hostname !== "res.cloudinary.com") return null;

    const segments = url.pathname.split("/").filter(Boolean);
    if (segments[0] !== process.env.CLOUDINARY_CLOUD_NAME) return null;

    const uploadIndex = segments.findIndex(
      (segment, index) => segment === "image" && segments[index + 1] === "upload"
    );
    if (uploadIndex === -1) return null;

    const assetSegments = segments.slice(uploadIndex + 2);
    if (assetSegments[0] && /^v\d+$/.test(assetSegments[0])) {
      assetSegments.shift();
    }

    const lastSegmentIndex = assetSegments.length - 1;
    if (lastSegmentIndex < 0) return null;
    assetSegments[lastSegmentIndex] = assetSegments[lastSegmentIndex].replace(/\.[^.]+$/, "");

    const publicId = assetSegments.join("/");
    return publicId.startsWith("portexa/") ? publicId : null;
  } catch {
    return null;
  }
};

export async function DELETE(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const requestBody = await request.text();
    let type = "profile";
    let requestedImageUrl;
    let requestedProjectIndex;
    if (requestBody) {
      try {
        ({
          type = "profile",
          imageUrl: requestedImageUrl,
          projectIndex: requestedProjectIndex
        } = JSON.parse(requestBody));
      } catch {
        return NextResponse.json({ success: false, message: "Invalid request body." }, { status: 400 });
      }
    }

    const userRef = db.collection("users").doc(session.user.email);
    const userSnapshot = await userRef.get();
    const userData = userSnapshot.data();
    const profileImage = userData?.details?.profileImage;
    let imageUrl = profileImage;
    let updateData = { "details.profileImage": "" };

    if (type === "project") {
      const projects = Array.isArray(userData?.details?.projects) ? userData.details.projects : [];
      const projectIndex = Number.isInteger(requestedProjectIndex)
        ? requestedProjectIndex
        : projects.findIndex((project) => project.image === requestedImageUrl);
      if (
        !requestedImageUrl ||
        projectIndex < 0 ||
        projectIndex >= projects.length ||
        projects[projectIndex].image !== requestedImageUrl
      ) {
        return NextResponse.json({ success: false, message: "Project image not found." }, { status: 404 });
      }

      imageUrl = requestedImageUrl;
      const updatedProjects = [...projects];
      updatedProjects[projectIndex] = { ...updatedProjects[projectIndex], image: "" };
      updateData = {
        "details.projects": updatedProjects
      };
    } else if (type !== "profile") {
      return NextResponse.json({ success: false, message: "Unsupported image type." }, { status: 400 });
    }

    if (!imageUrl) {
      return NextResponse.json({ success: false, message: "No image found." }, { status: 404 });
    }

    const publicId = getProfileImagePublicId(imageUrl);
    if (!publicId) {
      return NextResponse.json({ success: false, message: "Image is not a supported Cloudinary asset." }, { status: 400 });
    }

    const deletion = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
    if (deletion.result !== "ok" && deletion.result !== "not found") {
      throw new Error(`Cloudinary image deletion failed: ${deletion.result}`);
    }

    await userRef.update(updateData);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ success: false, message: "Failed to delete image." }, { status: 500 });
  }
}
