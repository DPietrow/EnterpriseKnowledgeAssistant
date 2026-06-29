export default function TypingIndicator() {

  return (

    <div className="flex gap-2 py-3">

      <div className="h-2 w-2 animate-bounce rounded-full bg-slate-400" />

      <div
        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
        style={{ animationDelay: ".15s" }}
      />

      <div
        className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
        style={{ animationDelay: ".3s" }}
      />

    </div>

  );

}