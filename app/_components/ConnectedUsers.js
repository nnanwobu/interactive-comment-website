"use client";
import Link from "next/link";
import { useChatBox } from "../context/useChatText";

export default function ConnectedUsers({ users }) {
  // const { users } = useChatBox();

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {users.map((user, i) => (
          <li className="text-primary-100 text-xl" key={i + 1}>
            <Link href={`/chat/${user.userID}`}>
              {user.name}
              <span>{user.connected ? `(online)` : `(offline)`}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
