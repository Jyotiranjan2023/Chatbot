import { useState, useEffect } from "react";

export default function AdminPanel() {
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
    const newItem = {
      id: Date.now(),
      question,
      answer,
      options: [],
      avatar,
    };

    const updated = [...data, newItem];
    setData(updated);
    localStorage.setItem("chatData", JSON.stringify(updated));

    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

      <input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 mb-2 w-full"
      />

      <input
        placeholder="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="border p-2 mb-2 w-full"
      />

      <input type="file" onChange={handleAvatar} className="mb-2" />

      <button onClick={addItem} className="bg-blue-600 text-white px-4 py-2">
        Add Flow
      </button>

      <div className="mt-4">
        {data.map((item) => (
          <div key={item.id} className="border p-2 my-2">
            {item.question || item.answer}
          </div>
        ))}
      </div>
    </div>
  );
}