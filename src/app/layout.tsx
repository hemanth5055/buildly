import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { WebContainerProvider } from "@/context/WebContainerContext";

const mont = Montserrat({
  variable: "--font-mont",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buildly",
  description: "Created website using ai.",
  icons: {
    icon: "/fav.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <WebContainerProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={`${mont.variable}  antialiased`}>
            <Toaster position="top-right" reverseOrder={false}></Toaster>
            {children}
          </body>
        </html>
      </WebContainerProvider>
    </ClerkProvider>
  );
}
