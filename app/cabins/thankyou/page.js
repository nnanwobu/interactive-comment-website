import { auth } from "@/app/_lib/auth";
import Link from "next/link";

export default async function Page() {
  const session = await auth();
  return (
    <div className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        Thank you for your reservation!
      </h1>
      <p>
        An invoice has been sent to your email{" "}
        <span className="text-primary-500">{session.user.email}</span>{" "}
      </p>
      <Link
        href="/account/reservations"
        className="underline text-xl text-accent-500 inline-block"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
