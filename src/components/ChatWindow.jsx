import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [current, setCurrent] = useState(null);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [typing, setTyping] = useState(false);

  const bottomRef = useRef();

  const defaultData = [
    {
      id: 1,
      question: "Hi 👋 How can I help you today?",
      options: [
        { text: "Deposit Issue", next: 2 },
        { text: "Withdrawal Issue", next: 3 },
        { text: "Bonus Issue", next: 4 },
        { text: "Technical Issue", next: 5 },
        { text: "Referral Issue", next: 6 },
        { text: "Other Support", next: 7 },
      ],
    },
    { id: 2, answer: "Deposit usually reflects within 5 minutes.", options: [] },
    { id: 3, answer: "Withdrawal takes up to 24 hours.", options: [] },
    { id: 4, answer: "Bonus is applied automatically.", options: [] },
    { id: 5, answer: "Try reinstalling app.", options: [] },
    { id: 6, answer: "Referral bonus credited after signup.", options: [] },
    { id: 7, answer: "Please describe your issue 👇", options: [] },
  ];

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("chatData"));
    const finalData = stored && stored.length ? stored : defaultData;

    setData(finalData);
    setCurrent(finalData[0]);
    setMessages([{ type: "bot", text: finalData[0].question }]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // ✅ Typing simulation
  const botReply = (text, nextNode = null) => {
    setTyping(true);

    setTimeout(() => {
      setTyping(false);

      setMessages((prev) => [
        ...prev,
        { type: "bot", text },
      ]);

      if (nextNode) {
        if (!nextNode.options.length) {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { type: "bot", text: "What would you like next?" },
            ]);
            setCurrent(data[0]);
          }, 800);
        } else {
          setCurrent(nextNode);
        }
      }
    }, 800);
  };

  const handleOptionClick = (opt) => {
    const next = data.find((item) => item.id === opt.next);
    if (!next) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: opt.text },
    ]);

    botReply(next.answer || next.question, next);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: input },
    ]);

    botReply("Our team will contact you soon.");
    setInput("");
  };

  const handleCancel = () => {
    setMessages([
      { type: "bot", text: data[0]?.question || "Hi 👋 How can I help you?" },
    ]);
    setCurrent(data[0]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setMessages((prev) => [
        ...prev,
        { type: "user", image: reader.result },
      ]);

      botReply("Image received ✅");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-lg mx-auto h-[700px] flex flex-col bg-gradient-to-b from-[#0f172a] to-[#020617] text-white rounded-xl shadow-2xl overflow-hidden">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>🤖</span>
          <span className="font-bold">Biswajit Support</span>
        </div>
        <span className="text-sm">Online</span>
      </div>

      {/* SEARCH */}
      <div className="p-2 bg-white flex gap-2">
        <input
          placeholder="Search Ticket ID"
          className="flex-1 p-2 border rounded text-black"
        />
        <button className="bg-yellow-400 px-3 rounded text-black">Search</button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} />
        ))}

        {/* Typing */}
        {typing && (
          <div className="text-sm text-gray-400">Typing...</div>
        )}

        <div ref={bottomRef}></div>
      </div>

      {/* OPTIONS */}
      {current?.options?.length > 0 && (
        <div className="p-3 grid grid-cols-2 gap-2">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt)}
              className="border border-yellow-400 p-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}

      {/* INPUT */}
      <div className="flex p-2 gap-2 bg-black">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="flex-1 p-2 rounded text-black"
          placeholder="Type message"
        />

        <button
          onClick={handleCancel}
          className="bg-red-500 px-3 rounded"
        >
          Cancel
        </button>

        <button
          onClick={handleSend}
          className="bg-yellow-400 px-3 rounded text-black"
        >
          Send
        </button>
      </div>

      {/* IMAGE */}
      <div className="p-2 bg-black">
        <input type="file" onChange={handleImageUpload} />
      </div>
    </div>
  );
}