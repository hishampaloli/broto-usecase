import nodemailer from "nodemailer";
import { mailConfig, MailGenerator, getMessage } from "../../utils/mailservice";


export const sendMailUseCase = () => {
    const execute = async ({
      response,
      userEmail,
      subject,
    }: {
      response: any;
      userEmail: string;
      subject: string;
    }) => {
      const transporter = nodemailer.createTransport(mailConfig);
      let mail = MailGenerator.generate(response);
      let message = getMessage({ userEmail, subject, mail });
      transporter
        .sendMail(message)
        .then((info) => {
            console.log(info);
            
          return info;
        })
        .catch((err) => {
            console.log(err);
            
          return err;
        });
    };
    return {
      execute,
    };
  };