import Image from "next/image";
import Link from "next/link";
import { getComments } from "./_lib/data-service";
import { auth } from "./_lib/auth";
import PostCommentForm from "./_components/PostCommentForm";
import CommentBox from "./_components/CommentBox";
import { Suspense } from "react";
import Spinner from "./_components/Spinner";

export default async function Page() {
  const comments = await getComments();
  const user = await auth();
  const userEmail = user?.user?.email;
  return (
    <main className="mt-16 ">
      <ul className=" w-2/3 mx-auto h-auto mobile:w-full">
        {comments?.map((com, i) => (
          <Suspense fallback={<Spinner />} key={i}>
            <CommentBox
              key={i}
              comment={com}
              user={user}
              userEmail={userEmail}
            />
          </Suspense>
        ))}
        {user ? (
          <PostCommentForm user={user?.user} />
        ) : (
          <p className="text-primary-dark-blue text-xl text-center">
            <span>Please</span>{" "}
            <span className="text-primary-moderate-blue font-bold">
              <Link href="/api/auth/signin"> sign-in</Link>
            </span>
            <span> to comment...☺</span>
          </p>
        )}
      </ul>
    </main>
  );
}
