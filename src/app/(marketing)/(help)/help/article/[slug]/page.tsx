import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allHelpPosts, HelpPost } from "content-collections";
import { ChevronRight } from "lucide-react";

import { constructMetadata } from "@/lib/blog/constructMetadata";
import { HELP_CATEGORIES } from "@/lib/blog/content";
import { getBlurDataURL } from "@/lib/blog/images";
import Author from "@/components/blog/author";
import Feedback from "@/components/blog/feedback";
import HelpArticleLink from "@/components/blog/help-article-link";
import MaxWidthWrapper from "@/components/blog/max-width-wrapper";
import { MDX } from "@/components/blog/mdx";
import SearchButton from "@/components/blog/search-button";
import TableOfContents from "@/components/blog/table-of-contents";

export async function generateStaticParams() {
  return allHelpPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const post = allHelpPosts.find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  const { title, summary } = post;

  return constructMetadata({
    title: `${title} – Leadhive Hjelpesenter`,
    description: summary,
    image: `/api/og/help?title=${encodeURIComponent(
      title
    )}&summary=${encodeURIComponent(summary)}`,
  });
}

export default async function HelpArticle({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const data = allHelpPosts.find((post) => post.slug === params.slug);
  if (!data) {
    notFound();
  }
  const category = HELP_CATEGORIES.find(
    (category) => data.categories[0] === category.slug
  )!;

  const [images] = await Promise.all([
    await Promise.all(
      data.images.map(async (src: string) => ({
        src,
        blurDataURL: await getBlurDataURL(src),
      }))
    ),
  ]);

  const relatedArticles =
    ((data.related &&
      data.related
        .map((slug) => allHelpPosts.find((post) => post.slug === slug))
        .filter(Boolean)) as HelpPost[]) || [];

  return (
    <>
      <MaxWidthWrapper className="flex max-w-screen-lg flex-col py-10">
        <SearchButton />
      </MaxWidthWrapper>

      <div className="border border-border bg-background/50 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur-lg dark:shadow-[inset_10px_-50px_94px_0_rgba(0,0,0,0.2)]">
        <MaxWidthWrapper className="grid max-w-screen-lg grid-cols-4 gap-10 py-10">
          <div className="col-span-4 flex flex-col space-y-8 sm:col-span-3 sm:pr-10">
            <div className="flex items-center space-x-2">
              <Link
                href="/help"
                className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Alle kategorier
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link
                href={`/help/category/${category.slug}`}
                className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {category.title}
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link
                href={`/help/article/${data.slug}`}
                className="truncate text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                {data.title}
              </Link>
            </div>
            <div className="flex flex-col space-y-4">
              <Link href={`/help/article/${data.slug}`}>
                <h1 className="font-display text-3xl font-bold !leading-snug text-foreground sm:text-4xl">
                  {data.title}
                </h1>
              </Link>
              <p className="text-muted-foreground">{data.summary}</p>
              <Author username={data.author} updatedAt={data.updatedAt} />
            </div>
            <MDX code={data.mdx} images={images} />
            {relatedArticles.length > 0 && (
              <div className="flex flex-col space-y-4 border-t border-border pt-8">
                <h2 className="font-display text-xl font-bold text-foreground sm:text-2xl">
                  Relevant articles
                </h2>
                <div className="grid gap-2 rounded-xl border border-border bg-card p-4">
                  {relatedArticles.map((article) => (
                    <HelpArticleLink key={article.slug} article={article} />
                  ))}
                </div>
              </div>
            )}
            <Feedback />
          </div>
          <div className="sticky top-20 col-span-1 hidden flex-col space-y-10 divide-y divide-border self-start sm:flex">
            {data.tableOfContents.length > 0 && (
              <TableOfContents items={data.tableOfContents} />
            )}
            <div className="flex justify-center pt-5">
              <Link
                href={`https://github.com/codehagen/leadhive/blob/main/app/content/help/${params.slug}.mdx`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Found a typo? Edit this page ↗
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </>
  );
}
