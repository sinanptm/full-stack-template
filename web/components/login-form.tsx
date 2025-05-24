import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormData, LoginFormProps } from "@/types";
import { Loader2 } from "lucide-react";
import { loginFormSchema } from "@/types/schema";

export function LoginForm({
  className,
  onSubmit,
  onForgotPassword,
  onSignUp,
  onGoogleLogin,
  isLoading = false,
  showGoogleLogin = true,
  showForgotPassword = true,
  showSignUpLink = true,
  title = "Login to your account",
  description = "Enter your email below to login to your account",
  submitButtonText = "Login",
  googleButtonText = "Login with Google",
  forgotPasswordText = "Forgot your password?",
  signUpText = "Don't have an account? Sign up",
  defaultValues,
  ...props
}: LoginFormProps) {
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      ...defaultValues,
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    try {
      await onSubmit(data);
    } catch (error) {
      // Error handling is done by parent component
      console.error("Login error:", error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="m@example.com"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        {showForgotPassword && onForgotPassword && (
                          <button
                            type="button"
                            onClick={onForgotPassword}
                            className="ml-auto text-sm underline-offset-4 hover:underline text-muted-foreground hover:text-foreground transition-colors"
                            disabled={isLoading}
                          >
                            {forgotPasswordText}
                          </button>
                        )}
                      </div>
                      <FormControl>
                        <Input
                          type="password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {submitButtonText}
                  </Button>

                  {showGoogleLogin && onGoogleLogin && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={onGoogleLogin}
                      disabled={isLoading}
                    >
                      {googleButtonText}
                    </Button>
                  )}
                </div>
              </div>

              {showSignUpLink && onSignUp && (
                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={onSignUp}
                    className="underline underline-offset-4 hover:text-primary transition-colors"
                    disabled={isLoading}
                  >
                    {signUpText}
                  </button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}