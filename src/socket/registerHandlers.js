const productsSocket = require("./modules/products.socket");

module.exports = (io, socket) => {
    productsSocket(io, socket);
}