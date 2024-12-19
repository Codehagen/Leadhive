import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Leadhive",
  description: "Get free proposals from top local real estate agents.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "real estate agent finder",
    "compare real estate agents",
    "free agent proposals",
    "find local realtor",
    "best real estate agents",
    "sell my house",
    "home selling service",
  ],
  links: {
    email: "kontakt@leadhive.no",
    instagram: "https://instagram.com/leadhive.no",
    facebook: "https://facebook.com/leadhive.no",
    linkedin: "https://linkedin.com/company/leadhive",
  },
  header: [
    {
      trigger: "Services",
      content: {
        main: {
          icon: <Icons.logo className="h-6 w-6" />,
          title: "Find Your Agent",
          description:
            "Get matched with top local real estate agents for free.",
          href: "/property",
        },
        items: [
          {
            href: "/property",
            title: "Home Selling",
            description:
              "Get expert help selling your property for the best price.",
          },
          {
            href: "/property",
            title: "Agent Matching",
            description: "Compare proposals from pre-screened local agents.",
          },
          {
            href: "/property",
            title: "Market Analysis",
            description: "Get detailed insights about your local market.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "For Home Sellers",
            href: "/property",
            description: "Find the perfect agent to sell your property.",
          },
          {
            title: "For First-Time Sellers",
            href: "/property",
            description: "Expert guidance for your first home sale.",
          },
          {
            title: "For Luxury Properties",
            href: "/property",
            description: "Specialized agents for high-end real estate.",
          },
          {
            title: "For Quick Sales",
            href: "/property",
            description: "Fast-track your property sale with top agents.",
          },
          {
            title: "For Investment Properties",
            href: "/property",
            description: "Expert agents for investment property sales.",
          },
          {
            title: "For Real Estate Agents",
            href: "/agents",
            description: "Get more information about lead generation",
          },
        ],
      },
    },
    {
      href: "/customers",
      label: "Customers",
    },
    {
      href: "/pricing",
      label: "Pricing",
    },
    {
      href: "/blog",
      label: "Blogg",
    },
  ],
  industryHeaders: {
    "real-estate": [
      {
        trigger: "Services",
        content: {
          main: {
            icon: <Icons.logo className="h-6 w-6" />,
            title: "Real Estate Services",
            description: "Find top local real estate agents for your property.",
            href: "/au/real-estate/services",
          },
          items: [
            {
              href: "/au/real-estate/selling",
              title: "Property Selling",
              description: "Expert guidance for selling your property.",
            },
            {
              href: "/au/real-estate/buying",
              title: "Property Buying",
              description: "Find the perfect property with expert agents.",
            },
            {
              href: "/au/real-estate/investment",
              title: "Investment Properties",
              description: "Maximize your real estate investments.",
            },
          ],
        },
      },
      {
        trigger: "Resources",
        content: {
          items: [
            {
              title: "Market Reports",
              href: "/au/real-estate/market-reports",
              description: "Stay informed with local market insights.",
            },
            {
              title: "Property Guides",
              href: "/au/real-estate/guides",
              description: "Expert guides for property transactions.",
            },
            {
              title: "Agent Directory",
              href: "/au/real-estate/agents",
              description: "Browse our network of verified agents.",
            },
          ],
        },
      },
      {
        href: "/au/real-estate/about",
        label: "About",
      },
      {
        href: "/au/real-estate/contact",
        label: "Contact",
      },
    ],
    landscaping: [
      {
        trigger: "Services",
        content: {
          main: {
            icon: <Icons.logo className="h-6 w-6" />,
            title: "Landscaping Services",
            description: "Connect with professional landscaping contractors.",
            href: "/au/landscaping/services",
          },
          items: [
            {
              href: "/au/landscaping/residential",
              title: "Residential",
              description: "Transform your home's outdoor space.",
            },
            {
              href: "/au/landscaping/commercial",
              title: "Commercial",
              description: "Professional landscaping for businesses.",
            },
            {
              href: "/au/landscaping/maintenance",
              title: "Maintenance",
              description: "Regular care for your landscape.",
            },
          ],
        },
      },
      {
        trigger: "Resources",
        content: {
          items: [
            {
              title: "Design Ideas",
              href: "/au/landscaping/design-ideas",
              description: "Inspiration for your outdoor space.",
            },
            {
              title: "Contractor Guides",
              href: "/au/landscaping/guides",
              description: "How to choose the right contractor.",
            },
            {
              title: "Project Gallery",
              href: "/au/landscaping/gallery",
              description: "View completed landscaping projects.",
            },
          ],
        },
      },
      {
        href: "/au/landscaping/about",
        label: "About",
      },
      {
        href: "/au/landscaping/contact",
        label: "Contact",
      },
    ],
  },
  pricing: [
    {
      name: "BASIC",
      href: "/sign-up",
      price: "10000",
      period: "mnd",
      yearlyPrice: "8333",
      features: [
        "1 fotosesjon per måned",
        "20 høyoppløselige bilder",
        "Profesjonell bilderedigering",
        "Digital bildemappe",
        "Ubegrenset nedlastinger",
        "24/48 timers levering",
        "Ingen bindingstid",
      ],
      description: "Perfekt for små og mellomstore bedrifter",
      buttonText: "Kom i gang",
      isPopular: false,
      billingText: {
        monthly: "fakturert månedlig",
        yearly: "fakturert månedlig",
      },
    },
    {
      name: "PRO",
      href: "/sign-up",
      price: "15000",
      period: "mnd",
      yearlyPrice: "12500",
      features: [
        "1 fotosesjon per måned",
        "40 høyoppløselige bilder",
        "3-5 korte videosnutter",
        "Sosiale medier-pakke",
        "Prioritert fotograftilgang",
        "24 timers levering",
        "Dedikert kundeansvarlig",
        "Ingen bindingstid",
      ],
      description:
        "Ideell for voksende bedrifter med aktiv digital tilstedeværelse",
      buttonText: "Kom i gang",
      isPopular: true,
      billingText: {
        monthly: "fakturert månedlig",
        yearly: "fakturert måndelig",
      },
    },
    {
      name: "ENTERPRISE",
      href: "/sign-up",
      price: "20000",
      period: "mnd",
      yearlyPrice: "16667",
      features: [
        "1 fotosesjon per måned",
        "Ubegrenset antall bilder",
        "Skreddersydd videoproduksjon",
        "Drone-fotografering",
        "Egen dedikert fotograf",
        "Express levering (12 timer)",
        "Prioritert support 24/7",
        "Eksklusiv bilderettigheter",
      ],
      description: "For større bedrifter med omfattende behov",
      buttonText: "Kontakt oss",
      isPopular: false,
      billingText: {
        monthly: "fakturert månedlig",
        yearly: "fakturert månedlig",
      },
    },
  ],
  faqs: [
    {
      question: "What is fotovibe?",
      answer: (
        <span>
          fotovibe is a platform that helps you build and manage your AI-powered
          applications. It provides tools and services to streamline the
          development and deployment of AI solutions.
        </span>
      ),
    },
    {
      question: "How can I get started with fotovibe?",
      answer: (
        <span>
          You can get started with fotovibe by signing up for an account on our
          website, creating a new project, and following our quick-start guide.
          We also offer tutorials and documentation to help you along the way.
        </span>
      ),
    },
    {
      question: "What types of AI models does fotovibe support?",
      answer: (
        <span>
          fotovibe supports a wide range of AI models, including but not limited
          to natural language processing, computer vision, and predictive
          analytics. We continuously update our platform to support the latest
          AI technologies.
        </span>
      ),
    },
    {
      question: "Is fotovibe suitable for beginners in AI development?",
      answer: (
        <span>
          Yes, fotovibe is designed to be user-friendly for both beginners and
          experienced developers. We offer intuitive interfaces, pre-built
          templates, and extensive learning resources to help users of all skill
          levels create AI-powered applications.
        </span>
      ),
    },
    {
      question: "What kind of support does fotovibe provide?",
      answer: (
        <span>
          fotovibe provides comprehensive support including documentation, video
          tutorials, a community forum, and dedicated customer support. We also
          offer premium support plans for enterprises with more complex needs.
        </span>
      ),
    },
  ],
  footer: [
    {
      title: "Services",
      links: [
        { href: "/property", text: "Find an Agent", icon: null },
        { href: "/property", text: "Home Selling", icon: null },
        { href: "/property", text: "Market Analysis", icon: null },
        { href: "/property", text: "Agent Comparison", icon: null },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", text: "About LeadHive", icon: null },
        {
          href: "/agents/",
          text: "For Real Estate Agents",
          icon: null,
        },
        { href: "/blog", text: "Blog", icon: null },
        { href: "/contact", text: "Contact Us", icon: null },
      ],
    },
    {
      title: "Resources",
      links: [
        { href: "/help", text: "Help Center", icon: null },
        { href: "/terms", text: "Terms & Conditions", icon: null },
        { href: "/faq", text: "FAQ", icon: null },
        { href: "/privacy", text: "Privacy Policy", icon: null },
      ],
    },
    {
      title: "Follow Us",
      links: [
        {
          href: "https://instagram.com/leadhive",
          text: "Instagram",
          icon: <RiInstagramFill />,
        },
        {
          href: "https://facebook.com/leadhive",
          text: "Facebook",
          icon: <FaFacebook />,
        },
        {
          href: "https://linkedin.com/company/leadhive",
          text: "LinkedIn",
          icon: <FaLinkedin />,
        },
        {
          href: "https://twitter.com/leadhive",
          text: "Twitter",
          icon: <FaTwitter />,
        },
      ],
    },
  ],
  email: {
    name: "LeadHive",
    description: "Your Gateway to Quality Leads",
    sender: {
      marketing: "Christer from LeadHive <christer@leadhive.no>",
      system: "LeadHive <system@leadhive.no>",
    },
    support: "support@leadhive.no",
    unsubscribe: "https://leadhive.no/unsubscribe",
    location: "Oslo, Norway",
    subjects: {
      welcome: "Welcome to LeadHive 👋",
      newLead: "New Lead Alert! 🎯",
      leadUpdate: "Lead Status Update 📊",
      accountVerification: "Verify Your LeadHive Account ✅",
      passwordReset: "Reset Your LeadHive Password 🔑",
      paymentSuccess: "Payment Successful 💳",
      paymentFailed: "Payment Failed ❌",
      weeklyReport: "Your Weekly Lead Report 📈",
      providerSetup: "Complete Your LeadHive Provider Setup",
    },
    footer: {
      marketing: {
        text: "This email was intended for {email}. If you were not expecting this email, you can ignore it.",
      },
      system: {
        text: "This email was intended for {email}. If you were not expecting this email, you can ignore it. If you are concerned about your account's safety, please contact support@leadhive.tech.",
      },
    },
  },
};

export type SiteConfig = typeof siteConfig;
