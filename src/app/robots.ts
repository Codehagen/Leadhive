import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  const headersList = headers();
  const domain = headersList.get("host") || "leadhive.tech";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${domain}`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/au/real-estate/*", "/au/landscaping/*"],
        disallow: [
          "/api/",
          "/_next/",
          "/admin/*",
          "/dashboard/*",
          "/editor/*",
          "/settings/*",
          "/auth/*",
          "/private/*",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
