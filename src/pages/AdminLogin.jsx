import { useState, useEffect } from "react";

export default function AdminLogin({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // ✅ AUTO LOGIN IF ALREADY LOGGED IN
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("adminUser"));
    if (storedUser) {
      onLogin(storedUser);
    }
  }, []);

  const handleLogin = () => {
    const users = [
      { id: "admin", password: "1234", role: "admin", name: "Admin User" },
      { id: "staff", password: "1234", role: "staff", name: "Staff User" },
    ];

    const user = users.find(
      (u) => u.id === userId && u.password === password
    );

    if (user) {
      localStorage.setItem("adminUser", JSON.stringify(user));
      onLogin(user);
    } else {
      alert("Invalid credentials ❌");
    }
  };

  return (
    <div className="h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-700 to-indigo-900 text-white items-center justify-center">
        <div className="text-center">

          {/* ✅ LOGO (FROM ADMIN PANEL) */}
          <img
            src={
              localStorage.getItem("chatLogo") ||
              "https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            }
            className="w-20 mx-auto mb-4"
          />

          <h1 className="text-4xl font-bold">Support Admin</h1>
          <p className="text-gray-200 mt-2">
            Manage chatbot, users & settings
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96">

          <h2 className="text-2xl font-bold mb-6 text-center">
            🔐 Admin Login
          </h2>

          <input
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border p-3 w-full mb-3 rounded focus:outline-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 w-full mb-4 rounded focus:outline-blue-500"
          />

          <button
            onClick={handleLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white w-full p-3 rounded font-semibold"
          >
            Login
          </button>

          {/* DEMO INFO */}
          <div className="text-sm text-gray-500 mt-4 text-center">
            <p>Admin: admin / 1234</p>
            <p>Staff: staff / 1234</p>
          </div>
        </div>
      </div>
    </div>
  );
}