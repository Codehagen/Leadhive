import { Metadata } from "next";
import { constructMetadata } from "@/lib/utils";
import { allLegalPosts } from "content-collections";
import LegalPage from "@/components/blog/legal";

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy – Leadhive",
  image: "/api/og/help?title=Privacy Policy&summary=leadhive.com/privacy",
});

export default function Privacy() {
  const post = allLegalPosts.find((post) => post.slug === "privacy")!;
  return <LegalPage post={post} />;
}
