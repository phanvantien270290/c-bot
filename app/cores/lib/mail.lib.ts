/**
 * @owner BlueSky
 * @description Define Mail Handler library <https://nodemailer.com>
 * @since 1.0.0
 * @date Jan 19, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { createTransport, Transporter } from 'nodemailer';
import Mail, { Attachment } from 'nodemailer/lib/mailer';
import { CustomResponse } from '../../interfaces/custom-response.interface';

export default class Mailer {
    private transporter: Transporter;
    // private replyTo: string = 'cBot<cbot-reply-to@ccintegration.com>';
    private from: string = 'cBot<C.B.O.T-DONOT-REPLY@ccintegration.com>';
    private to: Array<string> = [];
    private bcc: Array<string> = [process.env.APP_EMAIL];
    private subject: string;
    private text: string;
    private html: string;
    private attachments: Array<Attachment> = [];
    constructor() {
        this.createTransport();
    }

    async send() {
        this.validate();

        const message: Mail.Options = {
            from: this.from,
            // replyTo: this.replyTo,
            bcc: this.bcc,
            to: this.to,
            subject: this.subject,
            text: this.text,
            html: this.html,
            attachments: this.attachments
        };

        let res: CustomResponse = {
            status: true
        }
        try {
            res.data = await this.transporter.sendMail(message);
        } catch (error) {
            res.status = false;
            res.msg = error?.message;
        }
        return res;
    }

    setFrom(from: string) {
        this.from = from;
        return this;
    }

    setTo(to: string | Array<string>) {
        this.to = (typeof (to) === 'string') ? [to] : to;
        return this;
    }

    addTo(to: string) {
        this.to.push(to);
        return this;
    }

    setBcc(bcc: string | Array<string>) {
        this.bcc = (typeof (bcc) === 'string') ? [bcc] : bcc;
        return this;
    }

    setSubject(subject: string) {
        this.subject = subject;
        return this;
    }

    setContent(content: string, type: string = "text" || "html") {
        type === 'html' ? this.html = content : this.text = content;
        return this;
    }

    addAttachment(pathFile: string, fileName: string) {
        const attachment: Attachment = {
            filename: fileName,
            path: pathFile
        };
        this.attachments.push(attachment);
        return this;
    }

    createTransport() {
        this.transporter = createTransport({
            host: process.env.MAILER_HOST || "smtp.mailtrap.io",
            port: Number(process.env.MAILER_PORT) || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.MAILER_USER,
                pass: process.env.MAILER_PWD
            },
        }, { ignoreTLS: false });
    }

    closeTransport() {
        this.transporter.close();
    }

    private validate() {
        if (!this.to || !this.transporter || !this.to.length) {
            throw new Error("The email setting is poor");
        }
    }
}