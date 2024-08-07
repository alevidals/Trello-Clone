import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} dark`}>
				{children}
				<Toaster />
				{/* <div className="min-h-dvh flex flex-col">
          <header className="h-12 flex items-center justify-center border-b">
            Header
          </header>
          <div className="flex flex-col flex-1">{children}</div>
          <footer className="h-12 flex items-center justify-center border-t">
            Footer &copy;
          </footer>
        </div> */}
			</body>
		</html>
	);
}
