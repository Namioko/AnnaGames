const {GAME_OPTIONS} = require("./constants.js");

function GamesController(games) {
    this.games = games ? [...games] : [];
    this.gameOptions = GAME_OPTIONS;

    this.getAllGames = () => {
        return this.games.map(game => ({
            id: game.id,
            name: game.name
        }));
    }

    this.getOneGameById = (id) => {
        return this.games.find(game => game.id.toString() === id)
    }

    this.addGame = (options) => {
        const newGame = {};
        this.gameOptions.forEach(option => newGame[option] = options[option]);
        this.games.push(newGame);
        return newGame;
    }

    this.deleteGameById = (id) => {
        const index = this.games.findIndex(game => game.id.toString() === id);
        if (index >= 0) {
            this.games.splice(index, 1);
        }
        return index >= 0;
    }

    this.changeGameById = (id, newOptions) => {
        const index = this.games.findIndex(game => game.id.toString() === id);
        this.games[index] && this.gameOptions.slice(1).forEach(option => this.games[index][option] = newOptions[option]);
        return index >= 0;
    }
}

module.exports = GamesController;