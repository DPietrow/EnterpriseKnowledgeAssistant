import { useState } from "react";

export default function ChatInput({ onSend }) {

  const [text, setText] = useState("");

  function submit() {

    if (!text.trim()) return;

    onSend(text);

    setText("");

  }

  return (

    <div
      className="
      border-t
      border-slate-700
      bg-slate-900
      p-6
      "
    >

      <div className="mx-auto flex max-w-5xl gap-4">

        <input

          className="
          flex-1
          rounded-xl
          border
          border-slate-700
          bg-slate-800
          px-5
          py-4
          text-white
          outline-none
          focus:border-blue-500
          "

          placeholder="Ask about your enterprise documents..."

          value={text}

          onChange={(e) => setText(e.target.value)}

          onKeyDown={(e) => {

            if (e.key === "Enter") submit();

          }}

        />

        <button

          onClick={submit}

          className="
          rounded-xl
          bg-blue-600
          px-8
          text-white
          transition
          hover:bg-blue-500
          "

        >

          Send

        </button>

      </div>

    </div>

  );

}