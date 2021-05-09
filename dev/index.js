const express = require("express");
const GamesController = require("./gamesController.js");
const games = require("./games.json");
const setupApiRouter = require("./routers/apiRouter");
const setupHtmlRouter = require("./routers/htmlRouter");

const app = express();

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({extended: true})); // support encoded bodies

const gamesController = new GamesController(games);

setupApiRouter(app, gamesController);
setupHtmlRouter(app, gamesController);

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500);
});

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});