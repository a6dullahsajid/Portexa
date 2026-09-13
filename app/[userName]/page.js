// app/[userName]/page.js

import { db } from "@/lib/firebaseAdmin";
import HomePage1 from "@/components/template1/HomePage1";
import HomePage2 from "@/components/template2/HomePage2";
import HomePage3 from "@/components/template3/HomePage3";
import HomePage4 from "@/components/template4/HomePage4";
import HomePage5 from "@/components/template5/HomePage5";
import HomePage6 from "@/components/template6/Homepage6";
import Homepage7 from "@/components/template7/Homepage7";
import dummyData from "@/lib/dummy_data";
import NoData from "@/components/NoData";

const TEMPLATE_COMPONENTS = {
  template1: HomePage1,
  template2: HomePage2,
  template3: HomePage3,
  template4: HomePage4,
  template5: HomePage5,
  template6: HomePage6,
  template7: Homepage7,
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://portexa.vercel.app";


// --------------------------------------------------
// Fetch user data
// --------------------------------------------------

async function getUserData(userName) {
  const usersRef = db.collection("users");

  const querySnapshot = await usersRef
    .where("userName", "==", userName)
    .limit(1)
    .get();

  if (querySnapshot.empty) {
    return null;
  }

  return querySnapshot.docs[0].data();
}


// --------------------------------------------------
// Clean text for SEO
// --------------------------------------------------

function cleanDescription(text = "", maxLength = 160) {
  const cleaned = text
    .replace(/\s+/g, " ")
    .replace(/<[^>]*>/g, "")
    .trim();

  if (cleaned.length <= maxLength) {
    return cleaned;
  }

  return `${cleaned.substring(0, maxLength - 3).trim()}...`;
}


// --------------------------------------------------
// Dynamic SEO Metadata
// --------------------------------------------------

export async function generateMetadata({ params }) {
  const { userName } = await params;

  // Preview pages should not be indexed
  if (userName.startsWith("preview_")) {
    return {
      title: "Portfolio Preview",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const userData = await getUserData(userName);

  // User doesn't exist
  if (!userData) {
    return {
      title: "Portfolio Not Found",
      description: "The requested portfolio could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const name = userData.details.name || userData.userName;
  const title = `${userData.details.title} | Portfolio`;

  const description = cleanDescription(
    userData.details?.bio ||
    `${name} is a ${userData.details?.title || "professional"} showcasing projects, skills, experience and professional work.`,
    160
  );

  const canonicalUrl = `${SITE_URL}/${userData.userName}`;

  const skills = Array.isArray(userData.details.skills)
    ? userData.details.skills.filter(Boolean)
    : [];

  const keywords = [
    name,
    title,
    ...skills,
    "portfolio",
    "developer",
    "web developer",
    "software developer",
  ];

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: `${name} | ${title}`,
      template: `%s | ${name}`,
    },

    description,

    keywords,

    authors: [
      {
        name,
        url: canonicalUrl,
      },
    ],

    creator: name,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    openGraph: {
      type: "profile",
      url: canonicalUrl,
      title: `${name} | ${title}`,
      description,
      siteName: "Portexa",
      locale: "en_US",

      images: userData.details?.profileImage
        ? [
          {
            url: userData.details.profileImage,
            width: 1200,
            height: 630,
            alt: `${name} - ${title}`,
          },
        ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title: `${name} | ${title}`,
      description,

      images: userData.details?.profileImage
        ? [userData.details.profileImage]
        : [],
    },

    category: "Portfolio",
  };
}


// --------------------------------------------------
// Page
// --------------------------------------------------

export default async function UserPortfolioPage({ params }) {
  const { userName } = await params;

  // Preview page
  if (userName.startsWith("preview_")) {
    const templateId = userName.split("_")[1];

    const TemplateComponent = TEMPLATE_COMPONENTS[templateId];

    if (!TemplateComponent) {
      return <NoData />;
    }

    return <TemplateComponent userData={dummyData} />;
  }

  // Get user
  const userData = await getUserData(userName);

  if (!userData) {
    return <NoData />;
  }

  // Get template
  const TemplateComponent = TEMPLATE_COMPONENTS[userData.template];

  if (!TemplateComponent) {
    return <NoData />;
  }

  const name = userData.details?.name || userData.userName;
  const title = `${userData.details?.title} | Portfolio`;

  // --------------------------------------------------
  // JSON-LD Structured Data
  // --------------------------------------------------

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",

    name,

    jobTitle: title,

    description: cleanDescription(userData.details?.bio, 300),

    url: `${SITE_URL}/${userData.userName}`,

    ...(userData.details.profileImage && {
      image: userData.details.profileImage,
    }),

    ...(userData.details.email && {
      email: userData.details.email,
    }),

    sameAs: [
      userData.details.github,
      userData.details.linkedin,
      userData.details.x,
    ].filter(Boolean),

    ...(Array.isArray(userData.details.skills) &&
      userData.details.skills.length > 0 && {
      knowsAbout: userData.details.skills,
    }),

    ...(Array.isArray(userData.details.projects) &&
      userData.details.projects.length > 0 && {
      hasOccupation: {
        "@type": "Occupation",
        name: title,
      },
    }),
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />

      <TemplateComponent userData={userData} />
    </>
  );
}