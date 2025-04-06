import Image from "next/image";
import { signIn } from "../_lib/auth";
import { signInAction, signInActionGithub } from "../serverActions/actions";

function SignInButton() {
  return (
    <>
      <SignInForm provider="google" serveraction={signInAction} />
      <SignInForm provider="github" serveraction={signInActionGithub} />
    </>
  );
}

function SignInForm({ provider, serveraction }) {
  return (
    <form action={serveraction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <Image
          src={`https://authjs.dev/img/providers/${provider}.svg`}
          alt={`${provider} logo`}
          height="24"
          width="24"
        />
        <span>Continue with {`${provider}`}</span>
      </button>
    </form>
  );
}

export default SignInButton;
