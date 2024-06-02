import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

export type EmailOptions = {
  to: string
  subject: string
  text: string
  html: string
}

export class Utils {
  static async sendEmail(options: EmailOptions) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    })
    const mailOptions = {
      from: `"CrudFlix" <${process.env.MAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    }
    await transporter.sendMail(mailOptions)
  }
}
