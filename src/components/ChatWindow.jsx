import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import supportLogo from "../assets/support.png"; // ✅ ADD THIS

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [current, setCurrent] = useState(null);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [typing, setTyping] = useState(false);
  const [language, setLanguage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // ✅ NEW

  const bottomRef = useRef();

  const texts = {
    en: {
      welcome: "Hi 👋 How can I help you today?",
      next: "What would you like next?",
      upload: "Image received ✅",
      contact: "Our team will contact you soon.",
      choose: "Please select your language",
    },
    bn: {
      welcome: "হাই 👋 আমি কিভাবে সাহায্য করতে পারি?",
      next: "এখন আপনি কি করতে চান?",
      upload: "ছবি গ্রহণ করা হয়েছে ✅",
      contact: "আমাদের টিম আপনার সাথে যোগাযোগ করবে",
      choose: "ভাষা নির্বাচন করুন",
    },
  };

  const defaultData = [
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
    { id: 2, answer: "Deposit usually reflects within 5 minutes.", options: [] },
    { id: 3, answer: "Withdrawal takes up to 24 hours.", options: [] },
    { id: 4, answer: "Bonus is applied automatically.", options: [] },
    { id: 5, answer: "Try reinstalling app.", options: [] },
    { id: 6, answer: "Referral bonus credited after signup.", options: [] },
    { id: 7, answer: "Please describe your issue 👇", options: [] },
  ];

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) setLanguage(storedLang);

    const stored = JSON.parse(localStorage.getItem("chatData"));
    const finalData = stored && stored.length ? stored : defaultData;

    setData(finalData);
  }, []);

  useEffect(() => {
    if (language && data.length) {
      setCurrent(data[0]);
      setMessages([{ type: "bot", text: texts[language].welcome }]);
    }
  }, [language, data]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const botReply = (text, nextNode = null) => {
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { type: "bot", text }]);

      if (nextNode) {
        if (!nextNode.options.length) {
          setTimeout(() => {
            setMessages((prev) => [
              ...prev,
              { type: "bot", text: texts[language].next },
            ]);
            setCurrent(data[0]);
          }, 800);
        } else {
          setCurrent(nextNode);
        }
      }
    }, 700);
  };

  const handleOptionClick = (opt) => {
    const next = data.find((item) => item.id === opt.next);

    setMessages((prev) => [
      ...prev,
      { type: "user", text: opt.text },
    ]);

    botReply(next.answer, next);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { type: "user", text: input },
    ]);

    botReply(texts[language].contact);
    setInput("");
  };

  const handleLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const handleImageUpload = (file) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setMessages((prev) => [
        ...prev,
        { type: "user", image: reader.result },
      ]);
      botReply(texts[language].upload);
    };

    reader.readAsDataURL(file);
    setSelectedFile(file);
  };

  // LANGUAGE SCREEN
  if (!language) {
    return (
      <div className="h-[700px] flex flex-col items-center justify-center bg-[#0b1220] text-white">
        <div className="bg-gray-600 px-4 py-2 rounded mb-4">
          🌐 {texts.en.choose}
        </div>

        <div className="flex gap-3">
          <button onClick={() => handleLanguage("en")} className="bg-black px-4 py-2 rounded">
            English
          </button>
          <button onClick={() => handleLanguage("bn")} className="bg-black px-4 py-2 rounded">
            বাংলা
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[700px] flex flex-col bg-[#0b1220] text-white">

      {/* HEADER */}
      <div className="bg-blue-600 p-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={supportLogo} alt="logo" className="w-7 h-7" />
          <span className="font-semibold">Biswajit Support</span>
        </div>
        <span>Online</span>
      </div>

      {/* SEARCH */}
      <div className="p-2 bg-white flex gap-2">
        <input className="flex-1 p-2 border rounded text-black" placeholder="Search Ticket ID" />
        <button className="bg-yellow-400 px-3 rounded text-black">Search</button>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m, i) => (
          <MessageBubble key={i} msg={m} />
        ))}
        {typing && <div className="text-gray-400">Typing...</div>}
        <div ref={bottomRef}></div>
      </div>

      {/* OPTIONS */}
      {current?.options?.length > 0 && (
        <div className="p-3 grid grid-cols-2 gap-2">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt)}
              className="border border-yellow-400 p-2 rounded hover:bg-yellow-400 hover:text-black"
            >
              {opt.text}
            </button>
          ))}
        </div>
      )}

      {/* INPUT */}
      <div className="bg-black p-3">
        <div className="flex gap-2 items-center">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-2 rounded text-black"
            placeholder="Type message"
          />

          {/* + Upload */}
          <label className="bg-yellow-400 px-3 py-2 rounded cursor-pointer text-black font-bold">
            +
            <input
              type="file"
              hidden
              onChange={(e) => handleImageUpload(e.target.files[0])}
            />
          </label>

          <button onClick={handleSend} className="bg-yellow-400 px-3 rounded text-black">
            Send
          </button>

          <button
            onClick={() => {
              setInput("");
              setSelectedFile(null);
            }}
            className="bg-red-500 px-3 rounded"
          >
            ✕
          </button>
        </div>

        {selectedFile && (
          <p className="text-xs text-gray-300 mt-1">
            {selectedFile.name}
          </p>
        )}
      </div>

    </div>
  );
}