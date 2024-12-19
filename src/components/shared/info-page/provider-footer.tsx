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
          { href: "/au/real-estate/", text: "Our Services" },
          { href: "/au/real-estate/", text: "Features" },
          { href: "/au/real-estate/pricing", text: "Pricing" },
          { href: "/au/real-estate/", text: "Case Studies" },
        ],
      },
      {
        title: "Resources",
        links: [
          { href: "au/real-estate/providers", text: "Agent Guides" },
          { href: "au/real-estate/providers", text: "Market Insights" },
          { href: "au/real-estate/blog", text: "Blog" },
          { href: "au/real-estate/help", text: "Help Center" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "/", text: "About Us" },
          { href: "/contact", text: "Contact" },
          { href: "/", text: "Careers" },
          { href: "/", text: "Partner Program" },
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
          { href: "/au/landscaping/", text: "Our Services" },
          { href: "/au/landscaping/", text: "Features" },
          { href: "/au/landscaping/pricing", text: "Pricing" },
          { href: "/au/landscaping/", text: "Case Studies" },
        ],
      },
      {
        title: "Resources",
        links: [
          { href: "/au/landscaping/providers", text: "Business Guides" },
          { href: "/au/landscaping/providers", text: "Industry Insights" },
          { href: "/au/landscaping/blog", text: "Blog" },
          { href: "/au/landscaping/help", text: "Help Center" },
        ],
      },
      {
        title: "Company",
        links: [
          { href: "/", text: "About Us" },
          { href: "/contact", text: "Contact" },
          { href: "/", text: "Careers" },
          { href: "/", text: "Partner Program" },
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
