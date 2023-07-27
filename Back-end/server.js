const express = require('express');
const server = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const cors = require('cors');


async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb+srv://ukuttamanand:Uttu%402002@cluster0.6uiexvy.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Data Base Connected Successfully !");
    } catch (error) {
        console.error("Error Data Base Connected Successfully !:", error.message);
    }
}

connectToDatabase();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(8000, function check(error) {
    if (error) {
        console.log("Error Server");
    } else {
        console.log("Server Start Successfully !");
    }
});
