import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import { Coming_Soon, Josefin_Sans } from "next/font/google";
import { RangeProvider } from "./context/range";
export const metadata = {
  title: {
    template: "%s / The wild oasis",
    default: "welcome/The wild Oasis",
  },
  description:
    "Luxious cabin hotel , located in the heart of Nigerian Dolomites, surrounded by beautiful mountains and dark forest",
};

const Josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Josefin.className} bg-primary-900 text-primary-100 flex flex-col min-h-screen antialiased relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12">
          <main className="max-w-6xl mx-auto">
            <RangeProvider>{children}</RangeProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
