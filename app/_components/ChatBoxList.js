"use client";
import { useEffect, useRef } from "react";

import ChatTextItem from "./ChatTextItem";
import { useChatBox } from "../context/useChatText";

export default function ChatBoxtList({ userId, currentUser }) {
  const { users } = useChatBox();
  // const currentUser = users.find((user) => user.userId === userId);
  console.log(`user is ${currentUser}`);
  console.log(currentUser?.messages);

  const lastEl = useRef(null);
  useEffect(() => {
    lastEl?.current?.scrollIntoView({ behavior: "smooth" });
  }, [userId, users]);

  return (
    <ul className="h-[60vh] w-[100%] bg-primary-50 p-4 text-primary-900 overflow-auto">
      {currentUser?.messages?.length > 0 ? (
        currentUser?.messages.map((msg, i) => {
          if (msg.fromself) {
            return (
              <ChatTextItem
                user={currentUser.name}
                msg={msg}
                marginLeft={"auto"}
                key={i + 1}
                bg={"bg-primary-400"}
              />
            );
          }

          if (!msg.fromself) {
            return (
              <ChatTextItem
                user={user}
                msg={msg}
                marginLeft={"8"}
                key={i + 1}
                bg={"bg-accent-400"}
              />
            );
          }
        })
      ) : (
        <li className="text-2xl w-[80%] mx-auto">chat will show here 😎</li>
      )}
      <li ref={lastEl}></li>
    </ul>
  );
}
