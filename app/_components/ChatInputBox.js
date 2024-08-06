"use client";

import { useEffect, useState } from "react";
import { useChatBox } from "../context/useChatText";
import { socket } from "../_lib/socket";
import { revalidatePath } from "next/cache";

export default function ChatInputBox({ user, currentUser, userId }) {
  const [inputText, setInputText] = useState("");

  const { users } = useChatBox();
  // const currentUser = users.find((user) => user.userId === userId);
  function handlesubmit(e) {
    e.preventDefault();

    if (currentUser)
      socket.emit("private_message", {
        message: inputText,
        to: currentUser.userID,
      });

    currentUser?.messages?.push({ content: inputText, fromself: true });
    console.log(`message from : ${currentUser}`);

    setInputText("");
  }
  // socket.on("connect", () => {
  //   socket.emit("addUser", { name, email, guestId });
  // });

  return (
    <>
      <div></div>
      <form
        className="w-[77%] h-8 flex flex-grow  items-center fixed bottom-0 "
        onSubmit={handlesubmit}
      >
        <input
          type="text"
          name="msgText"
          placeholder="write your message here"
          className="p-4 -mr-16 text-primary-800 w-[90%] flex-grow"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        <button className="bg-primary-400 mr-[5rem] p-4  ">send</button>
      </form>
    </>
  );
}
