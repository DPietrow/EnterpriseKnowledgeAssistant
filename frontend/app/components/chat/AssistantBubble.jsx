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
          bg-slate-800/80
          px-5
          py-4
          text-white
          shadow-lg
          backdrop-blur-md
          transition-all
          duration-200
        "
      >

        {message.status === "thinking" ? (
          <TypingIndicator />
        ) : (
          <div className="relative">

            <div
              className="
                transition-all
                duration-150
                ease-out
                whitespace-pre-wrap
              "
            >
              <MarkdownRenderer>
                {message.content}
              </MarkdownRenderer>
            </div>
        
            {/* streaming cursor */}
            <span className="relative">
            {message.status === "streaming" && (
              <span className="ml-1 animate-pulse">▍</span>
            )}
            </span>

          </div>
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