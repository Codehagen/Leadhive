import { nanoid } from "@/lib/utils";
import { ReactElement, JSXElementConstructor } from "react";
import { Resend } from "resend";
import { siteConfig } from "@/lib/config";

type EmailSubject = keyof typeof siteConfig.email.subjects;

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const sendEmail = async ({
  email,
  subject,
  react,
  marketing,
  test,
}: {
  email: string;
  subject: EmailSubject;
  react: ReactElement<any, string | JSXElementConstructor<any>>;
  marketing?: boolean;
  test?: boolean;
}) => {
  console.log("🔧 Email configuration:", {
    hasResendKey: !!resend,
    to: test ? "delivered@resend.dev" : email,
    subject: siteConfig.email.subjects[subject],
    from: marketing
      ? siteConfig.email.sender.marketing
      : siteConfig.email.sender.system,
  });

  if (!resend) {
    console.error(
      "❌ Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work."
    );
    return Promise.resolve();
  }

  try {
    const result = await resend.emails.send({
      from: marketing
        ? siteConfig.email.sender.marketing
        : siteConfig.email.sender.system,
      to: test ? "delivered@resend.dev" : email,
      subject: siteConfig.email.subjects[subject],
      react,
      headers: {
        "X-Entity-Ref-ID": nanoid(),
      },
    });
    console.log("✅ Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw error;
  }
};
