import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin"; // Admin SDK
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const email = session.user.email;

    await db.collection("users").doc(email).set(body, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving user data to Firebase:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
