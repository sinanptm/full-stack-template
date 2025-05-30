import IMailService, {
  SendOtpMailProps,
  SendPasswordResetLinkProps,
} from "@/domain/interfaces/services/IMailService";
import nodemailer from "nodemailer";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { COMPANY_NAME, NODEMAILER_PASSKEY, SENDER_EMAIL } from "@/config";

const readFileAsync = promisify(fs.readFile);

export default class MailService implements IMailService {
  private async loadTemplate(filePath: string): Promise<string> {
    const fullPath = path.resolve(__dirname, filePath);
    return readFileAsync(fullPath, "utf-8");
  }

  private async send(to: string, subject: string, html: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SENDER_EMAIL,
        pass: NODEMAILER_PASSKEY,
      },
    });

    await transporter.sendMail({
      from: SENDER_EMAIL,
      to,
      subject,
      html,
    });
  }

  async sendOtpMail({ email, name, otp }: SendOtpMailProps): Promise<void> {
    const subject = "Account Verification";

    let html = await this.loadTemplate("../../../public/otpEmailTemplate.html");

    html = html
      .replace(/{{name}}/g, name)
      .replace(/{{otp}}/g, otp.toString())
      .replace(/{{CompanyName}}/g, COMPANY_NAME)
      .replace(/{{CompanyDomain}}/g, COMPANY_NAME)
      .replace(/{{type}}/g, subject)
      .replace(/{{subject}}/g, subject);

    await this.send(email, subject, html);
  }

  async sendPasswordResetLink({ email, name, resetLink }: SendPasswordResetLinkProps): Promise<void> {
    const subject = "Password Reset";

    let html = await this.loadTemplate("../../../public/passwordResetLinkTemplate.html");

    html = html
      .replace(/{{name}}/g, name)
      .replace(/{{resetLink}}/g, resetLink)
      .replace(/{{CompanyName}}/g, COMPANY_NAME)
      .replace(/{{CompanyDomain}}/g, COMPANY_NAME)
      .replace(/{{subject}}/g, subject);

    await this.send(email, subject, html);
  }
}
