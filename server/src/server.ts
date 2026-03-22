import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

interface User {
    socket: WebSocket;
    room: string;
}


let allSockets: User[] = []; //all socket connections global variable - (multiple sockts)

wss.on("connection", (socket) => {



    socket.on("message", (message: string) => {
        const parsedMessage = JSON.parse(message);

        if(parsedMessage.type == "join") {
            console.log(`user joined room ${parsedMessage.payload.roomId}`)
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }


        if(parsedMessage.type == "chat") {
            console.log("user want to chat");
            // const currentUserRoom = allSockets.filter(s => s.socket === socket)
            let currentUserRoom = null;
            for (let i = 0; i < allSockets.length; i++) {
                if(allSockets[i]?.socket == socket) {
                currentUserRoom = allSockets[i]?.room
            }
        }
        
         for (let i = 0; i < allSockets.length; i++) {
           if (allSockets[i]?.room == currentUserRoom) {
             allSockets[i]?.socket.send(parsedMessage.payload.message);
           }
         }
        }

       
    })


   
    })