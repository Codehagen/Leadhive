import Footer from "@/components/real-estate/sections/footer";
import Header from "@/components/real-estate/sections/header";

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default async function RealEstateBlogLayout({
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
