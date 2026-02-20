const { Server } = require("socket.io");
const registerHandlers = require("./registerHandlers");

let io;

exports.initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id)

        registerHandlers(io, socket);

        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id)
        })
    })

    return io;
};

exports.getIO = () => {
    if (!io) {
        throw new Error("Socket not initialized");
    }
    return io;
};