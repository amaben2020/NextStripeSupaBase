export class NnoxxError extends Error {
  constructor(public readonly message: string, public readonly httpCode?: number) {
    super(message);
    this.httpCode = httpCode || 500;
  }
}


// creating class
import nodemailer, { SendMailOptions, Transporter } from "nodemailer";
import { NnoxxError } from "@/base/api/errors/nnoxx-error";
import { IMailService } from "./types";

export class MailService implements IMailService {
  mailer: Transporter;
  constructor() {
    this.mailer = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER,
        pass: process.env.SENDER_PASSWORD,
      },
    });
  }

  async createMail(mailData: SendMailOptions) {
    try {
      await this.mailer.sendMail({
        from: process.env.SENDER,
        to: process.env.RECIPIENT,
        ...mailData
      });
    } catch (error) {
      throw new NnoxxError(`[EmailService] ${error.message}`)
    }
  }
}
