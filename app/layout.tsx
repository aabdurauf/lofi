import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./styles/globals.css"
import StoreProvider from "./StoreProvider";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "LoFi",
  description: "LoFi - Listen while coding and studying",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/images/headset.png" type="image/png" />
      </head>
      <body
        className={`${ubuntu.className} antialiased`}
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
