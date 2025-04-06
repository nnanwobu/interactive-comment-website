"use client";
import { useState } from "react";
import CommentCard from "./CommentCard";
import ReplyCommentForm from "./ReplyCommentForm";
import { useReplyTo } from "../_lib/hooks/useReplyTo";

export default function CommentBox({ comment, user, userEmail }) {
  const [isOpen, setIsOpen] = useState(false);
  const { setReplyTo } = useReplyTo();

  return (
    <div>
      <CommentCard
        comment={comment}
        user={user?.user}
        userEmail={userEmail}
        classN=" mb-4 p-6 mobile:mb-2 bg-primary-white text-primary-dark-blue rounded-sm relative auto mobile:px-6 mobile:pb-16 mobile:pt-6 h-auto"
        onclick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        mode="comment"
      />

      <div>
        {comment?.replies.map((r, index) => {
          return (
            <CommentCard
              key={index}
              comment={r}
              index={index}
              classN=" mb-4 p-6 mobile:px-6 mobile:pb-16 mobile:pt-6 bg-primary-white text-primary-dark-blue ml-16 rounded-sm relative h-auto mobile:ml-5 mobile:mb-2 h-auto"
              onclick={(e) => {
                e.preventDefault();
                setIsOpen(!isOpen);
                setReplyTo(r.user[0].name);
              }}
              userEmail={userEmail}
              mode="reply"
            />
          );
        })}
        {isOpen && (
          <ReplyCommentForm
            user={user?.user}
            comment={comment}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </div>
  );
}
