const GamesController = require("./gamesController.js");
const express = require("express");
const app = express();

app.use(express.json()); // support json encoded bodies
app.use(express.raw()); // support raw encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

const NOT_FOUND_ERROR_MESSAGE = "Game was not found!";
const gamesController = new GamesController([
    {id: 123, name: "CS", creationDate: "11/8/2000", genre: "shooter", description: "Contr-terrorists are fighting against terrorists"},
    {id: 567, name: "The Witcher 3", creationDate: "5/18/2015", genre: "RPG", description: "Geralt of Rivia is trying to find his so-called daughter"}
]);

app.get("/api/games", function(req, res) {
    res.json(gamesController.getAllGames());
});
app.get("/api/games/:gameId", function(req, res) {
    const gameId = req.params.gameId;
    const game = gamesController.getOneGameById(gameId);
    handleNotFound(!!game, res, game);
});
app.post("/api/games", function(req, res) {
    gamesController.addGame(req.body);
    res.send();
});
app.delete("/api/games/:gameId", function(req, res) {
    const gameId = req.params.gameId;
    const isDeleted = gamesController.deleteGameById(gameId);
    handleNotFound(isDeleted, res);
});
app.patch("/api/games/:gameId", function(req, res) {
    const gameId = req.params.gameId;
    const isChanged = gamesController.changeGameById(gameId, req.body);
    handleNotFound(isChanged, res);
});

app.use((error, req, res, next) => {
    res.status(error.statusCode || 500);
    res.send(`<h2>${error.message}</h2>`);
});

function handleNotFound(condition, res, objectToSend) {
    if (condition) {
        if (objectToSend) {
            res.json(objectToSend);
        } else {
            res.send();
        }
    } else {
        //res.status(404).json({error: NOT_FOUND_ERROR_MESSAGE});
        const error = new Error(NOT_FOUND_ERROR_MESSAGE);
        error.statusCode = 404;
        throw error;
    }
}

app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
});