"use client";

import ChatInputBox from "./ChatInputBox";
import ChatBoxtList from "./ChatBoxList";
import Profile from "./Profile";
import Users from "./Users";
import { useChatBox } from "../context/useChatText";

export default function ChatTextBox({ user, userId }) {
  const { users } = useChatBox();
  const anyi = new Set(users);
  console.log(anyi);
  const currentUser = users.find((user) => user.userID === userId);

  return (
    <main>
      <div>
        <div className="flex flex-col">
          <Profile username={currentUser?.name} />
          <ChatBoxtList userId={userId} currentUser={currentUser} />
          <ChatInputBox userId={userId} user={user} currentUser={currentUser} />
        </div>
      </div>
    </main>
  );
}
