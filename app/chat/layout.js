import Users from "../_components/Users";
import { auth } from "../_lib/auth";
import { ChatTextProvider, useChatBox } from "../context/useChatText";

export default async function Layout({ children }) {
  const session = await auth();

  return (
    <div className="grid grid-cols-[16rem_1fr] h-full  gap-2">
      <ChatTextProvider guest={session?.user}>
        <Users />
        <div>{children}</div>
      </ChatTextProvider>
    </div>
  );
}
