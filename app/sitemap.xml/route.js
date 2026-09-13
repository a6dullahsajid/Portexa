import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://portexa.vercel.app";

// Escape special XML characters
function escapeXml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];

    // --------------------------------------------------
    // Get all users from Firestore
    // --------------------------------------------------

    const usersSnapshot = await db.collection("users").get();

    // --------------------------------------------------
    // Generate portfolio URLs
    // --------------------------------------------------

    const portfolioUrls = usersSnapshot.docs
      .map((doc) => {
        const userData = doc.data();

        // Ignore users without username
        if (!userData.userName) {
          return "";
        }

        // Ignore preview/demo accounts
        if (userData.userName.startsWith("preview_")) {
          return "";
        }

        const username = encodeURIComponent(userData.userName);

        const name =
          userData.details?.name ||
          userData.userName;

        const profileImage =
          userData.details?.profileImage;

        return `
  <url>
    <loc>${escapeXml(`${SITE_URL}/${username}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${
      profileImage
        ? `
    <image:image>
      <image:loc>${escapeXml(profileImage)}</image:loc>
      <image:title>${escapeXml(
        `${name} - Portfolio`
      )}</image:title>
      <image:caption>${escapeXml(
        `${name}'s professional portfolio`
      )}</image:caption>
    </image:image>`
        : ""
    }
  </url>`;
      })
      .filter(Boolean)
      .join("");

    // --------------------------------------------------
    // Static public pages
    // --------------------------------------------------

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>

<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Homepage -->
  <url>
    <loc>${escapeXml(SITE_URL)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>

    <image:image>
      <image:loc>${escapeXml(
        `${SITE_URL}/logo.png`
      )}</image:loc>

      <image:title>Portexa - Portfolio Builder</image:title>

      <image:caption>
        Create professional portfolios with Portexa
      </image:caption>
    </image:image>
  </url>

  <!-- Public Portfolio Pages -->
  ${portfolioUrls}

</urlset>`;

    return new NextResponse(sitemap, {
      status: 200,

      headers: {
        "Content-Type": "application/xml",

        // Cache for 1 hour
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap generation failed:", error);

    return new NextResponse(
      "Failed to generate sitemap",
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }
}