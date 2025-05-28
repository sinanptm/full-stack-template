export enum PostRoutes {
  SigninUser = "/auth/signin",
  SignupUser = "/auth/signup",
  ForgotPasswordUser = "/auth/forgot-password",
  ResetPasswordUser = "/auth/reset-password",
  VerifyOtpUser = "/auth/verify-otp",
  ResendOtpUser = "/auth/resend-otp",
  UserRefresh = "/auth/refresh",

  AdminSignin = "/admin/auth",
  AdminRefresh = "/admin/auth/refresh"
}
export enum PostRoutesWithParams {
  test = "/test/:id",
}
