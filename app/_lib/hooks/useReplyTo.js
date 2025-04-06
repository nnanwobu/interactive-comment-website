"use client";
import { createContext, useContext, useState } from "react";

const ReplyToContext = createContext();
function ReplyToProvider({ children }) {
  const [replyTo, setReplyTo] = useState();
  return (
    <ReplyToContext.Provider value={{ replyTo, setReplyTo }}>
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
