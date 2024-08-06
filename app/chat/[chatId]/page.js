import ChatTextBox from "@/app/_components/ChatTextBox";
import { auth } from "@/app/_lib/auth";
import { socket } from "@/app/_lib/socket";
import { ChatTextProvider } from "@/app/context/useChatText";

export default async function Page({ params }) {
  const { chatId } = await params;

  const session = await auth();

  return <ChatTextBox user={session?.user} userId={Number(chatId)} />;
}
