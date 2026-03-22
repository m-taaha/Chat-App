import { useState } from "react";
import ChatRoom from "./components/ChatRoom"
import JoinRoom from "./components/JoinRoom"
import type { UserInfo } from "./types";



function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  // console.log(userInfo)

  return (
    <div className="h-screen bg-zinc-900">
      {userInfo === null 
      ? 
      <JoinRoom onJoin={setUserInfo} /> : 
      <ChatRoom  userInfo={userInfo}/>}
    </div>
  );
}

export default App
