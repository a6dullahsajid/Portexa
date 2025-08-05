// app/[userName]/page.js

import { db } from "@/lib/firebaseAdmin";
import { notFound } from "next/navigation";
import HomePage1 from "@/components/template1/HomePage1";
import HomePage2 from "@/components/template2/HomePage2";
import HomePage3 from "@/components/template3/HomePage3";

// This function fetches the specific user's data from Firestore
async function getUserData(userName) {
  const usersRef = db.collection("users");
  const querySnapshot = await usersRef.where("userName", "==", userName).limit(1).get();

  if (querySnapshot.empty) {
    return null;
  }

  return querySnapshot.docs[0].data();
}

export default async function UserPortfolioPage({ params }) {
  const { userName } = await params;
  const userData = await getUserData(userName);
  if (!userData) {
    notFound();
  }
  else if (userData.template === "template1") {
    return <HomePage1 userData={userData} />;
  }
  else if (userData.template === "template2") {
    return <HomePage2 userData={userData} />;
  } else if (userData.template === "template3") {
    return <HomePage3 userData={userData} />
  }
}