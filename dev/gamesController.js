function GamesController(games) {
    this.games = games ? games : {};

    this.getAllGames = () => {
        return Object.values(this.games).reduce((result, game) => {
            result[game.id] = {
                id: game.id,
                name: game.name
            };
            return result;
        }, {});
    }

    this.getGameById = (id) => {
        return this.games[id];
    }

    this.addGame = (props) => {
        if (props.id) {
            this.games[props.id] = this.createNewGame(props);
        }
    }

    this.createNewGame = (props) => {
        return {
            id: props.id,
            name: props.name,
            creationDate: props.creationDate,
            genre: props.genre,
            description: props.description
        };
    }

    this.deleteGameById = (id) => {
        const isDeleted = !!this.games[id];
        if (isDeleted) {
            delete this.games[id];
        }
        return isDeleted;
    }

    this.changeGameById = (id, newProps) => {
        if (this.games[id]) {
            this.games[id] = {
                ...this.games[id],
                ...newProps,
                id
            }
        }
        return this.games[id];
    }
}

module.exports = GamesController;