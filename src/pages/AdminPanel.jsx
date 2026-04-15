import { useState, useEffect } from "react";

export default function AdminPanel({ user, onLogout }) {
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("chatData")) || [];
    setData(stored);
  }, []);

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const addItem = () => {
    if (!question) return alert("Enter question");

    const newItem = {
      id: Date.now(),
      question,
      answer,
      avatar,
      options: [],
    };

    const updated = [...data, newItem];
    setData(updated);
    localStorage.setItem("chatData", JSON.stringify(updated));

    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">⚙️ Admin Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* FORM */}
      <div className="bg-slate-800 p-5 rounded-xl shadow-lg mb-6">

        <h2 className="text-lg mb-3">Add Chat Flow</h2>

        <input
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 mb-2 rounded text-black"
        />

        <input
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 mb-2 rounded text-black"
        />

        <input type="file" onChange={handleAvatar} className="mb-3" />

        <button
          onClick={addItem}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Add Flow
        </button>
      </div>

      {/* DATA LIST */}
      <div className="grid gap-3">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-slate-800 p-3 rounded shadow flex justify-between items-center"
          >
            <span>{item.question || item.answer}</span>
            <button
              onClick={() => {
                const updated = data.filter((d) => d.id !== item.id);
                setData(updated);
                localStorage.setItem("chatData", JSON.stringify(updated));
              }}
              className="bg-red-500 px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}