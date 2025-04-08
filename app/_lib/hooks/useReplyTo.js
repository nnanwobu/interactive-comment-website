"use client";
import { createContext, useContext, useState } from "react";

const ReplyToContext = createContext();
function ReplyToProvider({ children }) {
  const [replyTo, setReplyTo] = useState();
  const [isOpen, setIsOpen] = useState(null);
  const [curOpen, setCurOpen] = useState(null);
  return (
    <ReplyToContext.Provider
      value={{ replyTo, setReplyTo, isOpen, setIsOpen, curOpen, setCurOpen }}
    >
      {children}
    </ReplyToContext.Provider>
  );
}

function useReplyTo() {
  const context = useContext(ReplyToContext);
  if (context === "undefined")
    throw new Error("hook cannot be used outside its scope");
  return context;
}

export { ReplyToProvider, useReplyTo };
