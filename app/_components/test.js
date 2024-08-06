"use client";

import { useChatBox } from "../context/useChatText";

export default function Text() {
  const { textBox } = useChatBox();
  console.log(textBox);
  return <div>test</div>;
}
