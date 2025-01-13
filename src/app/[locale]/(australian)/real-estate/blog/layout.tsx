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
      <main className="flex flex-col gap-8 px-4 py-16 sm:px-8 md:px-12">
        <div className="mx-auto max-w-screen-xl">
          <h1 className="mb-8 text-4xl font-bold">Real Estate Blog</h1>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
