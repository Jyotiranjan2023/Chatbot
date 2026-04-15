export default function MessageBubble({ msg }) {
  return (
    <div
      className={`flex ${
        msg.type === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`p-3 my-1 max-w-[75%] rounded-xl ${
          msg.type === "user"
            ? "bg-yellow-400 text-black"
            : "bg-gray-700 text-white"
        }`}
      >
        {msg.image ? (
          <img
            src={msg.image}
            className="rounded-lg border-4 border-yellow-400 max-w-full"
          />
        ) : (
          msg.text
        )}
      </div>
    </div>
  );
}