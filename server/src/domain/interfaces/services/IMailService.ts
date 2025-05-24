export type SendOtpMailProps = {
  email: string;
  name: string;
  otp: number;
  type: EmailType;
};

export type EmailType = "verification" | "password-reset";

export default interface IMailService {
  sendOtpMail(payload: SendOtpMailProps): Promise<void>;
}
