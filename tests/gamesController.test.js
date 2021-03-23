const GamesController = require("../gamesController.js");
const {GAME_OPTIONS} = require("../constants.js");

test("add game", () => {
    const testGame = {
        id: "test"
    };
    const gamesController = new GamesController();
    gamesController.addGame(testGame);
    expect(gamesController.games).toEqual([testGame]);
});

test("add several games", () => {
    const testGames = [
        {
            id: "test1"
        },
        {
            id: "test2"
        },
        {
            id: "test3"
        }
    ];
    const gamesController = new GamesController();
    testGames.forEach(game =>gamesController.addGame(game));
    expect(gamesController.games).toEqual(testGames);
});

test("add game with all options", () => {
    const testGame = {};
    GAME_OPTIONS.forEach((option, index) => {
        testGame[option] = `test${index}`;
    })
    const gamesController = new GamesController();
    gamesController.addGame(testGame);
    expect(gamesController.games).toEqual([testGame]);
});

test("add games through constructor", () => {
    const testGame = {
        id: "test"
    };
    const gamesController = new GamesController([testGame]);
    expect(gamesController.games).toEqual([testGame]);
});

test("get one game by id", () => {
    const testGame = {
        id: "test"
    };
    const gamesController = new GamesController([testGame]);
    expect(gamesController.getOneGameById(testGame.id)).toEqual(testGame);
});

test("get several games as all", () => {
    const testGames = [
        {
            id: "test1"
        },
        {
            id: "test2"
        },
        {
            id: "test3"
        }
    ];
    const gamesController = new GamesController(testGames);
    expect(gamesController.getAllGames()).toEqual(testGames);
});

test("delete game by id", () => {
    const testGames = [
        {
            id: "test1"
        },
        {
            id: "test2"
        },
        {
            id: "test3"
        }
    ];
    const gamesController = new GamesController(testGames);
    expect(gamesController.deleteGameById(testGames[1].id)).toBeTruthy();
    expect(gamesController.games.find(game => game.id === testGames[1].id)).toBeFalsy();
});

test("delete not found game", () => {
    const testGames = [
        {
            id: "test1"
        },
        {
            id: "test2"
        },
        {
            id: "test3"
        }
    ];
    const gamesController = new GamesController(testGames);
    expect(gamesController.deleteGameById("test")).toBeFalsy();
    expect(gamesController.games).toEqual(testGames);
});

test("change all options (except id) of game", () => {
    const testGame = {};
    const newOptions = {};
    GAME_OPTIONS.forEach((option, index) => {
        testGame[option] = `test${index}`;
        newOptions[option] = `newTest${index}`;
    });
    const gamesController = new GamesController([testGame]);
    expect(gamesController.changeGameById(testGame.id, newOptions)).toBeTruthy();
    expect(gamesController.games[0]).toEqual({ ...newOptions, id: testGame.id});
});

test("change id of game and check that nothing was changed", () => {
    const testGame = {};
    const newOptions = {id: "test"};
    GAME_OPTIONS.forEach((option, index) => {
        testGame[option] = `test${index}`;
    });
    const gamesController = new GamesController([testGame]);
    expect(gamesController.changeGameById(testGame.id, newOptions)).toBeTruthy();
    expect(gamesController.games[0]).toEqual(testGame);
});

test("change not found game", () => {
    const testGame = {};
    const newOptions = {};
    GAME_OPTIONS.forEach((option, index) => {
        testGame[option] = `test${index}`;
        newOptions[option] = `newTest${index}`;
    });
    const gamesController = new GamesController([testGame]);
    expect(gamesController.changeGameById("test", newOptions)).toBeFalsy();
    expect(gamesController.games).toEqual([testGame]);
});