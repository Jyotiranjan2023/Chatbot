import { useState, useEffect } from "react";

export default function AdminPanel({ onLogout }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [data, setData] = useState([]);

  const [title, setTitle] = useState("");
  const [botColor, setBotColor] = useState("#1f2937");
  const [userColor, setUserColor] = useState("#facc15");
  const [headerColor, setHeaderColor] = useState("#2563eb");

  const [avatar, setAvatar] = useState("");
  const [logo, setLogo] = useState("");

  const [showProfile, setShowProfile] = useState(false);

  // LOAD DATA
  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("chatData")) || []);
    setTitle(localStorage.getItem("chatTitle") || "Support");
    setBotColor(localStorage.getItem("botColor") || "#1f2937");
    setUserColor(localStorage.getItem("userColor") || "#facc15");
    setHeaderColor(localStorage.getItem("headerColor") || "#2563eb");
    setAvatar(localStorage.getItem("chatAvatar") || "");
    setLogo(localStorage.getItem("chatLogo") || "");
  }, []);

  // ADD QA
  const addQA = () => {
    if (!question || !answer) return;

    const updated = [...data, { question, answer }];
    setData(updated);
    localStorage.setItem("chatData", JSON.stringify(updated));

    setQuestion("");
    setAnswer("");
  };

  // SAVE SETTINGS
  const saveSettings = () => {
    localStorage.setItem("chatTitle", title);
    localStorage.setItem("botColor", botColor);
    localStorage.setItem("userColor", userColor);
    localStorage.setItem("headerColor", headerColor);
    localStorage.setItem("chatAvatar", avatar);
    localStorage.setItem("chatLogo", logo);

    alert("Saved Successfully ✅");
  };

  // ✅ FIXED AVATAR UPLOAD
  const handleAvatar = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = reader.result;
      setAvatar(img);
      localStorage.setItem("chatAvatar", img); // SAVE INSTANT
    };
    reader.readAsDataURL(file);
  };

  // ✅ FIXED LOGO UPLOAD (IMPORTANT)
  const handleLogo = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = reader.result;
      setLogo(img);
      localStorage.setItem("chatLogo", img); // SAVE INSTANT
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-blue-700 text-white p-4">
        <h1 className="text-xl font-bold mb-6">⚙ Admin</h1>

        <ul className="space-y-3">
          <li onClick={() => setActiveTab("dashboard")} className="cursor-pointer">Dashboard</li>
          <li onClick={() => setActiveTab("chat")} className="cursor-pointer">Chat Management</li>
          <li onClick={() => setActiveTab("settings")} className="cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1">

        {/* TOP BAR */}
        <div className="bg-white shadow p-4 flex justify-between items-center">

          <h2 className="font-bold text-lg capitalize">{activeTab}</h2>

          {/* ✅ PROFILE IMAGE FIXED */}
          <div className="relative">
            <img
              src={
                logo ||
                avatar ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              className="w-10 h-10 rounded-full object-cover cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            />

            {showProfile && (
              <div className="absolute right-0 mt-2 bg-white shadow rounded w-48 p-3">
                <p className="font-semibold">Admin</p>
                <button
                  onClick={onLogout}
                  className="text-red-500 mt-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">

          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-4 shadow rounded">Total Q&A: {data.length}</div>
              <div className="bg-white p-4 shadow rounded">Status: Active</div>
              <div className="bg-white p-4 shadow rounded">System Ready ✅</div>
            </div>
          )}

          {/* CHAT */}
          {activeTab === "chat" && (
            <div className="bg-white p-4 rounded shadow">

              <h3 className="font-bold mb-2">Add Chat Response</h3>

              <input
                placeholder="Question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="border p-2 w-full mb-2"
              />

              <input
                placeholder="Answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="border p-2 w-full mb-2"
              />

              <button onClick={addQA} className="bg-blue-600 text-white px-4 py-2">
                Add
              </button>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <div className="bg-white p-4 rounded shadow">

              <h3 className="font-bold mb-3">Customization</h3>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 w-full mb-3"
                placeholder="Chat Title"
              />

              <label>Header Color</label>
              <input type="color" value={headerColor} onChange={(e) => setHeaderColor(e.target.value)} />

              <label className="ml-4">Bot Color</label>
              <input type="color" value={botColor} onChange={(e) => setBotColor(e.target.value)} />

              <label className="ml-4">User Color</label>
              <input type="color" value={userColor} onChange={(e) => setUserColor(e.target.value)} />

              {/* LOGO */}
              <div className="mt-4">
                <label className="bg-yellow-400 px-3 py-2 cursor-pointer">
                  Upload Header Logo
                  <input type="file" hidden onChange={(e) => handleLogo(e.target.files[0])} />
                </label>
              </div>

              {/* AVATAR */}
              <div className="mt-2">
                <label className="bg-blue-400 px-3 py-2 cursor-pointer">
                  Upload Chat Avatar
                  <input type="file" hidden onChange={(e) => handleAvatar(e.target.files[0])} />
                </label>
              </div>

              <button onClick={saveSettings} className="block mt-4 bg-green-600 text-white px-4 py-2">
                Save Settings
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}