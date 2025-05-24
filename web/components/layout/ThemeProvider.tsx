"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes";
import { memo } from "react";

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default memo(ThemeProvider);