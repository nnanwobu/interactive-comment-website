"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Modal, Open, Window } from "./Modal";
import ConfirmDelete from "./ConfirmDelete";
import toast from "react-hot-toast";
import { formatDistanceFromNow } from "../_lib/helper";
import TextareaAutosize from "react-textarea-autosize";

import {
  ArrowUturnLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { useReplyTo } from "../_lib/hooks/useReplyTo";
import ReplyCommentForm from "./ReplyCommentForm";

export default function CommentCard({
  comment,
  classN = "",
  userEmail,
  mode,
  user,
  id,
}) {
  const [isTrue, setIsTrue] = useState(false);
  const [isEmpty, setIsEmpty] = useState("");
  const [score, setScore] = useState(comment.score);
  const commentOwner = comment.user.find((c) => c.email === userEmail);
  const { setReplyTo, curOpen, setCurOpen } = useReplyTo();

  const isOpen = id === curOpen;

  function handleEnableText(e) {
    e.preventDefault();

    setIsTrue(!isTrue);
  }
  async function handleUpdateComment(data) {
    const result = await updatecomment(data);
    handleEnableText();

    if (result?.error) toast.error(result?.error);
    else {
      toast.success("Record updated successfully");
    }
  }

  return (
    <Modal>
      <div
        className={`mb-4 p-6 mobile:mb-2 bg-primary-white text-primary-dark-blue rounded-sm relative auto mobile:px-6 mobile:pb-16 mobile:pt-6 h-auto ${classN}`}
      >
        <div className="flex w-full justify-between  mb-3 pl-14 pr-4 mobile:pl-0">
          <div className="flex gap-4 items-center">
            <div className="rounded-full bg-green-300 w-[40px] h-[40px] relative">
              <img
                src={`${comment?.user.map((c) => c.photo)}`}
                alt="user photo"
                className="w-[40px] h-[40px] rounded-full"
              />
            </div>
            <div>
              {comment?.user?.map((u, i) => (
                <div key={i} className="flex gap-1">
                  {" "}
                  <span className="font-bold">{u.name.split(" ")[0]}</span>
                  <span
                    className={
                      commentOwner &&
                      `bg-primary-moderate-blue text-primary-white py-0 px-1`
                    }
                  >
                    {commentOwner ? "you" : ""}
                  </span>
                </div>
              ))}
            </div>
            <div>{formatDistanceFromNow(comment.createdAt)}</div>
          </div>
          {commentOwner ? (
            <div className="flex gap-3 mobile:absolute mobile:bottom-0 mobile:right-0 mobile:m-4">
              <Open opens="delete">
                <button onClick={(e) => e.preventDefault()}>
                  {" "}
                  <div className="flex gap-1 items-center text-primary-soft-red hover:text-primary-pale-red">
                    <TrashIcon className="h-4 w-4" />
                    <span>Delete</span>
                  </div>
                </button>
              </Open>

              {isTrue ? (
                <button onClick={() => setIsTrue(!isTrue)}>cancel</button>
              ) : (
                <button onClick={handleEnableText}>
                  <div className="flex gap-1 items-center text-primary-moderate-blue hover:text-primary-light-blue">
                    <PencilIcon className="h-4 w-4" />
                    <span>Edit</span>
                  </div>
                </button>
              )}
            </div>
          ) : (
            <button
              className="mr-0 text-primary-moderate-blue hover:text-primary-light-blue mobile:absolute mobile:bottom-0 mobile:right-0 mobile:m-4"
              onClick={(e) => {
                setCurOpen(id);
                setReplyTo(comment.user[0].name);
              }}
              disabled={isOpen}
              hidden={!userEmail}
            >
              <div className="flex gap-1 items-center text-primary-moderate-blue hover:text-primary-light-blue">
                <ArrowUturnLeftIcon className="h-4 w-4" />
                <span>Reply</span>
              </div>
            </button>
          )}
        </div>
        <div className="flex gap-2 w-full">
          <div className=" bg-primary-very-light-gray  px-4 py-2 flex flex-col rounded-md -mt-12  mobile:flex-row mobile:absolute mobile:bottom-0 left-0 mobile:m-4 mobile:gap-2">
            <button
              onClick={() => setScore(score + 1)}
              disabled={!commentOwner}
            >
              +
            </button>
            <div>{score}</div>
            <button
              onClick={() => score > 0 && setScore(score - 1)}
              disabled={!commentOwner}
            >
              -
            </button>
          </div>
          <form action={handleUpdateComment} className=" w-full h-auto">
            <div className="flex flex-col gap-2 w-full">
              <TextareaAutosize
                className="max-h-[300px] outline-primary-light-blue p-1 "
                disabled={!isTrue}
                autoFocus={isTrue}
                defaultValue={comment.content}
                name="content"
                placeholder="enter text here..."
                onChange={(e) => setIsEmpty(e.target.value)}
              />
              <input type="text" name="mode" hidden defaultValue={mode} />
              <input
                type="text"
                name="commentID"
                hidden
                defaultValue={comment._id}
              />

              <Button hidden={!isTrue} text="Updat" isEmpty={isEmpty} />
            </div>
          </form>
        </div>
      </div>
      {isOpen && (
        <ReplyCommentForm
          user={user}
          comment={comment}
          setCurOpen={setCurOpen}
        />
      )}
      <Window name="delete" widthsize="auto" sizetall="auto">
        <ConfirmDelete resourceName="comment" id={comment._id} mode={mode} />
      </Window>
    </Modal>
  );
}
function Button({ isEmpty, text, hidden }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      hidden={hidden || isEmpty <= 0}
      className="bg-primary-moderate-blue px-2 py-2 w-1/6 rounded-md text-primary-white hover:bg-primary-light-blue self-end"
    >
      {pending ? `${text}ing...` : `${text}e`}
    </button>
  );
}
