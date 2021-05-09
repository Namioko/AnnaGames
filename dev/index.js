const express = require("express");
const GamesController = require("./gamesController.js");
const games = require("./games.json");

const app = express();

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({extended: true})); // support encoded bodies

const gamesController = new GamesController(games);

app.get("/api/games", function (req, res) {
    res.json(gamesController.getAllGames());
});
app.get("/api/games/:gameId", function (req, res) {
    const gameId = req.params.gameId;
    const game = gamesController.getGameById(gameId);
    if (game) {
        res.json(game);
    } else {
        handleNotFound(res);
    }
});
app.post("/api/games", function (req, res) {
    const createdGame = gamesController.addGame(req.body);
    res.json({createdGameLink: `${req.protocol}://${req.get('host')}${req.originalUrl}/${createdGame.id}`});
});
app.delete("/api/games/:gameId", function (req, res) {
    const gameId = req.params.gameId;
    const isDeleted = gamesController.deleteGameById(gameId);
    if (isDeleted) {
        res.status(204);
        res.send();
    } else {
        handleNotFound(res);
    }
});
app.patch("/api/games/:gameId", function (req, res) {
    const gameId = req.params.gameId;
    const isChanged = gamesController.changeGameById(gameId, req.body);
    if (isChanged) {
        res.send();
    } else {
        handleNotFound(res);
    }
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500);
});

function handleNotFound(res) {
    res.status(404).send();
}

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});