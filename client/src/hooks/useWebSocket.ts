// 1. Where do you CREATE the WebSocket? (hint: which hook runs once on mount?)
// 2. Where do you CLEAN UP the connection? (hint: return a function from that same hook)
// 3. What do you need to RETURN from this hook so ChatRoom can use it?


import { useEffect, useRef, useState } from "react";
import type { UserInfo, Message } from "../types";



export function useWebSocket (userInfo: UserInfo) {
    const [messages, setmessages] = useState<Message[]>([]);
    const socketRef = useRef<WebSocket | null>(null);

 
    // this should be running on mount  
    // on mount i want the connection to be happened
    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8080");
        socketRef.current = ws



        ws.onopen = () => {
            // the first thing is to send the data of room id and username - that i am tht person and joining this room

            ws.send(JSON.stringify({
                type: "join",
                payload: {
                    roomId: userInfo.roomId,
                    username: userInfo.username
                }
            }));
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            setmessages(prev => [...prev, data]) //mutating the array wihtout changing the previous one 
        };

        return () => {
            ws.close() 
        }
    }, []);

    const sendMessage = (message: string) => {
        socketRef.current?.send(JSON.stringify({
            type: "chat",
            payload: {message}
        }));
    };


    return {messages, sendMessage}
}



