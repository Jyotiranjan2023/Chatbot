import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("adminUser"))
  );

  // ADMIN ROUTE
  if (window.location.pathname === "/admin") {
    if (!user) return <AdminLogin onLogin={setUser} />;

    return (
      <AdminPanel
        user={user}
        onLogout={() => {
          localStorage.removeItem("adminUser");
          setUser(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0b1a2b]">

      {/* CENTER CONTAINER */}
      <div className="w-[420px] bg-[#f3f4f6] shadow-lg rounded-lg overflow-hidden">
        <ChatWindow />
      </div>

    </div>
  );
}

export default App;