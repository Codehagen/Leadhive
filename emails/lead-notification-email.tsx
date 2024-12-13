import {
  Body,
  Link,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Icons } from "@/components/icons";
import EmailFooter from "./components/email-footer";
import { siteConfig } from "@/lib/config";

interface LeadNotificationEmailProps {
  recipientName?: string | null;
  leadInfo?: {
    name: string;
    address: string;
    postalCode: string;
    phoneNumber: string;
  };
  email: string;
}

export default function LeadNotificationEmail({
  recipientName = "there",
  leadInfo = {
    name: "John Doe",
    address: "123 Main Street",
    postalCode: "12345",
    phoneNumber: "+1 (555) 123-4567",
  },
  email = "user@leadhive.no",
}: LeadNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New Lead Alert - {siteConfig.name}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <div className="mx-auto my-0 flex justify-center">
                <Icons.logo className="h-10 w-10 text-primary" />
              </div>
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              New Lead Alert! 🎯
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Hi{" "}
              {recipientName && recipientName !== "there"
                ? `, ${recipientName}`
                : "there"}
              !
            </Text>
            <Text className="text-sm leading-6 text-black">
              Great news! A new lead has been matched to your services. Here are
              the details:
            </Text>

            <Section className="my-4 rounded-lg bg-blue-50 p-4">
              <Text className="mb-2 text-sm font-semibold text-black">
                Lead Details:
              </Text>
              <Text className="ml-1 text-sm leading-6 text-gray-700">
                Name: {leadInfo.name}
              </Text>
              <Text className="ml-1 text-sm leading-6 text-gray-700">
                Address: {leadInfo.address}
              </Text>
              <Text className="ml-1 text-sm leading-6 text-gray-700">
                Postal Code: {leadInfo.postalCode}
              </Text>
              <Text className="ml-1 text-sm leading-6 text-gray-700">
                Phone: {leadInfo.phoneNumber}
              </Text>
            </Section>

            <Section className="my-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
              <Text className="text-sm font-medium leading-6 text-amber-800">
                ⚡ Speed matters! The faster you respond, the higher your
                chances of converting this lead. Aim to reach out within 24
                hours for the best results.
              </Text>
            </Section>

            <Text className="mt-4 text-sm leading-6 text-gray-600">
              Pro tip: Review details carefully and prepare a personalized
              approach before reaching out.
            </Text>

            <Text className="mt-4 text-sm leading-6 text-gray-600">
              Need help? Our support team is always here to assist you!
            </Text>

            <Text className="text-sm font-light leading-6 text-gray-400">
              Christer from {siteConfig.name}
            </Text>

            <EmailFooter email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
