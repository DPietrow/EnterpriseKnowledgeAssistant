import { heroTypography } from "../../styles/heroTypography";

export default function ChatHeader() {
  return (
    <div className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-8 py-10">

      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
          Enterprise Knowledge Assistant
        </h1>

        <p className="mt-4 text-lg text-slate-400">
          AI-powered Retrieval-Augmented Generation for enterprise documents.
        </p>

      </div>

    </div>
  );
}