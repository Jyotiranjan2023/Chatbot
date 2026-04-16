export default function MessageBubble({ msg, botColor, userColor, avatar }) {
  const isUser = msg.type === "user";

  return (
    <div
      className={`flex items-end gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* ✅ BOT AVATAR */}
      {!isUser && avatar && (
        <img
          src={avatar}
          alt="bot"
          className="w-7 h-7 rounded-full object-cover border border-gray-500"
        />
      )}

      {/* MESSAGE BOX */}
      <div
        className="p-3 my-1 max-w-[75%] rounded-2xl break-words shadow"
        style={{
          backgroundColor: isUser
            ? userColor || "#facc15"
            : botColor || "#1f2937", // ✅ FIXED DARK
          color: isUser ? "#000" : "#fff",
        }}
      >
        {/* IMAGE */}
        {msg.image ? (
          <img
            src={msg.image}
            alt="uploaded"
            className="rounded-lg max-w-full border border-yellow-400"
          />
        ) : (
          <p className="text-sm leading-relaxed">{msg.text}</p>
        )}

        {/* TIME */}
        <div className="text-[10px] opacity-60 mt-1 text-right">
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}