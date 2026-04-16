import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [current, setCurrent] = useState(null);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef();

  // ✅ ADMIN SETTINGS (SAFE LOAD)
  const logo =
    localStorage.getItem("chatLogo") ||
    "https://cdn-icons-png.flaticon.com/512/1041/1041916.png";

  const title = localStorage.getItem("chatTitle") || "Support";

  const avatar =
    localStorage.getItem("chatAvatar") ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  const botColor = localStorage.getItem("botColor") || "#1f2937";
  const userColor = localStorage.getItem("userColor") || "#facc15";

  const headerColor =
    localStorage.getItem("headerColor") || "#2563eb";

  // ✅ DEFAULT FLOW (ALWAYS AVAILABLE)
  const defaultFlow = [
    {
      id: 1,
      question: "root",
      options: [
        { text: "Deposit Issue", next: 2 },
        { text: "Withdrawal Issue", next: 3 },
        { text: "Bonus Issue", next: 4 },
        { text: "Technical Issue", next: 5 },
        { text: "Referral Issue", next: 6 },
        { text: "Other Support", next: 7 },
      ],
    },
    { id: 2, answer: "Deposit reflects within 5 minutes." },
    { id: 3, answer: "Withdrawal takes up to 24 hours." },
    { id: 4, answer: "Bonus is applied automatically after deposit." },
    { id: 5, answer: "Please clear cache or reinstall the app." },
    { id: 6, answer: "Referral bonus is credited after signup." },
    { id: 7, answer: "Support team will contact you shortly." },
  ];

  // ✅ LOAD DATA (FIXED LOGIC)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("chatData"));

    if (stored && stored.length > 0) {
      const dynamicFlow = [
        {
          id: 1,
          question: "root",
          options: stored.map((item, i) => ({
            text: item.question,
            next: i + 2,
          })),
        },
        ...stored.map((item, i) => ({
          id: i + 2,
          answer: item.answer,
        })),
      ];

      setData(dynamicFlow);
    } else {
      setData(defaultFlow);
    }
  }, []);

  // INIT
  useEffect(() => {
    if (data.length > 0) {
      setCurrent(data[0]);
      setMessages([
        { type: "bot", text: "Hi 👋 How can I help you today?" },
      ]);
    }
  }, [data]);

  // AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // BOT REPLY
  const botReply = (text) => {
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { type: "bot", text }]);
    }, 600);
  };

  // OPTION CLICK
  const handleOptionClick = (opt) => {
    const next = data.find((item) => item.id === opt.next);

    setMessages((prev) => [...prev, { type: "user", text: opt.text }]);

    if (next) {
      botReply(next.answer);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "What would you like next?" },
        ]);
        setCurrent(data[0]);
      }, 900);
    }
  };

  // SEND TEXT
  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", text: input }]);
    botReply("Our team will contact you soon.");
    setInput("");
  };

  // IMAGE UPLOAD
  const handleImageUpload = (file) => {
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
    <div className="h-[700px] flex flex-col bg-[#020617] text-white">

      {/* ✅ HEADER (NOW DYNAMIC COLOR) */}
      <div
        className="p-3 flex justify-between items-center"
        style={{ backgroundColor: headerColor }}
      >
        <div className="flex items-center gap-2">
          <img src={logo} className="w-8 h-8 rounded-full bg-white" />
          <span className="font-semibold">{title}</span>
        </div>
        <span>Online</span>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m, i) => (
          <MessageBubble
            key={i}
            msg={m}
            botColor={botColor}
            userColor={userColor}
            avatar={avatar}
          />
        ))}

        {typing && <div className="text-gray-400 text-sm">Typing...</div>}
        <div ref={bottomRef}></div>
      </div>

      {/* OPTIONS */}
      {current?.options?.length > 0 && (
        <div className="p-3 grid grid-cols-2 gap-2">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt)}
              className="border border-yellow-400 text-white p-2 rounded hover:bg-yellow-400 hover:text-black"
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}

      {/* INPUT */}
      <div className="bg-[#020617] p-3 border-t border-gray-700">
        <div className="flex gap-2 items-center">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type message"
            className="flex-1 p-2 rounded bg-white text-black"
          />

          {/* + FILE */}
          <label className="bg-yellow-400 px-3 py-2 rounded cursor-pointer text-black">
            +
            <input
              type="file"
              hidden
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </label>

          <button
            onClick={handleSend}
            className="bg-yellow-400 px-3 py-2 rounded text-black"
          >
            Send
          </button>

          <button
            onClick={() => setInput("")}
            className="bg-red-500 px-3 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}