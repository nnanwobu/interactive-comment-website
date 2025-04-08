"use client";
import CommentCard from "./CommentCard";

export default function CommentBox({ comment, user, userEmail }) {
  return (
    <div>
      <CommentCard
        comment={comment}
        user={user?.user}
        userEmail={userEmail}
        id={comment._id}
        mode="comment"
      />

      <div>
        {comment?.replies.map((r, i) => {
          return (
            <CommentCard
              key={i}
              comment={r}
              id={r._id}
              classN=" ml-16  mobile:ml-5 "
              user={user?.user}
              userEmail={userEmail}
              mode="reply"
            />
          );
        })}
      </div>
    </div>
  );
}
