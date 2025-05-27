export type SendOtpMailProps = {
  email: string;
  name: string;
  otp: number;
};

export type SendPasswordResetLinkProps = {
  email: string;
  name: string;
  resetLink: string;
};

export type EmailType = "verification" | "password-reset";

export default interface IMailService {
  sendOtpMail(payload: SendOtpMailProps): Promise<void>;
  sendPasswordResetLink(payload: SendPasswordResetLinkProps): Promise<void>;
}
