import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReduxProvider from "./store-provider";
import Navbar from "@/component/common/navbar";
import Footer from "@/component/common/footer";
import ArrowTop from "@/component/common/arrow-top";
import ErrorBoundary from "@/component/common/errorBoundary";
import ModalContainer from "@/component/common/modal-container";
import ToastContainer from "@/component/common/toast-container/index";
import DrawerContainer from "@/component/common/drawer-container/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RailStay",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ReduxProvider>
          <ErrorBoundary>
            <Navbar />
            {children}
            <ArrowTop />
            <Footer />
            <DrawerContainer />
            <ModalContainer />
            <ToastContainer time={2000} />
          </ErrorBoundary>
        </ReduxProvider>
      </body>
    </html>
  );
}
