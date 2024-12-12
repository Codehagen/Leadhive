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
  if (!resend) {
    console.log(
      "Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work."
    );
    return Promise.resolve();
  }

  return resend.emails.send({
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
};
