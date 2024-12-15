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

interface ProviderSetupEmailProps {
  providerName: string;
  recipientName: string;
  setupUrl: string;
  email: string;
}

export default function ProviderSetupEmail({
  providerName,
  recipientName,
  setupUrl,
  email,
}: ProviderSetupEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Complete Your LeadHive Provider Setup</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <div className="mx-auto my-0 flex justify-center">
                <Icons.logo className="h-10 w-10 text-primary" />
              </div>
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Complete Your Payment Setup
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Hi {recipientName},
            </Text>
            <Text className="text-sm leading-6 text-black">
              Your provider account for {providerName} has been created
              successfully! To start receiving leads, you'll need to complete
              your payment setup.
            </Text>

            <Section className="my-4 rounded-lg bg-blue-50 p-4">
              <Text className="mb-2 text-sm font-semibold text-black">
                Next Steps:
              </Text>
              <Text className="ml-1 text-sm leading-6 text-gray-700">
                1. Click the link below to set up your payment method
              </Text>
              <Text className="ml-1 text-sm leading-6 text-gray-700">
                2. Add your credit card details securely through Stripe
              </Text>
              <Text className="ml-1 text-sm leading-6 text-gray-700">
                3. Start receiving qualified leads in your area
              </Text>
            </Section>

            <Section className="my-8 text-center">
              <Link
                href={setupUrl}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm text-white no-underline"
              >
                Complete Payment Setup
              </Link>
            </Section>

            <Section className="my-6 rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
              <Text className="text-sm font-medium leading-6 text-amber-800">
                Note: You'll only be charged when you receive a qualified lead
                ($50 per lead).
              </Text>
            </Section>

            <Text className="mt-4 text-sm leading-6 text-gray-600">
              If you have any questions or need assistance, our support team is
              here to help!
            </Text>

            <Text className="text-sm font-light leading-6 text-gray-400">
              Best regards,
              <br />
              The LeadHive Team
            </Text>

            <EmailFooter email={email} />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
