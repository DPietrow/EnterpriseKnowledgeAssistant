import { useRef, useState } from "react";

export default function UploadDropzone({ onUpload }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    onUpload(file);
  };

  return (
    <div
      className={`
        border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer
        transition-all duration-300

        ${dragging
          ? "border-blue-500 bg-blue-500/10"
          : "border-slate-700 hover:border-slate-500"
        }
      `}
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
    >

      <input
        ref={inputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      <div className="text-lg font-semibold">
        Drag & drop PDF here
      </div>

      <div className="text-sm text-slate-400 mt-2">
        or click to browse
      </div>

    </div>
  );
}