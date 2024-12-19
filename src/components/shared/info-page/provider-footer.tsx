import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";

interface ProviderFooterProps {
  industry: "real-estate" | "landscaping";
  locale: string;
}

const industryContent = {
  "real-estate": {
    footer: [
      {
        title: "Services",
        links: [
          { href: "/real-estate/services", text: "Our Services" },
          { href: "/real-estate/features", text: "Features" },
          { href: "/real-estate/pricing", text: "Pricing" },
          { href: "/real-estate/case-studies", text: "Case Studies" },
        ],
      },
      {
        title: "Resources",
        links: [
          { href: "/real-estate/guides", text: "Agent Guides" },
          { href: "/real-estate/market-insights", text: "Market Insights" },
          { href: "/real-estate/blog", text: "Blog" },
          { href: "/real-estate/help", text: "Help Center" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "/about", text: "About Us" },
          { href: "/contact", text: "Contact" },
          { href: "/careers", text: "Careers" },
          { href: "/partners", text: "Partner Program" },
        ],
      },
      {
        title: "Connect",
        links: [
          {
            href: siteConfig.links.linkedin,
            text: "LinkedIn",
            icon: <FaLinkedin />,
          },
          {
            href: siteConfig.links.facebook,
            text: "Facebook",
            icon: <FaFacebook />,
          },
          {
            href: siteConfig.links.instagram,
            text: "Instagram",
            icon: <FaInstagram />,
          },
          { href: `mailto:${siteConfig.links.email}`, text: "Email Us" },
        ],
      },
    ],
  },
  landscaping: {
    footer: [
      {
        title: "Services",
        links: [
          { href: "/landscaping/services", text: "Our Services" },
          { href: "/landscaping/features", text: "Features" },
          { href: "/landscaping/pricing", text: "Pricing" },
          { href: "/landscaping/case-studies", text: "Case Studies" },
        ],
      },
      {
        title: "Resources",
        links: [
          { href: "/landscaping/guides", text: "Business Guides" },
          { href: "/landscaping/industry-insights", text: "Industry Insights" },
          { href: "/landscaping/blog", text: "Blog" },
          { href: "/landscaping/help", text: "Help Center" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "/about", text: "About Us" },
          { href: "/contact", text: "Contact" },
          { href: "/careers", text: "Careers" },
          { href: "/partners", text: "Partner Program" },
        ],
      },
      {
        title: "Connect",
        links: [
          {
            href: siteConfig.links.linkedin,
            text: "LinkedIn",
            icon: <FaLinkedin />,
          },
          {
            href: siteConfig.links.facebook,
            text: "Facebook",
            icon: <FaFacebook />,
          },
          {
            href: siteConfig.links.instagram,
            text: "Instagram",
            icon: <FaInstagram />,
          },
          { href: `mailto:${siteConfig.links.email}`, text: "Email Us" },
        ],
      },
    ],
  },
};

export function ProviderFooter({ industry, locale }: ProviderFooterProps) {
  const content = industryContent[industry];

  return (
    <footer>
      <div className="max-w-6xl mx-auto py-16 sm:px-10 px-5 pb-0">
        <a
          href="/"
          title={siteConfig.name}
          className="relative mr-6 flex items-center space-x-2"
        >
          <Icons.logo className="w-auto h-[40px]" />
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </a>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 mt-8">
          {content.footer.map((section, index) => (
            <div key={index} className="mb-5">
              <h2 className="font-semibold">{section.title}</h2>
              <ul>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="my-2">
                    <Link
                      href={link.href}
                      className="group inline-flex cursor-pointer items-center justify-start gap-1 text-muted-foreground duration-200 hover:text-foreground hover:opacity-90"
                    >
                      {link.icon && link.icon}
                      {link.text}
                      <ChevronRight className="h-4 w-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto border-t py-2 grid md:grid-cols-2 h-full justify-between w-full grid-cols-1 gap-1">
          <span className="text-sm tracking-tight text-foreground">
            © {new Date().getFullYear()}{" "}
            <Link href="/" className="cursor-pointer">
              {siteConfig.name}
            </Link>{" "}
            - {siteConfig.description}
          </span>
          <ul className="flex justify-start md:justify-end text-sm tracking-tight text-foreground">
            <li className="mr-3 md:mx-4">
              <Link href="/privacy" rel="noopener noreferrer">
                Privacy Policy
              </Link>
            </li>
            <li className="mr-3 md:mx-4">
              <Link href="/terms" rel="noopener noreferrer">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
