import { Hr, Tailwind, Text } from "@react-email/components";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/lib/config";

interface EmailFooterProps {
  email: string;
  marketing?: boolean;
}

export default function EmailFooter({
  email,
  marketing = true,
}: EmailFooterProps) {
  const footerText = marketing
    ? siteConfig.email.footer.marketing.text
    : siteConfig.email.footer.system.text;

  return (
    <Tailwind>
      <div className="mx-auto my-0 flex justify-center">
        <Icons.logo className="h-8 w-8 text-primary" />
      </div>
      <Text className="my-[8px] text-center text-[16px] font-semibold leading-[24px] text-gray-900">
        {siteConfig.email.name}
      </Text>
      <Text className="mb-4 mt-[4px] text-center text-[14px] leading-[24px] text-gray-500">
        {siteConfig.email.description}
      </Text>
      <Hr className="mx-0 my-6 w-full border border-gray-200" />
      <Text className="text-[12px] leading-6 text-gray-500">
        {footerText.replace("{email}", email)}
      </Text>
    </Tailwind>
  );
}
