import "@/app/_styles/globals.css";
import Header from "@/app/_components/Header";
import { Rubik } from "next/font/google";
import { RangeProvider } from "./context/range";
import { Toaster } from "react-hot-toast";
import { ReplyToProvider } from "./_lib/hooks/useReplyTo";
export const metadata = {
  title: {
    template: "%s / The Interactive comment section",
    default: "welcome/The interactive comment section",
  },
  description: "A real time interactive comment section. ",
};

const Josefin = Rubik({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${Josefin.className} bg-primary-light-gray text-primary-dark-blue flex flex-col min-h-screen antialiased relative text-sm`}
      >
        <ReplyToProvider>
          <Toaster position="bottom-right" />
          <Header />
          <div className="flex-1 px-8 pt-0 pb-8">
            <main className="max-w-6xl mx-auto">
              <RangeProvider>{children}</RangeProvider>
            </main>
          </div>
        </ReplyToProvider>
      </body>
    </html>
  );
}
