import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Stack Authentication Template | Clean Architecture",
  description: "Production-ready full-stack authentication template built with Next.js 15, Express.js 5, MongoDB, and TypeScript. Features clean architecture, complete auth system with email/password, OAuth, OTP verification, and admin panel.",
  keywords: [
    "Next.js",
    "Express.js",
    "MongoDB",
    "TypeScript",
    "Authentication",
    "Clean Architecture",
    "Full-Stack Template",
    "OAuth",
    "JWT",
    "OTP Verification",
    "Admin Panel",
    "React",
    "Node.js",
    "Firebase Auth",
    "Production Ready"
  ],
  authors: [{ name: "Muhammed sinan", url: "https://www.muhammedsinan.space/" }],
  creator: "Muhammed sinan",
  publisher: "Your Company",
  category: "Technology",
  classification: "Web Development Template",
  openGraph: {
    title: "Full-Stack Authentication Template | Clean Architecture",
    description: "Production-ready authentication system with Next.js 15, Express.js 5, and clean architecture principles. Complete with OAuth, OTP verification, and admin management.",
    type: "website",
    locale: "en_US",
    siteName: "Full-Stack Auth Template",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Full-Stack Authentication Template Architecture Overview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Full-Stack Authentication Template | Clean Architecture",
    description: "Production-ready auth system with Next.js 15, Express.js 5, MongoDB & TypeScript. Features clean architecture, OAuth, OTP verification & admin panel.",
    images: ["/og-image.png"],
    creator: "@yourusername"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "application-name": "Full-Stack Auth Template",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Auth Template",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileColor": "#2B5797",
    "msapplication-tap-highlight": "no",
    "theme-color": "#000000",
  },
};