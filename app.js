const express = require("express");
const app = express();
const sequelize = require("./src/utils/database/database");
const { seedProducts } = require("./src/utils/seeds/seedProducts");
const { initSocket } = require("./src/socket/socket");
const http = require("http");
const cors = require("cors");
const productsRoutes = require("./routes/productsRoutes");

const server = http.createServer(app);

const corsOptions = {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

initSocket(server);

app.use("/products", productsRoutes);

sequelize
    .sync()
    .then(async () => {
        console.log("Database synchronized");
        // await seedProducts();
        server.listen(3000, () => {
            console.log(`Example app running on http://localhost:3000`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

