
import { useState } from "react";
import type { UserInfo } from "../types";

interface JoinRoomProps {
    onJoin: (userInfo: UserInfo) => void;
}



function JoinRoom({onJoin}: JoinRoomProps) {
    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");

    const handleJoin = () => {
        if(username.trim() === "" || roomId.trim() === "") return
        
        onJoin({username, roomId});
    }

  return (
    <div className="h-full flex items-center justify-center">
      <div className="flex flex-col justify-center items-center bg-zinc-800 rounded-2xl p-8 w-full max-w-sm border border border-zinc-700  ">
        <div className="flex flex-col justify-center items-center gap-2">
          <h1 className="text-white text-3xl font-semibold tracking-tight">
            Join a room
          </h1>
          <p className="text-zinc-500">
            Enter your name and room ID to start chatting
          </p>
        </div>

        <div className="flex flex-col  gap-5">
            {/* input  */}
          <div className="">
            <label id="username" className="text-purple-500 font-bold">
              USERNAME
            </label>
            <input
              className="bg-zinc-900 border border-zinc-700  rounded-lg px-4 py-2.5 text-white placeholder-zinc-800 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label id="room-id" className="text-purple-500 font-bold">
              ROOM ID
            </label>
            <input
              className="bg-zinc-900 border border-zinc-700  rounded-lg px-4 py-2.5 text-white placeholder-zinc-800 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="room-id"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>

          <button 
          onClick={handleJoin}
          className="bg-purple-600  hover:bg-purple-700 text-white rounded-lg py-2.5  w-full font-semibold transition-colors ">
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinRoom