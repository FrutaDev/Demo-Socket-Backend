module.exports = (io, socket) => {


    socket.on("join-module", async (module) => {
        console.log("👽👽👽 User joined module:", module);
        const room = `module:${module}`;
        socket.join(room);
    });

    socket.onAny((event, ...args) => {
        console.log("👽👽👽 Event:", event, args);
        console.log("📞📞📞 Rooms:", socket.rooms);
    });

    socket.on("create-product", async (product) => {
        console.log("👽👽👽 User created product:", product);
        io.to("module:products").emit("product:created", product);
    });

    socket.on("update-product", async (product) => {
        console.log("👽👽👽 User updated product:", product);
        io.to("module:products").emit("product:updated", product);
    });

    socket.on("delete-product", async (productId) => {
        console.log("👽👽👽 User deleted product:", productId);
        console.log("Sockets in room", io.sockets.adapter.rooms.get("module:products"))
        io.to("module:products").emit("product:deleted", productId);
    });

}