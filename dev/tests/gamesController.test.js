const GamesController = require("../controllers/gamesController.js");

const GAME_PROPS = ["id", "name", "creationDate", "genre", "description"];

test("add game", () => {
    const testGame = {
        id: "test"
    };
    const gamesController = new GamesController();
    gamesController.addGame(testGame);
    expect(gamesController.games).toEqual({[testGame.id]: testGame});
});

test("add several games", () => {
    const testGames = {
        "test1": {
            id: "test1"
        },
        "test2": {
            id: "test2"
        },
        "test3": {
            id: "test3"
        }
    };
    const gamesController = new GamesController();
    Object.values(testGames).forEach(game => gamesController.addGame(game));
    expect(gamesController.games).toEqual(testGames);
});

test("add game with all props", () => {
    const testGame = {};
    GAME_PROPS.forEach((option, index) => {
        testGame[option] = `test${index}`;
    })
    const gamesController = new GamesController();
    gamesController.addGame(testGame);
    expect(gamesController.games).toEqual({[testGame.id]: testGame});
});

test("add game without id", () => {
    const testGame = {};
    GAME_PROPS.slice(1).forEach((option, index) => {
        testGame[option] = `test${index}`;
    })
    const gamesController = new GamesController();
    gamesController.addGame(testGame);
    expect(gamesController.games).toEqual({});
});

test("add games through constructor", () => {
    const testGame = {
        id: "test"
    };
    const gamesController = new GamesController({[testGame.id]: testGame});
    expect(gamesController.games).toEqual({[testGame.id]: testGame});
});

test("get one game by id", () => {
    const testGame = {
        id: "test"
    };
    const gamesController = new GamesController({[testGame.id]: testGame});
    expect(gamesController.getGameById(testGame.id)).toEqual(testGame);
});

test("get several games as all", () => {
    const testGames = {
        "test1": {
            id: "test1"
        },
        "test2": {
            id: "test2"
        },
        "test3": {
            id: "test3"
        }
    };
    const gamesController = new GamesController(testGames);
    expect(gamesController.getAllGames()).toEqual(testGames);
});

test("delete game by id", () => {
    const testGames = {
        "test1": {
            id: "test1"
        },
        "test2": {
            id: "test2"
        },
        "test3": {
            id: "test3"
        }
    };
    const testGame = Object.values(testGames)[1];
    const gamesController = new GamesController(testGames);
    expect(gamesController.deleteGameById(testGame.id)).toBeTruthy();
    expect(gamesController.games[testGame.id]).toBeFalsy();
});

test("delete not found game", () => {
    const testGames = {
        "test1": {
            id: "test1"
        },
        "test2": {
            id: "test2"
        },
        "test3": {
            id: "test3"
        }
    };
    const gamesController = new GamesController(testGames);
    expect(gamesController.deleteGameById("test")).toBeFalsy();
    expect(gamesController.games).toEqual(testGames);
});

test("change all props (except id) of game", () => {
    const testGame = {};
    const newProps = {};
    GAME_PROPS.forEach((option, index) => {
        testGame[option] = `test${index}`;
        newProps[option] = `newTest${index}`;
    });
    const gamesController = new GamesController({[testGame.id]: testGame});
    expect(gamesController.changeGameById(testGame.id, newProps)).toBeTruthy();
    expect(Object.values(gamesController.games)[0]).toEqual({...newProps, id: testGame.id});
});

test("change id of game and check that nothing was changed", () => {
    const testGame = {};
    const newProps = {id: "test"};
    GAME_PROPS.forEach((option, index) => {
        testGame[option] = `test${index}`;
    });
    const gamesController = new GamesController({[testGame.id]: testGame});
    expect(gamesController.changeGameById(testGame.id, newProps)).toBeTruthy();
    expect(Object.values(gamesController.games)[0]).toEqual(testGame);
});

test("change not found game", () => {
    const testGame = {};
    const newProps = {};
    GAME_PROPS.forEach((option, index) => {
        testGame[option] = `test${index}`;
        newProps[option] = `newTest${index}`;
    });
    const gamesController = new GamesController({[testGame.id]: testGame});
    expect(gamesController.changeGameById("test", newProps)).toBeFalsy();
    expect(gamesController.games).toEqual({[testGame.id]: testGame});
});