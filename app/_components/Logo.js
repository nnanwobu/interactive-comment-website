import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.png";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image
        src={logo}
        alt="the wild oasis"
        quality={100}
        width={60}
        height={60}
      />
    </Link>
  );
}

export default Logo;
