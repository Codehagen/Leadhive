import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default function robots(): MetadataRoute.Robots {
  const headersList = headers();
  const domain = headersList.get("host") || "leadhive.com";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${domain}`;

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/real-estate/*", "/landscaping/*"],
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
