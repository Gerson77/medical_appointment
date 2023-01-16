import { IMailProvider, MailDTO } from "../mail.provider";
import nodemailer, { Transporter } from 'nodemailer'

export class EtherealMailProvider implements IMailProvider {
    private client!: Transporter

    constructor() {
        nodemailer.createTestAccount()
            .then(() => {
                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email',
                    port: 587,
                    auth: {
                        user: 'haley.erdman@ethereal.email',
                        pass: 'KbtYcnwP74B2XAaA4y'
                    }
                });
                this.client = transporter
            }).catch(err => {
                console.log(err)
            })
    }
    async sendMail(data: MailDTO): Promise<void> {
        const resultMail = await this.client.sendMail({
            to: data.to,
            from: data.from,
            subject: data.subject,
            text: data.text,
            html: data.html,
        })

        console.log('Message sent: %s', resultMail.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(resultMail))
    }
}