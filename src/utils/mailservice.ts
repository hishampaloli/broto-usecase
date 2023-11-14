import Mailgen from "mailgen";
import { SMTP_EMAIL, SMTP_PASS } from "./env";

export const mailConfig = {
  service: "gmail",
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASS,
  },
};

export const MailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "broto-usecase",
    link: "https://www.linkedin.com/in/hisham-paloli-141090231/",
  },
});

export function getAccoundCreatedMailTemplate(email: string, password: string) {
  return {
    body: {
      name: "CUSTOMER",
      intro: "Your accound was created",
      table: {
        data: [
          {
            Info: `Please login to this account ${email} with this password:- ${password}`,
          },
        ],
      },
    },
    outro: "Thank you for your trust",
  };
}

export const getMessage = ({
  userEmail,
  subject,
  mail,
}: {
  userEmail: string;
  subject: string;
  mail: any;
}) => {
  let message = {
    from: SMTP_EMAIL,
    to: userEmail,
    subject: subject,
    html: mail,
  };
  return message;
};
