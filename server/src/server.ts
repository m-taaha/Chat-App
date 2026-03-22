import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

interface User {
    socket: WebSocket;
    room: string;
    username: string;
}


let allSockets: User[] = []; //all socket connections global variable - (multiple sockts)

wss.on("connection", (socket) => {



    socket.on("message", (message: string) => {
        const parsedMessage = JSON.parse(message.toString());

        if(parsedMessage.type === "join") {

            const alreadyJoined = allSockets.find(s => s.socket === socket);
            if(!alreadyJoined) {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId,
                username: parsedMessage.payload.username,
            });
        }
    }


        if(parsedMessage.type === "chat") {
            console.log("user want to chat");
            // const currentUserRoom = allSockets.filter(s => s.socket === socket)
            // let currentUserRoom = null;

            const currentUser = allSockets.find(s => s.socket === socket);
            if(!currentUser) return;

            allSockets
            .filter(s => s.room === currentUser.room)
            .forEach(s => {
                s.socket.send(JSON.stringify({
                    username: currentUser.username,
                    message: parsedMessage.payload.message
                }));
            });
        }
    });

    // cleanup on disconnect - 
    socket.on("close", () => {
        allSockets = allSockets.filter(s => s.socket !== socket);
        console.log("User disconnected, clean up")
    })


    })