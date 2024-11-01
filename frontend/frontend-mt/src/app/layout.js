import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/navbar";
import "../components/styles.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Marina Tides - Find your perfect yacht",
  description: "marina tides",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundImage: "url(/page_background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100vw",
          margin: 0,
        }}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        {children}
      </body>
    </html>
  );
}
