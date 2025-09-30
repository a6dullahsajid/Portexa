import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Change from POST to GET
export async function GET(req) { 
  try {
    const session = await getServerSession(authOptions);
    console.log("SESSION:", session);

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const email = session.user.email;
    const docRef = db.collection("users").doc(email);
    const doc = await docRef.get();

    if (!doc.exists) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, user: doc.data() });
  } catch (error) {
    console.error("Fetch user error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}