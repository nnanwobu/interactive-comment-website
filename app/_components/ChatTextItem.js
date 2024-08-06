"use client";
import { formatDate } from "date-fns";

export default function ChatTextItem({ msg, marginLeft, bg, user }) {
  const date = new Date();
  console.log(msg);

  return (
    <li
      className={`px-2 py-0 ${bg} text-primary-50  border-none table  my-2 ml-${marginLeft} mr-8 rounded-md `}
    >
      <div className="flex flex-col">
        <span className="text-primary-100 text-[0.7rem]">{user}</span>
        <span className="text-xl">{msg.content}</span>
        <span className="text-[0.6rem]">{formatDate(date, "dd-MM-yy-p")}</span>
      </div>
    </li>
  );
}
