import express from "express";
import GamesController from  "./controllers/gamesController.js";
import games from "./data/games.json";
import setupApiRouter from "./routers/apiRouter";
import setupHtmlRouter from "./routers/htmlRouter";

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