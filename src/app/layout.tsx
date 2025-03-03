import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "./ReduxWrapper";
import SessionWrapper from "./SessionWrapper";
import Error from "@/components/Error";

const heebo = Heebo({
  subsets: ['latin'],  
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // All available weights
  display: 'swap', // Ensures better performance
  variable: '--font-heebo',
});



export const metadata: Metadata = {
  title: "My Account | Premier Properties",
  description: "Premier Properties",
};

export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${heebo.className} ${heebo.variable} antialiased`}>
        <ReduxWrapper>
          <SessionWrapper >
          <Error /> 
            {children}
          </SessionWrapper>
        </ReduxWrapper>
      </body>
    </html>
  );
}
