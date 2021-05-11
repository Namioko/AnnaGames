import GamesRequestController from "../controllers/gamesRequestController.js";

function setupApiRouter(app, gamesController) {
    const gamesRequestController = new GamesRequestController(gamesController);

    app.get("/api/games", gamesRequestController.getGames);
    app.get("/api/games/:gameId", gamesRequestController.getGameById);
    app.post("/api/games", gamesRequestController.setGames);
    app.delete("/api/games/:gameId", gamesRequestController.deleteGameById);
    app.patch("/api/games/:gameId", gamesRequestController.changeGameById);
}

export default setupApiRouter;