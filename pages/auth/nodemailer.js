//   nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.SENDER,
//     pass: process.env.SENDER_PASSWORD,
//   },
// });

import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
const nodemailerSendgrid = require('nodemailer-sendgrid');

import { NnoxxError } from '@/base/api/errors/nnoxx-error';
import { IMailService } from './types';
import { ValidationService } from '@/base/api/services/validation-service';
import { contactEmailValidationSchema } from '@/base/common/validation';
export class MailService extends ValidationService implements IMailService {
  mailer: Transporter;

  constructor() {
    super();

    this.mailer = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey: process.env.SENDGRID_API_KEY,
      })
    );
  }

  async createMail(command: SendMailOptions) {
    this.validate(contactEmailValidationSchema, command);

    try {
      await this.mailer.sendMail({
        from: process.env.SENDER,
        to: process.env.RECIPIENT,
        ...command,
      });
    } catch (error) {
      throw new NnoxxError(`[EmailService] ${error.message}`);
    }
  }
}

// this.mailer =

//   nodemailer.createTransport({
//   host: 'smtp.sendgrid.net',
//   port: 587,
//   auth: {
//     user: process.env.SENDGRID_API_KEY,
//     pass: process.env.SENDGRID_KEY
//   }
// })
