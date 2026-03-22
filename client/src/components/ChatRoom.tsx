import { useState } from "react";
import { useWebSocket } from "../hooks/useWebSocket"
import type { UserInfo } from "../types"

interface ChatRoomProps {
  userInfo: UserInfo
}

function ChatRoom({userInfo}: ChatRoomProps) {
  const {messages, sendMessage} = useWebSocket(userInfo);
  const [input, setInput] = useState("");


  const handleSend = () => {
    if (input.trim() === "") return;

    sendMessage(input);
    setInput("");
  }

  return (
    <div className="h-full flex flex-col">
      {/* room name */}
      <div className="bg-zinc-800 border-b border-zinc-700 px-6 py-4">
        roomId
      </div>

      {/* {messags list - scrollable} */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
        {messages.map((message, i) => (
          // looping on messages and extracting {username, message} not messages---
          // chekcing if the message is mine or theirs-- by comapring message.username with userInfo.username - if it's matches its mine - in not it's theirs
          <div
            key={i}
            className={
              message.username === userInfo.username
                ? "self-end bg-purple-600 text-white rounded-2xl rounded-br-sm px-4 py-2"
                : "self-start bg-zinc-700 text-zinc-100 rounded-2xl rounded-bl-sm px-4 py-2"
            }
          >
            {message.message}
          </div>
        ))}
      </div>

      {/* input  */}
      <div className="bg-zinc-800 border-t border-zinc-700 px-4 py-3 flex gap-3">
        <input
          className="w-full rounded-4xl bg-white px-4 py-3 focus:outline-none  focus:ring-2 focus:ring-violet-800 transition-all"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={handleSend}
          className="bg-purple-500 hover:bg-purple-700 px-8 py-3 rounded-4xl text-white font-semibold transition-colors "
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatRoom