import { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import { allLegalPosts } from "content-collections";
import LegalPage from "@/components/blog/legal";

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service – Leadhive",
  image: "/api/og/help?title=Terms of Service&summary=leadhive.com/terms",
});

export default function Terms() {
  const post = allLegalPosts.find((post) => post.slug === "terms")!;
  return <LegalPage post={post} />;
}
