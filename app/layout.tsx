import { mainFont } from "@/lib/fonts";
import { WrapperProps } from "@/types";
import "@/styles/globals.css";

export { metadata } from "./metadata";

const RootLayout = ({ children }: WrapperProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mainFont.className} antialiased `}>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;