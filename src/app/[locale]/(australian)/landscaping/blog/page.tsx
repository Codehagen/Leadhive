import { allBlogPosts } from "content-collections";

import { getBlurDataURL } from "@/lib/blog/images";
import BlogCard from "@/components/blog/blog-card";
import { constructMetadata } from "@/lib/blog/constructMetadata";

export const metadata = constructMetadata({
  title: "Landscaping Blog – Leadhive",
  description:
    "Latest insights, tips, and updates for landscaping professionals. Learn how to grow your landscaping business with Leadhive.",
});

export default async function LandscapingBlog() {
  const articles = await Promise.all(
    allBlogPosts
      .filter((post) => post.categories.includes("landscaping"))
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

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">No articles yet</h2>
        <p className="text-gray-600">
          Check back soon for landscaping insights and updates.
        </p>
      </div>
    );
  }

  return articles.map((article, idx) => (
    <BlogCard key={article.slug} data={article} priority={idx <= 1} />
  ));
}
