"use client";
import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";
export default function Button() {
  const { pending } = useFormStatus();
  return (
    <button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center justify-center gap-2 text-sm">
          <SpinnerMini />
          <span>updating...</span>
        </div>
      ) : (
        "Update reservation"
      )}
    </button>
  );
}
