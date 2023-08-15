import dotenv from 'dotenv'
import * as nodemailer from 'nodemailer'
import SMTPTransport from 'nodemailer/lib/smtp-transport'

dotenv.config()

class MailService {
  transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: process.env.SMPT_PORT,
      secure: false,
      auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMPT_PASSWORD,
      },
    } as SMTPTransport.Options)
  }

  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: `"Matvii 👻" ${process.env.SMPT_USER}`,
      to,
      subject: 'Verify your email ✔',
      text: '',
      html: `
      <div>
        <h2>Click here to verify your email 
          <a href="http://localhost:3333/api/activate/${link}">link</a>
        </h2>
      </div>`,
    })
  }
}

export default new MailService()
