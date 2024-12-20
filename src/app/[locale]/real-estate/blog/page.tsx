import { allBlogPosts } from "content-collections";

import { getBlurDataURL } from "@/lib/blog/images";
import BlogCard from "@/components/blog/blog-card";
import { constructMetadata } from "@/lib/blog/constructMetadata";

export const metadata = constructMetadata({
  title: "Real Estate Blog – Fotovibe",
  description: "Latest real estate news and updates from Fotovibe.",
});

export default async function RealEstateBlog() {
  const articles = await Promise.all(
    allBlogPosts
      .filter((post) => post.categories.includes("real-estate"))
      .sort(
        (a, b) =>
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
      .map(async (post) => ({
        title: post.title,
        summary: post.summary,
        publishedAt: post.publishedAt,
        image: post.image,
        author: post.author,
        slug: post.slug,
        categories: post.categories,
        blurDataURL: await getBlurDataURL(post.image),
      }))
  );

  return articles.map((article, idx) => (
    <BlogCard key={article.slug} data={article} priority={idx <= 1} />
  ));
}
