import { mainFont } from "@/lib/fonts";
import { WrapperProps } from "@/types";
import "@/styles/globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import QueryProvider from "@/components/layout/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import LoadingOverlay from "@/components/LoadingOverlay";

export { metadata } from "./metadata";

const RootLayout = ({ children }: WrapperProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${mainFont.className} antialiased`}
      >
        <QueryProvider>
          <NuqsAdapter>
            <ThemeProvider
              attribute="class"
              enableSystem
            >
              {children}
              <Toaster />
              <LoadingOverlay />
            </ThemeProvider>
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
