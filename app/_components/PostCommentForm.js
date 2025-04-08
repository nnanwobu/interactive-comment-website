"use client";

import { useFormStatus } from "react-dom";
import { postComment } from "../serverActions/actions";

import SubmitButton from "./SubmitButton";
import { useState } from "react";

export default function PostCommentForm({ user }) {
  const [isEmpty, setIsEmpty] = useState("");

  return (
    <form
      className="flex gap-4 w-full bg-white rounded-md mt-4 p-8 mobile:gap-2 mobile:p-2"
      action={postComment}
    >
      <img
        src={user.image}
        alt="user photo"
        className="rounded-full w-[40px] h-[40px] mobile:w-[20px] mobile:h-[20px]"
      />
      <textarea
        className="h-auto w-5/6 text-black px-4 py-1 "
        autoFocus={true}
        name="content"
        placeholder="Add comment..."
        onChange={(e) => setIsEmpty(e.target.value)}
      ></textarea>

      <SubmitButton text="Send" isEmpty={isEmpty} />
    </form>
  );
}

// function Button({ isEmpty }) {
//   const { pending } = useFormStatus();
//   return (
//     <button
//       disabled={pending}
//       hidden={isEmpty.length <= 0}
//       className="bg-primary-moderate-blue px-2 py-2 w-1/6 rounded-md text-primary-white hover:bg-primary-light-blue h-[40px] items-center mobile:text-xs"
//     >
//       {pending ? "sending" : "send"}
//     </button>
//   );
// }
