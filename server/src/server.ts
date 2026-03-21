import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});

let userCount = 0;
let allSockets: WebSocket[] = []; //all socket connections global variable

wss.on("connection", (socket) => {
    allSockets.push(socket); //pushing this socket to global sockets in order to broadcast


    userCount = userCount + 1;
    console.log("user connected #" + userCount);

    socket.on("message", (message) => {
        console.log(`message recieved ${message.toString()} from user: ${userCount}`);

        for (const s of allSockets){
        setTimeout(() => {
            s.send(`${message.toString()} : sent from the server`)
        }, 1000)
    }

    })
})