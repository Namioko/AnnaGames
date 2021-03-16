var express = require("express");
var app = express();

app.use(express.json()); // support json encoded bodies
app.use(express.raw()); // support raw encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

const games = [
    {id: 123, name: "CS", creationDate: "11/8/2000", genre: "shooter", description: "Contr-terrorists are fighting against terrorists"},
    {id: 567, name: "The Witcher 3", creationDate: "5/18/2015", genre: "RPG", description: "Geralt of Rivia is trying to find his so-called daughter"}
];
const gameOptions = ["id", "name", "creationDate", "genre", "description"];

app.get("/api/games", function(req, res) {
    res.send(JSON.stringify(games.map(game => ({
        id: game.id,
        name: game.name
    }))));
});
app.get("/api/games/:gameId", function(req, res) {
    const gameId = req.params.gameId;
    res.send(JSON.stringify(games.find(game => game.id.toString() === gameId)));
});
app.post("/api/games", function(req, res) {
    const newGame = {};
    gameOptions.forEach(option => newGame[option] = req.body[option]);
    games.push(newGame);
    res.send();
});
app.delete("/api/games/:gameId", function(req, res) {
    const gameId = req.params.gameId;
    const index = games.findIndex(game => game.id.toString() === gameId);
    games.splice(index, 1);
    res.send();
});
app.patch("/api/games/:gameId", function(req, res) {
    const gameId = req.params.gameId;
    const index = games.findIndex(game => game.id.toString() === gameId);
    gameOptions.forEach(option => games[index][option] = req.body[option] ? req.body[option] : games[index][option]);
    res.send();
});

app.listen(3000, function() {
    console.log("Example app listening on port 3000!");
});