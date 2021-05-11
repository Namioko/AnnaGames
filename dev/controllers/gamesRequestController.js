import GamesController from "./gamesController";

function GamesRequestController(gamesController) {
    this.getGames = (req, res) => {
        res.json(gamesController.getAllGames());
    }

    this.getGameById = (req, res) => {
        const gameId = req.params.gameId;
        const game = gamesController.getGameById(gameId);
        if (game) {
            res.json(game);
        } else {
            this.handleNotFound(res);
        }
    }

    this.setGames = (req, res) => {
        const createdGame = gamesController.addGame(req.body);
        res.json({createdGameLink: `${req.protocol}://${req.get('host')}${req.originalUrl}/${createdGame.id}`});
    }

    this.deleteGameById = (req, res) => {
        const gameId = req.params.gameId;
        const isDeleted = gamesController.deleteGameById(gameId);
        if (isDeleted) {
            res.status(204);
            res.send();
        } else {
            this.handleNotFound(res);
        }
    }

    this.changeGameById = (req, res) => {
        const gameId = req.params.gameId;
        const isChanged = gamesController.changeGameById(gameId, req.body);
        if (isChanged) {
            res.send();
        } else {
            this.handleNotFound(res);
        }
    }

    this.handleNotFound = (res) => {
        res.status(404).send();
    }
}

export default GamesRequestController;