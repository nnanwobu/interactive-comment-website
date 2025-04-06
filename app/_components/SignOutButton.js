"use client";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";

import { signOutAction } from "../serverActions/actions";

function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button>
        <span>logout</span>
      </button>
    </form>
  );
}

export default SignOutButton;
