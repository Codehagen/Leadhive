import { Icons } from "@/components/icons";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export const BLUR_FADE_DELAY = 0.15;

export const siteConfig = {
  name: "Leadhive",
  description:
    "Connect with trusted indrustry experts. World leading platform for service matching. Your gateway to quality leads.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: [
    "home selling service",
    "landscaping services",
    "find landscaping professionals",
    "find construction professionals",
    "find electrical professionals",
    "find loan professionals",
    "find healthcare professionals",
    "find insurance professionals",
    "find legal professionals",
    "find financial professionals",
    "find insurance professionals",
    "find legal professionals",
    "find financial professionals",
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
          title: "Find Your Expert",
          description:
            "Get matched with verified industry professionals instantly.",
          href: "/industries",
        },
        items: [
          {
            href: "/",
            title: "Expert Matching",
            description:
              "Get matched with pre-screened professionals in your industry.",
          },
          // {
          //   href: "/industries/compare",
          //   title: "Compare Experts",
          //   description:
          //     "Compare proposals and credentials from multiple experts.",
          // },
          {
            href: "/industries/insights",
            title: "Industry Insights",
            description: "Access detailed market analysis and industry trends.",
          },
        ],
      },
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "Real Estate",
            href: "/au/real-estate",
            description: "Connect with top local real estate agents",
          },
          {
            title: "Landscaping",
            href: "/au/landscaping",
            description: "Find professional landscapers and gardeners",
          },
          {
            title: "Construction",
            href: "/au/construction",
            description: "Connect with licensed builders and contractors",
          },
          {
            title: "Healthcare",
            href: "/au/healthcare",
            description: "Find healthcare providers and specialists",
          },
          {
            title: "Electrical",
            href: "/au/electrical",
            description: "Connect with certified electricians",
          },
          {
            title: "Loans",
            href: "/au/loans",
            description: "Find mortgage brokers and lenders",
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
      label: "Blog",
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
              href: "/au/real-estate/",
              title: "Property Selling",
              description: "Expert guidance for selling your property.",
            },
            {
              href: "/au/real-estate/",
              title: "Property Buying",
              description: "Find the perfect property with expert agents.",
            },
            {
              href: "/au/real-estate/",
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
              href: "/au/real-estate/",
              description: "Stay informed with local market insights.",
            },
            {
              title: "Property Guides",
              href: "/au/real-estate/",
              description: "Expert guides for property transactions.",
            },
            {
              title: "Agent Directory",
              href: "/au/real-estate/",
              description: "Browse our network of verified agents.",
            },
          ],
        },
      },
      {
        href: "/au/real-estate/",
        label: "About",
      },
      {
        href: "/contact",
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
              href: "/au/landscaping/",
              title: "Residential",
              description: "Transform your home's outdoor space.",
            },
            {
              href: "/au/landscaping/",
              title: "Commercial",
              description: "Professional landscaping for businesses.",
            },
            {
              href: "/au/landscaping/e",
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
              href: "/au/landscaping/d",
              description: "Inspiration for your outdoor space.",
            },
            {
              title: "Contractor Guides",
              href: "/au/landscaping/",
              description: "How to choose the right contractor.",
            },
            {
              title: "Project Gallery",
              href: "/au/landscaping/",
              description: "View completed landscaping projects.",
            },
          ],
        },
      },
      {
        href: "/au/landscaping/",
        label: "About",
      },
      {
        href: "/contact",
        label: "Contact",
      },
    ],
  },
  pricing: [
    {
      name: "BASIC",
      href: "/",
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
      href: "/",
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
      href: "/",
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
        { href: "/", text: "About LeadHive", icon: null },
        {
          href: "/au/real-estate/",
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
        { href: "/", text: "FAQ", icon: null },
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
    support: "support@leadhive.tech",
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
