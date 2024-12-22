import { MetadataRoute } from "next";
import { headers } from "next/headers";
import {
  allBlogPosts,
  allChangelogPosts,
  allCustomersPosts,
  allHelpPosts,
  allLegalPosts,
  allIntegrationsPosts,
} from "content-collections";

const LOCALES = ["au"] as const;
const INDUSTRIES = [
  "real-estate",
  "landscaping",
  "electrical",
  "healthcare",
  "loans",
  "construction",
  // "property",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = headers();
  const domain = headersList.get("host") as string;
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const baseUrl = `${protocol}://${domain}`;

  // Static public pages
  const staticPages = [
    "/",
    "/contact",
    "/pricing",
    "/compare",
    "/blog",
    "/help",
    // "/changelog",
    "/customers",
    // "/legal",
    // "/privacy",
    // "/terms",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));

  // Help category pages
  const helpCategories = [
    "admin",
    "getting-started",
    "overview",
    "for-users",
    "integrations",
    "for-providers",
  ].map((category) => ({
    url: `${baseUrl}/help/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Blog category pages
  const blogCategories = ["stories", "agents", "company", "guides"].map(
    (category) => ({
      url: `${baseUrl}/blog/category/${category}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })
  );

  // Non-localized industry pages
  // const industryPages = INDUSTRIES.map((industry) => ({
  //   url: `${baseUrl}/${industry}`,
  //   lastModified: new Date(),
  //   changeFrequency: "daily" as const,
  //   priority: 0.9,
  // }));

  // Locale-specific industry pages
  const localePages = LOCALES.flatMap((locale) =>
    INDUSTRIES.flatMap((industry) => [
      {
        url: `${baseUrl}/${locale}/${industry}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/${industry}/sign-up`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/${industry}/provider/sign-up`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
    ])
  );

  // Dynamic content pages
  const blogPages = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const changelogPages = allChangelogPosts.map((post) => ({
    url: `${baseUrl}/changelog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const customerPages = allCustomersPosts.map((post) => ({
    url: `${baseUrl}/customers/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const helpPages = allHelpPosts.map((post) => ({
    url: `${baseUrl}/help/article/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const legalPages = allLegalPosts.map((post) => ({
    url: `${baseUrl}/legal/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const integrationPages = allIntegrationsPosts.map((post) => ({
    url: `${baseUrl}/integrations/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...helpCategories,
    ...blogCategories,
    // ...industryPages,
    ...localePages,
    ...blogPages,
    ...changelogPages,
    ...customerPages,
    ...helpPages,
    ...legalPages,
    ...integrationPages,
  ];
}
