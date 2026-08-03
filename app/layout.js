import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/components/StoreProvider";
import RequestToast from "@/components/RequestToast";
import { BUSINESS } from "@/lib/mockData";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: `${BUSINESS.name} | Home Renovations in ${BUSINESS.serviceArea}`,
  description: `Kitchens, bathrooms, basements, and full renovations across ${BUSINESS.serviceArea}. Licensed, insured, and local.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <StoreProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <RequestToast />
        </StoreProvider>
      </body>
    </html>
  );
}
