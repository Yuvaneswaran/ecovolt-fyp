import CircuitBackground from "../components/CircuitBackground";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import { ToastProvider } from "../contexts/ToastContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500"] });

// Michroma and Bebas Neue are loaded via Google Fonts <link> in <head> below,
// since they are not bundled with next/font/google in every Next.js version.
// If you prefer next/font, swap this for next/font/google imports.

export const metadata = {
  title: "EcoVolt | Smart Energy Saving System",
  description: "Cut the Waste, Keep the Watts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Michroma&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-bg min-h-screen">
	<CircuitBackground opacity={0.35} fixed />
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
