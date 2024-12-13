import {
  Body,
  Link,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Icons } from "@/components/icons";
import Footer from "./components/footer";
import { siteConfig } from "@/lib/config";

export default function WelcomeEmail({
  name = "Christer",
  email = "christer@leadhive.no",
}: {
  name: string | null;
  email: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to {siteConfig.name}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Section className="mt-8">
              <div className="mx-auto my-0 flex justify-center">
                <Icons.logo className="h-10 w-10 text-primary" />
              </div>
            </Section>
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Welcome to {siteConfig.name}
            </Heading>
            <Section className="my-8"></Section>
            <Text className="text-sm leading-6 text-black">
              Thanks for signing up{name && `, ${name}`}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              My name is Christer, and I'm the founder of {siteConfig.name} -
              the best way to get your leads for the mordern business. I'm
              excited to have you on board!
            </Text>
            <Text className="text-sm leading-6 text-black">
              Here's what happens next:
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Wait for{" "}
              <Link
                href="https://app.dub.co/links"
                className="font-medium text-blue-600 no-underline"
              >
                a new lead
              </Link>
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Get an{" "}
              <Link
                href="https://app.dub.co"
                className="font-medium text-blue-600 no-underline"
              >
                email
              </Link>{" "}
              when a lead matches your services
            </Text>
            <Text className="ml-1 text-sm leading-4 text-black">
              ◆ Connect with{" "}
              <Link
                href="https://twitter.com/dubdotco"
                className="font-medium text-blue-600 no-underline"
              >
                lead
              </Link>{" "}
              and grow your business
            </Text>
            <Text className="text-sm leading-6 text-black">
              If you have any questions or need assistance, our support team is
              here to help!
            </Text>
            <Text className="text-sm font-light leading-6 text-gray-400">
              Christer from {siteConfig.name}
            </Text>

            <Footer email={email} marketing />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
