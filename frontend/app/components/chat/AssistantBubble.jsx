import MarkdownRenderer from "./MarkdownRenderer";
import CitationCard from "./CitationCard";
import TypingIndicator from "./TypingIndicator";

export default function AssistantBubble({ message }) {

  return (

    <div className="flex gap-4">

      <div
        className="
        mt-1
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-blue-500
        text-lg
        "
      >
        🤖
      </div>

      <div
        className="
        max-w-3xl
        rounded-2xl
        bg-slate-800
        px-5
        py-4
        text-white
        shadow
        "
      >

        {message.status === "thinking" ? (

          <TypingIndicator />

        ) : (

          <MarkdownRenderer>

            {message.content}

          </MarkdownRenderer>

        )}

        {message.citations?.map((c, i) => (

          <CitationCard

            key={i}

            citation={c}

          />

        ))}

      </div>

    </div>

  );

}