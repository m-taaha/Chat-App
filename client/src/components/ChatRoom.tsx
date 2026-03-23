import { useEffect, useRef, useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket"
import type { UserInfo } from "../types"

interface ChatRoomProps {
  userInfo: UserInfo
}

function ChatRoom({userInfo}: ChatRoomProps) {
  const {messages, sendMessage} = useWebSocket(userInfo);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: "smooth"})
  }, [userInfo])


  const handleSend = () => {
    if (input.trim() === "") return;

    sendMessage(input);
    setInput("");
  }

  return (
    <div className="h-full flex flex-col">
      {/* room name */}
      <div className="bg-zinc-800 border-b border-zinc-700 px-6 py-4 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold"># {userInfo.roomId}</p>
          <p className="text-zinc-500 text-xs">WebSocket chat</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          <span className="text-zinc-400 text-sm">Live</span>
        </div>
      </div>

      {/* {messags list - scrollable} */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center gap-2 text-zinc-600">
            <p className="text-sm">No messages yet</p>
            <p className="text-xs">Be the first to say something 👋</p>
          </div>
        )}

        {messages.map((message, i) => (
          // looping on messages and extracting {username, message} not messages---
          // chekcing if the message is mine or theirs-- by comapring message.username with userInfo.username - if it's matches its mine - in not it's theirs
          <div
            key={i}
            className={`flex flex-col gap-1 ${isMine ? "items-end" : "items-start"}`}
          >
            <span className="text-xs text-zinc-500 px-1">
              {message.username}
            </span>
            <div
              className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : "flex-row"}`}
            >
              <p
                className={`px-4 py-2 text-sm max-w-xs leading-relaxed
      ${
        isMine
          ? "bg-purple-600 text-white rounded-2xl rounded-br-sm"
          : "bg-zinc-700 text-zinc-100 rounded-2xl rounded-bl-sm"
      }`}
              >
                {message.message}
              </p>
              <span className="text-xs text-zinc-600 whitespace-nowrap">
                {message.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* input  */}
      <div className="bg-zinc-800 border-t border-zinc-700 px-4 py-3 flex gap-3">
        <input
          className="flex-1 bg-zinc-700 border border-zinc-600 rounded-full px-5 py-2.5 text-white text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />

        <button 
        onClick={handleSend}
        className="bg-purple-600 hover:bg-purple-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0">

          <svg
            className="w-4 h-4 text-white fill-white ml-0.5"
            viewBox="0 0 24 24"
          >
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ChatRoom