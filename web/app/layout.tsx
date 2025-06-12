import { mainFont } from "@/lib/fonts";
import { WrapperProps } from "@/types";
import "@/styles/globals.css";
import QueryProvider from "@/components/layout/QueryProvider";
import { Toaster } from "@/components/ui/sonner";
import LoadingOverlay from "@/components/LoadingOverlay";
import Navbar from "@/components/layout/Navbar";

export { metadata } from "./metadata";

const RootLayout = ({ children }: WrapperProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mainFont.className} antialiased `}>
        <QueryProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster />
          <LoadingOverlay />
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
