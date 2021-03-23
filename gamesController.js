function GamesController(games) {
    this.games = games ? games : [];
    this.gameOptions = ["id", "name", "creationDate", "genre", "description"];

    this.getAllGames = function() {
        return this.games.map(game => ({
            id: game.id,
            name: game.name
        }));
    }

    this.getOneGameById = function(id) {
        return this.games.find(game => game.id.toString() === id)
    }

    this.addGame = function(options) {
        const newGame = {};
        this.gameOptions.forEach(option => newGame[option] = options[option]);
        games.push(newGame);
    }

    this.deleteGameById = function (id) {
        const index = games.findIndex(game => game.id.toString() === id);
        return games.splice(index, 1).length > 0;
    }

    this.changeGameById = function (id, newOptions) {
        const index = games.findIndex(game => game.id.toString() === id);
        this.gameOptions.slice(1).forEach(option => games[index][option] = newOptions[option] ? newOptions[option] : games[index][option]);
        return index >= 0;
    }
}

module.exports = GamesController;