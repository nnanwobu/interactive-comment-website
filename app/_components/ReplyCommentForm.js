"use client";

import { useFormStatus } from "react-dom";
import { replycomment } from "../serverActions/actions";
import { useReplyTo } from "../_lib/hooks/useReplyTo";
import SubmitButton from "./SubmitButton";
import { useState } from "react";

export default function ReplyCommentForm({ user, comment, setIsOpen }) {
  const { replyTo, setReplyTo } = useReplyTo();
  const [isEmpty, setIsEmpty] = useState(`@${replyTo} `);
  return (
    <div className="bg-white ml-16 relative mobile:ml-5">
      <button
        className="text-red-500 absolute top-1 right-6 px-1 py-0 text-xl"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(false);
        }}
      >
        X
      </button>
      <form
        className="flex gap-4 bg-white rounded-md mt-4 p-8 mb-2 mobile:px-2 mobil:gap-2 items-center"
        action={replycomment}
      >
        <img
          src={user.image}
          alt="user photo"
          className="rounded-full w-[40px] h-[40px] mobile:w-[20px] mobile:h-[20px]"
        />
        <textarea
          className=" w-5/6 text-black px-4 py-1 max-h-[100%] text-inherit border outline-primary-light-blue"
          autoFocus={true}
          name="content"
          defaultValue={isEmpty}
          onFocus={(e) => {
            e.target.value = "";
            e.target.value = isEmpty;
          }}
          onChange={(e) => setIsEmpty(e.target.value)}
        ></textarea>
        <input type="text" name="commentID" value={comment._id} hidden />

        <SubmitButton text="Reply" isEmpty={isEmpty} />
      </form>
    </div>
  );
}

// function Button() {
//   const { pending } = useFormStatus();
//   return <button disabled={pending}>{pending ? "replying" : "reply"}</button>;
// }
