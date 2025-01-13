import Footer from "@/components/landscaping/sections/footer";
import Header from "@/components/landscaping/sections/header";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default async function LandscapingBlogLayout({
  children,
}: BlogLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
