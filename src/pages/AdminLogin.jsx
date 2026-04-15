import { useState } from "react";

export default function AdminLogin({ onLogin }) {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = [
      { id: "admin", password: "1234", role: "admin" },
      { id: "viewer", password: "1234", role: "viewer" },
    ];

    const user = users.find(
      (u) => u.id === userId && u.password === password
    );

    if (user) {
      localStorage.setItem("adminUser", JSON.stringify(user));
      onLogin(user);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full p-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}