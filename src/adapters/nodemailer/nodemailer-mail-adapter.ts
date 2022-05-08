import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

// Conta criada em mailtrap.io (com GITHUB) para testar envio de emails
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4f57c527dfbaa4",
    pass: "244e0b30e52e75",
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <io@feedget.com>',
      to: 'João Victor <umvelhobarbudo@gmail.com>',
      subject,
      html: body,
    });
  }
}