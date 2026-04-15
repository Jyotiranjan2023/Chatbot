import { useState } from "react";
import ChatWindow from "./ChatWindow";

export default function Chatbot() {
  const [open, setOpen] = useState(true); // 👈 FORCE OPEN FOR TEST

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        {open ? "✖" : "💬"}
      </button>

      {/* Chat */}
      {open && (
        <div className="fixed bottom-20 right-5 w-80 h-[500px] z-50">
          <ChatWindow />
        </div>
      )}
    </>
  );
}