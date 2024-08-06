import { auth } from "../_lib/auth";
export const metadata = {
  title: "account",
};
export default async function Page() {
  const { user } = await auth();

  return (
    <div>
      <h1 className="flex gap-4 font-semibold text-2xl mb-7 text-accent-400">
        <span>Welcome </span>
        <span>{user?.name.split(" ")[0]}</span>
      </h1>
    </div>
  );
}
