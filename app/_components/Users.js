"use client";

import { useChatBox } from "../context/useChatText";
import ConnectedUsers from "./ConnectedUsers";

export default function Users() {
  const { users } = useChatBox();
  return <ConnectedUsers users={users} />;
}
