import { useRef } from "react";

import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";

import useChat from "../hooks/useChat";
import useAutoScroll from "../hooks/useAutoScroll";

export default function ChatPage() {

  const { messages, send } = useChat();

  const bottomRef = useRef(null);

  useAutoScroll(bottomRef, [messages]);

  return (

    <div className="flex h-screen flex-col bg-slate-950">

      <ChatHeader />

      <ChatWindow

        messages={messages}

        bottomRef={bottomRef}

      />

      <ChatInput

        onSend={send}

      />

    </div>

  );

}