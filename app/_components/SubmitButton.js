"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({ text, isEmpty }) {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-primary-moderate-blue px-2 py-2 w-1/6 rounded-md text-primary-white hover:bg-primary-light-blue h-[40px] items-center mobile:text-xs transition-all"
      disabled={pending}
      hidden={isEmpty <= 0}
    >
      {pending ? `${text}ing` : `${text}`}
    </button>
  );
}
