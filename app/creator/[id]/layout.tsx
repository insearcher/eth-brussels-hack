import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import {
  EthersExtension,
  DynamicContextProvider,
  EthereumWalletConnectors,
} from "../../../lib/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <DynamicContextProvider
        settings={{
          environmentId: "fc99babc-e727-4639-9cb4-1e2260b207bc",
          walletConnectors: [EthereumWalletConnectors],
          walletConnectorExtensions: [EthersExtension],
        }}
      >
        <body className={inter.className}>{children}</body>
      </DynamicContextProvider>
    </html>
  );
}
