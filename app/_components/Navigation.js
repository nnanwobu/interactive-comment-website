import Link from "next/link";
import { auth } from "../_lib/auth";
import Image from "next/image";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";
export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-sm">
      <ul className="flex gap-16 items-center">
        <li className="flex gap-2 items-center">
          {session?.user?.image && (
            <img
              src={session.user.image}
              className="rounded-full h-8 "
              alt={session.user.name.split(" ")[0]}
              referrerPolicy="no-referrer"
            />
          )}
          <div>
            {session?.user ? (
              <SignOutButton />
            ) : (
              <dv>
                <Link href={"/api/auth/signin"}>sign In</Link>
              </dv>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
