import ChatHeader from "../components/chat/ChatHeader";
import ChatWindow from "../components/chat/ChatWindow";
import ChatInput from "../components/chat/ChatInput";
import RequestLifecycleIndicator from "../components/chat/RequestLifecycleIndicator";

import useChat from "../hooks/useChat";
import useAutoScroll from "../hooks/useAutoScroll";
import { useRef } from "react";

export default function ChatPage() {
  const { messages, send, lifecycle } = useChat();
  const bottomRef = useRef(null);

  useAutoScroll(bottomRef, [messages]);

  return (
    <>
      <ChatHeader />

      <RequestLifecycleIndicator stage={lifecycle.stage} />

      <ChatWindow messages={messages} bottomRef={bottomRef} />

      <ChatInput onSend={send} />
    </>
  );
}