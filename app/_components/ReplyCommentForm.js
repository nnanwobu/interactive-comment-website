"use client";

import { replycomment } from "../serverActions/actions";
import { useReplyTo } from "../_lib/hooks/useReplyTo";
import SubmitButton from "./SubmitButton";
import { useState } from "react";

export default function ReplyCommentForm({ user, comment }) {
  const { replyTo, setCurOpen, setReplyTo } = useReplyTo();
  const [isEmpty, setIsEmpty] = useState(`@${replyTo} `);

  function handleReplyComment(data) {
    const result = replycomment(data);
    setCurOpen(null);
  }
  return (
    <div className="bg-white ml-16 relative mobile:ml-5">
      <button
        className="text-red-500 absolute top-1 right-6 px-1 py-0 text-xl"
        onClick={(e) => {
          e.preventDefault();
          setCurOpen(null);
        }}
      >
        X
      </button>
      <form
        className="flex gap-4 bg-white rounded-md mt-4 p-8 mb-2 mobile:px-2 mobil:gap-2 items-center"
        action={handleReplyComment}
      >
        <img
          src={user?.image}
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
