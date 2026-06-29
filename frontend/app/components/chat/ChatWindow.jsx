import MessageBubble from "./MessageBubble";

export default function ChatWindow({
  messages,
  bottomRef
}) {

  return (

    <div
      className="
      flex-1
      overflow-y-auto
      bg-slate-900
      px-10
      py-8
      space-y-8
      "
    >

      {messages.map((message, index) => (

        <MessageBubble

          key={index}

          message={message}

        />

      ))}

      <div ref={bottomRef} />

    </div>

  );

}