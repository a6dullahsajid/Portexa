// app/[userName]/page.js

import { db } from "@/lib/firebaseAdmin";
import HomePage1 from "@/components/template1/HomePage1";
import HomePage2 from "@/components/template2/HomePage2";
import HomePage3 from "@/components/template3/HomePage3";
import HomePage4 from "@/components/template4/HomePage4";
import HomePage5 from "@/components/template5/HomePage5";
import dummyData from "@/lib/dummy_data";
import NoData from "@/components/NoData";

// Template mapping configuration
const TEMPLATE_COMPONENTS = {
  template1: HomePage1,
  template2: HomePage2,
  template3: HomePage3,
  template4: HomePage4,
  template5: HomePage5,
};

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

  if (userName.startsWith("preview_")) {
    const templateId = userName.split("_")[1];
    const TemplateComponent = TEMPLATE_COMPONENTS[templateId];
    if (!TemplateComponent) {
      return <NoData />;
    }
    return <TemplateComponent userData={dummyData} />;
  }

  const userData = await getUserData(userName);
  
  // Handle case where user data doesn't exist
  if (!userData) {
    return <NoData />;
  }

  // Get the appropriate template component
  const TemplateComponent = TEMPLATE_COMPONENTS[userData.template];
  
  // Handle case where template doesn't exist
  if (!TemplateComponent) {
    return <NoData />;
  }

  // Render the template component
  return <TemplateComponent userData={userData} />;
}