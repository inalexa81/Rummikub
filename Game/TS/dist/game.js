var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var Card = /** @class */ (function () {
    function Card(value, color, imgUrl, isJoker, id) {
        this.value = value;
        this.color = color;
        this.imgUrl = imgUrl;
        this.isJoker = isJoker;
        this.id = (id === undefined) ? "id-" + new Date().getTime() + "-" + Math.random() : this.id;
    }
    return Card;
}());
var Player = /** @class */ (function () {
    function Player(name, firstDrop) {
        this.name = name;
        this.cards = [];
        this.firstDrop = (firstDrop !== undefined) ? firstDrop : false;
    }
    return Player;
}());
function getplayersListFromStorage() {
    try {
        var storageString = localStorage.getItem("playerList");
        if (!storageString)
            throw new Error("No such name in local storage");
        //convert string to array of objects
        var storageArray = JSON.parse(storageString);
        //convert array of objects to array of Card | Player
        var players = storageArray.map(function (p) {
            return new Player(p.name);
        });
        return players;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
var Bord = /** @class */ (function () {
    function Bord() {
        this.series = [];
        debugger;
    }
    return Bord;
}());
function addToBord(board, nid, card) {
    try {
        var cards = [];
        while (card.length > 0) {
            var c = card.pop();
            if (c !== undefined)
                cards.push(c);
        }
        board.series.push({ id: nid, cards: cards });
    }
    catch (error) {
        console.error(error);
    }
}
var Game = /** @class */ (function () {
    function Game(player1, player2, player3, player4, startIndx, currIndx, gameOver, countRounds, board) {
        this.players = [];
        this.gameDeck = getNewDeck();
        this.players.push({ player: player1, score: 0 });
        this.players.push({ player: player2, score: 0 });
        if (player3 !== undefined)
            this.players.push({ player: player3, score: 0 });
        if (player4 !== undefined)
            this.players.push({ player: player4, score: 0 });
        this.startIndx = (startIndx !== undefined) ? startIndx : this.startIndx;
        this.currIndx = (currIndx !== undefined) ? currIndx : this.startIndx;
        this.gameOver = (gameOver !== undefined) ? gameOver : false;
        this.countRounds = (countRounds !== undefined) ? countRounds : 0;
        this.board = (board !== undefined) ? board : new Bord();
    }
    Game.prototype.setPlayersForDraw = function (playersPick) {
        var _this = this;
        try {
            this.players.forEach(function (p) {
                playersPick.push({ player: p.player, card: _this.drawnCard() });
            });
        }
        catch (error) {
            console.error(error);
        }
    };
    Game.prototype.returnCardToDeck = function (playersPick) {
        var _this = this;
        try {
            var cards = playersPick.map(function (p) { return p.card; });
            cards.forEach(function (card) {
                _this.gameDeck.push(card);
            });
        }
        catch (error) {
            console.error(error);
        }
    };
    Game.prototype.pickBigginer = function () {
        try {
            if (this.gameDeck === undefined)
                throw new Error("No more Cards to deal");
            var playersPick_1 = [];
            this.setPlayersForDraw(playersPick_1);
            // Sort the playersPick array based on card value (ascending order)
            playersPick_1.sort(comparePlayer);
            this.startIndx = this.players.findIndex(function (p) { return p.player.name === playersPick_1[0].player.name; });
            alert(playersPick_1[0].player.name.toUpperCase() + " you got the higest card, you go first");
            this.currIndx = this.startIndx;
            localStorage.setItem("Game", JSON.stringify(currentGame));
            console.log(playersPick_1);
            this.returnCardToDeck(playersPick_1);
        }
        catch (error) {
            console.error(error);
        }
    };
    Game.prototype.drawnCard = function () {
        try {
            if (this.gameDeck === undefined)
                throw new Error("No more Cards to deal");
            var randomIndx = Math.floor(Math.random() * this.gameDeck.length);
            var Card_1 = this.gameDeck[randomIndx];
            this.gameDeck.splice(randomIndx, 1);
            return Card_1;
        }
        catch (error) {
            console.error(error);
        }
    };
    Game.prototype.backToDeck = function (Card) {
        try {
            this.gameDeck.push(Card);
        }
        catch (error) {
            console.error(error);
        }
    };
    return Game;
}());
function loadFromLocalStorage() {
    var _a, _b;
    try {
        var gameJSON = localStorage.getItem('Game');
        if (gameJSON) {
            var gameObj = JSON.parse(gameJSON);
            var game = new Game(gameObj.players[0].player, gameObj.players[1].player, (_a = gameObj.players[2]) === null || _a === void 0 ? void 0 : _a.player, (_b = gameObj.players[3]) === null || _b === void 0 ? void 0 : _b.player, gameObj.startIndx, gameObj.currIndx, gameObj.gameOver, gameObj.countRouds, gameObj.board);
            game.gameDeck = gameObj.gameDeck;
            return game;
        }
    }
    catch (error) {
        console.error('Error loading game from Local Storage:', error);
    }
}
function comparePlayer(a, b) {
    if (!a.card && !b.card) {
        return 0; // Both cards are undefined, consider them equal
    }
    if (!a.card) {
        return -1; // Only a's card is undefined, place it before b
    }
    if (!b.card) {
        return 1; // Only b's card is undefined, place it before a
    }
    return b.card.value - a.card.value; // Sorting by card value
}
function computeScore(players, winner) {
    try {
        if (!players)
            throw new Error("Game element missing");
        var total_1 = 0;
        players.forEach(function (player) {
            var initialValue = 0;
            var sumWithInitial = player.player.cards.reduce(function (accumulator, currentValue) { return accumulator + currentValue.value; }, initialValue);
            player.score -= initialValue; // winner new to add (+) score
            total_1 += initialValue;
        });
        players[winner].score += total_1;
    }
    catch (error) {
        console.error(error);
    }
}
// before first drop to table
function minimumSum(cardsToBoard) {
    try {
        if (cardsToBoard === undefined || !cardsToBoard)
            throw new Error("No cards");
        var initialValue = 0;
        var sumWithInitial = cardsToBoard.reduce(function (accumulator, currentValue) { return accumulator + currentValue.value; }, initialValue);
        return initialValue < 30 ? false : true;
    }
    catch (error) {
        console.error(error);
    }
}
function checkAddToSerial(cards, card) {
    try {
        if (!cards || !card)
            throw new Error("Missing card");
        var first = (cards[0].value - 1 === card.value);
        var last = (cards[cards.length - 1].value + 1 === card.value);
        var color = (cards[0].color === card.color);
        return (color && (last || first));
    }
    catch (error) {
        console.error(error);
    }
}
// 1,2,3.. 
function checkSerial(cards) {
    try {
        if (!cards)
            throw new Error("No cards");
        var isSequential = cards.slice(0, -1).every(function (card, index) { return (card.value + 1) === cards[index + 1].value; });
        var sameColor = checkColors(cards);
        return isSequential && sameColor;
    }
    catch (error) {
        console.error(error);
    }
}
// same color checking
function checkColors(cards) {
    try {
        if (!cards)
            throw new Error("No cards");
        var colors = new Set(cards.map(function (card) { return card.color; }));
        return colors.size === 1;
    }
    catch (error) {
        console.error(error);
    }
}
//only one show of each color
function diffColors(cards) {
    try {
        var colorsArr_1 = cards.map(function (item) { return item.color; });
        var isDuplicate = colorsArr_1.some(function (item, idx) {
            return colorsArr_1.indexOf(item) != idx;
        });
        var seriaOfColor = false;
        if (cards[0].color !== cards[1].color) {
            seriaOfColor = true;
        }
        if (isDuplicate && seriaOfColor) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (error) {
        console.error(error);
    }
    // }
}
function checkAddToSerie(cards, card) {
    try {
        if (cards === undefined || !cards)
            throw new Error("No cards");
        // if (cards.length < 3) {
        //     // alert("Minimum three cards")
        //     return false;
        // }
        if (cards.findIndex(function (c) { return c.value === card.value; }) === -1) {
            // alert(`${card.value} ${card.color} Not part of serie, different number`);
            return false;
        }
        var concatenatedCards = __spreadArrays(cards, [card]);
        if (!diffColors(concatenatedCards)) {
            // alert(`${card.value} ${card.color} Can't add, already exist`);
            return false;
        }
        return true;
    }
    catch (error) {
        console.error(error);
    }
}
// 1red, 1yellow, 1blue, 1black 
function checkSerie(cards) {
    try {
        if (cards === undefined || !cards)
            throw new Error("No cards");
        if (cards.length < 3) {
            alert("Minimum three cards");
            return false;
        }
        var values = new Set(cards.map(function (card) { return card.value; }));
        return (diffColors(cards) && (values.size === 1));
    }
    catch (error) {
        console.error(error);
    }
}
function compareCards(a, b) {
    if (a.value < b.value) {
        return -1;
    }
    return 1;
}
function compareCardsColor(a, b) {
    if (a.color < b.color) {
        return -1;
    }
    else if (a.color > b.color) {
        return 1;
    }
    else {
        return 0;
    }
}
function splitSeria(existSeria, cardsToAdd) {
    try {
        var temporaryArr_1 = existSeria.concat(cardsToAdd);
        temporaryArr_1.sort(compareCards);
        var startOfNewSeria = temporaryArr_1.findIndex(function (card, index) { return card.value === temporaryArr_1[index + 1].value; }) + 1;
        var indxOfExistSeria = newSerias.findIndex(function (seria) {
            (seria[0] === existSeria[0]) && (seria[1] === existSeria[1]);
        });
        var newSeria1 = temporaryArr_1.slice(0, startOfNewSeria);
        var newSeria2 = temporaryArr_1.slice(startOfNewSeria);
        newSerias.splice(indxOfExistSeria, 1);
        newSerias.push(newSeria1);
        newSerias.push(newSeria2);
        renderToMainBord(newSerias, document.querySelector("#board"));
    }
    catch (error) {
        console.error(error);
    }
}
function addToExist(serie, cardToAdd) {
    try {
        if (serie === undefined)
            throw new Error("No serie cards");
        if (cardToAdd === undefined)
            throw new Error("No card to add");
        serie.sort(compareCards);
        if (checkAddToSerie(serie, cardToAdd)) {
            serie.push(cardToAdd);
            return cardToAdd;
        }
        else {
            if (checkAddToSerial(serie, cardToAdd)) {
                serie.push(cardToAdd);
                alert("added");
                return cardToAdd;
            }
            else {
                alert("Can not be added");
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}
// to implement in class Game - use to shift turns at the end of one game round 
function setBigginerIndx(currGame) {
    try {
        if (currGame.startIndx === currGame.players.length)
            currGame.startIndx = 0;
        else
            currGame.startIndx++;
        currGame.countRounds++;
        localStorage.setItem("Game", JSON.stringify(currGame));
    }
    catch (error) {
        console.error(error);
    }
}
// use to save data -   localStorage.setItem("Game", JSON.stringify(currGame));  
// get game from local storage
function getPlayersFromStorage() {
    try {
        var storageString = localStorage.getItem("Game");
        if (!storageString)
            throw new Error("No such name in local storage");
        //convert string to array of objects
        var storageArray = JSON.parse(storageString);
        //convert array of objects to array of Card | Player
        var players = storageArray.map(function (game) {
            return new Game(game.players[0].player, game.players[1].player, game.players[2].player, game.players[3].player);
        });
        return players;
    }
    catch (error) {
        console.error(error);
    }
}
// input - card:joker, newVal: card.value of replaced card
function setJokerVal(card) {
    try {
        if (card === undefined || !card)
            throw new Error("Missing joker");
        var newVal = Number(prompt("Enter new Value for Joker"));
        var newColor = null;
        while (!newColor) {
            newColor = prompt("Enter red \ yellow \ blue \ black");
        }
        card.value = newVal;
        card.color = newColor;
    }
    catch (error) {
        console.error(error);
    }
}
function getNewDeck() {
    try {
        var deck = getCards();
        var shuffeld = shuffleCards(deck);
        return shuffeld;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
function getCards() {
    try {
        return [new Card(1, "red", "../Images/1red.png", false),
            new Card(2, "red", "../Images/2red.png", false),
            new Card(3, "red", "../Images/3red.png", false),
            new Card(4, "red", "../Images/4red.png", false),
            new Card(5, "red", "../Images/5red.png", false),
            new Card(6, "red", "../Images/6red.png", false),
            new Card(7, "red", "../Images/7red.png", false),
            new Card(8, "red", "../Images/8red.png", false),
            new Card(9, "red", "../Images/9red.png", false),
            new Card(10, "red", "../Images/10red.png", false),
            new Card(11, "red", "../Images/11red.png", false),
            new Card(12, "red", "../Images/12red.png", false),
            new Card(13, "red", "../Images/13red.png", false),
            new Card(1, "red", "../Images/1red.png", false),
            new Card(2, "red", "../Images/2red.png", false),
            new Card(3, "red", "../Images/3red.png", false),
            new Card(4, "red", "../Images/4red.png", false),
            new Card(5, "red", "../Images/5red.png", false),
            new Card(6, "red", "../Images/6red.png", false),
            new Card(7, "red", "../Images/7red.png", false),
            new Card(8, "red", "../Images/8red.png", false),
            new Card(9, "red", "../Images/9red.png", false),
            new Card(10, "red", "../Images/10red.png", false),
            new Card(11, "red", "../Images/11red.png", false),
            new Card(12, "red", "../Images/12red.png", false),
            new Card(13, "red", "../Images/13red.png", false),
            new Card(1, "yellow", "../Images/1yellow.png", false),
            new Card(2, "yellow", "../Images/2yellow.png", false),
            new Card(3, "yellow", "../Images/3yellow.png", false),
            new Card(4, "yellow", "../Images/4yellow.png", false),
            new Card(5, "yellow", "../Images/5yellow.png", false),
            new Card(6, "yellow", "../Images/6yellow.png", false),
            new Card(7, "yellow", "../Images/7yellow.png", false),
            new Card(8, "yellow", "../Images/8yellow.png", false),
            new Card(9, "yellow", "../Images/9yellow.png", false),
            new Card(10, "yellow", "../Images/10yellow.png", false),
            new Card(11, "yellow", "../Images/11yellow.png", false),
            new Card(12, "yellow", "../Images/12yellow.png", false),
            new Card(13, "yellow", "../Images/13yellow.png", false),
            new Card(1, "yellow", "../Images/1yellow.png", false),
            new Card(2, "yellow", "../Images/2yellow.png", false),
            new Card(3, "yellow", "../Images/3yellow.png", false),
            new Card(4, "yellow", "../Images/4yellow.png", false),
            new Card(5, "yellow", "../Images/5yellow.png", false),
            new Card(6, "yellow", "../Images/6yellow.png", false),
            new Card(7, "yellow", "../Images/7yellow.png", false),
            new Card(8, "yellow", "../Images/8yellow.png", false),
            new Card(9, "yellow", "../Images/9yellow.png", false),
            new Card(10, "yellow", "../Images/10yellow.png", false),
            new Card(11, "yellow", "../Images/11yellow.png", false),
            new Card(12, "yellow", "../Images/12yellow.png", false),
            new Card(13, "yellow", "../Images/13yellow.png", false),
            new Card(1, "black", "../Images/1black.png", false),
            new Card(2, "black", "../Images/2black.png", false),
            new Card(3, "black", "../Images/3black.png", false),
            new Card(4, "black", "../Images/4black.png", false),
            new Card(5, "black", "../Images/5black.png", false),
            new Card(6, "black", "../Images/6black.png", false),
            new Card(7, "black", "../Images/7black.png", false),
            new Card(8, "black", "../Images/8black.png", false),
            new Card(9, "black", "../Images/9black.png", false),
            new Card(10, "black", "../Images/10black.png", false),
            new Card(11, "black", "../Images/11black.png", false),
            new Card(12, "black", "../Images/12black.png", false),
            new Card(13, "black", "../Images/13black.png", false),
            new Card(1, "black", "../Images/1black.png", false),
            new Card(2, "black", "../Images/2black.png", false),
            new Card(3, "black", "../Images/3black.png", false),
            new Card(4, "black", "../Images/4black.png", false),
            new Card(5, "black", "../Images/5black.png", false),
            new Card(6, "black", "../Images/6black.png", false),
            new Card(7, "black", "../Images/7black.png", false),
            new Card(8, "black", "../Images/8black.png", false),
            new Card(9, "black", "../Images/9black.png", false),
            new Card(10, "black", "../Images/10black.png", false),
            new Card(11, "black", "../Images/11black.png", false),
            new Card(12, "black", "../Images/12black.png", false),
            new Card(13, "black", "../Images/13black.png", false),
            new Card(1, "blue", "../Images/1blue.png", false),
            new Card(2, "blue", "../Images/2blue.png", false),
            new Card(3, "blue", "../Images/3blue.png", false),
            new Card(4, "blue", "../Images/4blue.png", false),
            new Card(5, "blue", "../Images/5blue.png", false),
            new Card(6, "blue", "../Images/6blue.png", false),
            new Card(7, "blue", "../Images/7blue.png", false),
            new Card(8, "blue", "../Images/8blue.png", false),
            new Card(9, "blue", "../Images/9blue.png", false),
            new Card(10, "blue", "../Images/10blue.png", false),
            new Card(11, "blue", "../Images/11blue.png", false),
            new Card(12, "blue", "../Images/12blue.png", false),
            new Card(13, "blue", "../Images/13blue.png", false),
            new Card(1, "blue", "../Images/1blue.png", false),
            new Card(2, "blue", "../Images/2blue.png", false),
            new Card(3, "blue", "../Images/3blue.png", false),
            new Card(4, "blue", "../Images/4blue.png", false),
            new Card(5, "blue", "../Images/5blue.png", false),
            new Card(6, "blue", "../Images/6blue.png", false),
            new Card(7, "blue", "../Images/7blue.png", false),
            new Card(8, "blue", "../Images/8blue.png", false),
            new Card(9, "blue", "../Images/9blue.png", false),
            new Card(10, "blue", "../Images/10blue.png", false),
            new Card(11, "blue", "../Images/11blue.png", false),
            new Card(12, "blue", "../Images/12blue.png", false),
            new Card(13, "blue", "../Images/13blue.png", false),
            new Card(0, "black", "../Images/Joker_black.png", true),
            new Card(0, "red", "../Images/Joker_red.png", true)
        ];
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
function shuffleCards(cards) {
    try {
        var shuffledDeck = [];
        while (cards.length > 0) {
            var randomIndx = Math.floor(Math.random() * cards.length);
            shuffledDeck.push(cards[randomIndx]);
            cards.splice(randomIndx, 1);
        }
        return shuffledDeck;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
function startNewGame(players) {
    try {
        currentGame = new Game(playerList[0], playerList[1], playerList[2], playerList[3]);
        currentGame.pickBigginer();
        currentGame.countRounds = 0;
        localStorage.setItem("Game", JSON.stringify(currentGame));
        playRound(currentGame);
    }
    catch (error) {
        console.error(error);
    }
}
function uploadBoard(game, board) {
    try {
        if (!board)
            throw new Error("No #board");
        board.innerHTML = "";
        game.board.series.forEach(function (s) {
            board.innerHTML += "<div class=\"seria\" id=\"" + s.id + "\"></div>";
            var space = document.getElementById("" + s.id);
            if (!space)
                throw new Error("no seria to draw on");
            s.cards.forEach(function (card) {
                space.innerHTML += "<div class=\"card\" style=\"background-image: url('" + card.imgUrl + "');\"></div>";
            });
        });
    }
    catch (error) {
        console.error(error);
    }
}
function playRound(game) {
    try {
        if (game === undefined)
            throw new Error("No game");
        var bigginer = game.startIndx;
        var empty = false; //player with empty hands
        currentPlayer = game.players[bigginer].player;
        if (game.board.series.length > 0)
            uploadBoard(game, document.querySelector("#board"));
        deal14Cards(game);
        renderPlayerBord(currentPlayer, document.querySelector("#player"));
    }
    catch (error) {
        console.error(error);
    }
}
var newSerias = [];
var currentSeria = [];
var currentCard;
var indexOfCurrentCard;
function cardsEventListener(player, cards) {
    try {
        cards.forEach(function (element) {
            element.style.borderRadius = '7px';
            var addCard = element.addEventListener("click", function () {
                indexOfCurrentCard = player.cards.findIndex(function (card) { return card.id === element.id; });
                currentCard = player.cards[indexOfCurrentCard];
                if (currentCard !== undefined) {
                    if (element.style.bottom === '30px') {
                        element.style.bottom = '0px';
                        element.style.boxShadow = '';
                        var indexOfCard = currentSeria.findIndex(function (card) { return "" + card.value + card.color === element.id; });
                        currentSeria.splice(indexOfCard, 1);
                    }
                    else {
                        if (currentCard.isJoker)
                            setJokerVal(currentCard);
                        element.style.bottom = '30px';
                        element.style.boxShadow = '0px 0px 5px 3px yellow';
                        currentSeria.push(currentCard);
                    }
                }
            });
        });
    }
    catch (error) {
        console.error(error);
    }
}
function deal14Cards(game) {
    try {
        game.players.forEach(function (p) {
            var numOfCard = 14;
            while (numOfCard > 0) {
                var randomIndx = Math.floor(Math.random() * game.gameDeck.length);
                p.player.cards.push(game.gameDeck[randomIndx]);
                game.gameDeck.splice(randomIndx, 1);
                numOfCard--;
            }
        });
    }
    catch (error) {
        console.error(error);
    }
}
function renderPlayerManu(player, div) {
    try {
        if (!div)
            throw new Error("No #player");
        div.innerHTML = "<button id=\"close\" name=\"close\" onclick=\"hundleOnClick(event)\">close Seria</button>\n        <button id=\"done\" name=\"done\" onclick=\"hundleOnClick(event)\"></button>\n        <button id=\"draw\" name=\"card\" onclick=\"hundleOnClick(event)\">Get Card</button>\n        <button id=\"sortColor\" name=\"sortColor\" onclick=\"hundleOnClick(event)\">Sort By Color</button>\n        <button id=\"sortValue\" name=\"sortValue\" onclick=\"hundleOnClick(event)\">Sort By Value</button>\n        <button id=\"addToSeria\" name=\"addToSeria\" onclick=\"hundleOnClick(event)\">Add to Seria</button>";
        cardsEventListener(player, document.querySelectorAll(".card"));
    }
    catch (error) {
        console.error(error);
    }
}
function renderPlayerBord(player, div) {
    try {
        if (!div)
            throw new Error("No #player");
        var bord_1 = document.querySelector("#cards");
        if (!bord_1)
            throw new Error("No #cards");
        bord_1.innerHTML = "";
        player.cards.forEach(function (card) {
            bord_1.innerHTML += "<div class=\"card\" id = \"" + card.id + "\" style=\"background-image: url('" + card.imgUrl + "');\"></div>";
        });
        bord_1.innerHTML += "<p>Current Player Turn: " + player.name + "</p>";
        renderPlayerManu(player, document.querySelector("#playerAction"));
    }
    catch (error) {
        console.error(error);
    }
}
function setNextPlayer() {
    try {
        if (currentGame === undefined)
            throw new Error("Game is undefined");
        if (currentGame.gameDeck.length === 0) {
            // endOfGame();
        }
        var nextIndx = currentGame.currIndx + 1 === currentGame.players.length ? 0 : currentGame.currIndx + 1;
        currentPlayer = currentGame.players[nextIndx].player;
        currentGame.currIndx = nextIndx;
        renderPlayerBord(currentPlayer, document.querySelector("#player"));
    }
    catch (error) {
        console.error(error);
    }
}
function findWinner(players) {
    try {
        var minIndx_1 = -1;
        var minVal_1 = 1000;
        players.forEach(function (player, indx) {
            var initialValue = 0;
            var sumWithInitial = player.player.cards.reduce(function (accumulator, currentValue) { return accumulator + currentValue.value; }, initialValue);
            if (initialValue < minVal_1) {
                minVal_1 = initialValue;
                minIndx_1 = indx;
            }
        });
        return minIndx_1;
    }
    catch (error) {
        console.error(error);
        return -1;
    }
}
function endOfGame(win, indx) {
    try {
        if (currentGame === undefined)
            throw new Error("Game is undefined");
        if (win === "emptyDeck") {
            indx = findWinner(currentGame.players);
        }
        computeScore(currentGame.players, indx);
        setBigginerIndx(currentGame);
        if (currentGame.countRounds === 4) {
            alert("Four rounds completed game over");
            currentGame.gameOver = true;
        }
        localStorage.setItem("Game", JSON.stringify(currentGame));
        location.href = "../HTML/scoreBoard.html";
    }
    catch (error) {
        console.error(error);
    }
}
function takeCard() {
    try {
        if (currentGame === undefined)
            throw new Error("Game is undefined");
        if (currentGame.gameDeck.length === 0) {
            endOfGame("emptyDeck", currentGame.currIndx);
        }
        var card = currentGame.gameDeck.pop();
        if (card === undefined)
            throw new Error("no card");
        currentPlayer.cards.push(card);
        localStorage.setItem("Game", JSON.stringify(currentGame));
        renderPlayerBord(currentPlayer, document.querySelector("#player"));
        setTimeout(function () {
            setNextPlayer();
        }, 1000);
    }
    catch (error) {
        console.error(error);
    }
}
function removeFromBord(cards) {
    try {
        cards.forEach(function (cardToRemove) {
            var index = currentPlayer.cards.findIndex(function (c) { return c.value === cardToRemove.value && c.color === cardToRemove.color; });
            currentPlayer.cards.splice(index, 1);
        });
        renderPlayerBord(currentPlayer, document.querySelector("#player"));
    }
    catch (error) {
        console.error(error);
    }
}
function clearSerie(cards) {
    try {
        // while (cards.length)
        cards.forEach(function (card) { return cards.pop(); });
        // cards.pop();
    }
    catch (error) {
        console.error(error);
    }
}
function closeSeria() {
    try {
        var temp = [];
        if (currentSeria.length < 3)
            alert("Minimum three cards");
        else {
            currentSeria.sort(compareCards);
            if (checkSerial(currentSeria) || checkSerie(currentSeria)) {
                removeFromBord(currentSeria);
                while (currentSeria.length) {
                    var card = currentSeria.pop();
                    if (card !== undefined)
                        temp.push(card);
                }
                newSerias.push(temp.sort(compareCards));
                // clearSerie(currentSeria);
                currentSeria = [];
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}
function renderToMainBord(cards, boardDiv) {
    try {
        debugger;
        console.dir(currentGame === null || currentGame === void 0 ? void 0 : currentGame.board);
        if (!boardDiv)
            throw new Error("no #board");
        cards.forEach(function (seria) {
            if (currentGame === undefined)
                throw Error("No game");
            var newId = new Date().getTime() - Math.random();
            var html = "<div class=\"seria\" id=\"id-" + newId + "\">\n             ";
            seria.forEach(function (card) {
                html += "<div class=\"card\" style=\"background-image: url('" + card.imgUrl + "');\"></div>";
            });
            html += "</div>";
            boardDiv.innerHTML += html;
            addToBord(currentGame.board, "id-" + newId, seria);
        });
    }
    catch (error) {
        console.error(error);
    }
}
function returnCardsToBord(cardsToReturn, player) {
    try {
        var cards = cardsToReturn.flat(2);
        cardsToReturn.forEach(function (card) {
            while (card.length) {
                var tmpCard = card.pop();
                if (tmpCard !== undefined)
                    player.cards.push(tmpCard);
            }
        });
        renderPlayerBord(player, document.querySelector("#player"));
    }
    catch (error) {
        console.error(error);
    }
}
function checkDone() {
    try {
        debugger;
        if (newSerias[newSerias.length - 1].length > 0) {
            if (!currentPlayer.firstDrop) {
                if (checkSumAtLeast30(newSerias) >= 30) {
                    currentPlayer.firstDrop = true;
                    renderToMainBord(newSerias, document.querySelector("#board"));
                    setNextPlayer();
                }
                else {
                    alert("to drop first cards you need Minimun values of 30 of all cards to drop");
                    returnCardsToBord(newSerias, currentPlayer);
                }
            }
            else {
                renderToMainBord(newSerias, document.querySelector("#board"));
                if (currentPlayer.cards.length == 0) {
                    var pIndex = playerList.findIndex(function (p) { return p.name === currentPlayer.name; });
                    endOfGame("emptyBord", pIndex);
                }
                else
                    setNextPlayer();
            }
        }
    }
    catch (error) {
        console.error(error);
    }
}
function checkSumAtLeast30(serias) {
    try {
        var sumOfCard_1 = 0;
        serias.forEach(function (serie) {
            serie.forEach(function (card) {
                sumOfCard_1 += card.value;
            });
        });
        return sumOfCard_1;
    }
    catch (error) {
        console.error(error);
        return 0;
    }
}
function chooseCardToAdd(serie) {
    try {
        debugger;
        if (currentSeria.length > 1) {
            splitSeria(serie, currentSeria);
        }
        // alert("Pleas choose only one card from your board before adding it to exist")
        else {
            return addToExist(serie, currentSeria[0]);
        }
    }
    catch (error) {
        console.error(error);
    }
}
function convertToCards(cards) {
    try {
        if (currentGame === undefined)
            throw new Error("no gamee");
        var cardsIndx = currentGame.board.series.findIndex(function (serie) { return serie.id === cards.id; });
        var cArr = currentGame.board.series[cardsIndx].cards.map(function (card) { return (__assign({}, card)); });
        return cArr;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
function removeCardfromPlayer(card) {
    try {
        debugger;
        var indx = currentPlayer.cards.findIndex(function (c) { return c.id === card.id; });
        if (indx !== -1) {
            currentPlayer.cards.splice(indx, 1);
            currentSeria.pop();
            renderPlayerBord(currentPlayer, document.querySelector("#player"));
        }
    }
    catch (error) {
        console.error(error);
    }
}
function renderAddCardSerie(serie, card) {
    try {
        var indx = currentGame === null || currentGame === void 0 ? void 0 : currentGame.board.series.findIndex(function (s) { return s.id === serie.id; });
        var c = removeCardfromPlayer(card);
        if (indx !== -1 && indx !== undefined) {
            currentGame === null || currentGame === void 0 ? void 0 : currentGame.board.series[indx].cards.push(card);
            var div_1 = document.getElementById("" + serie.id);
            if (!div_1)
                throw new Error("No serie div");
            div_1.innerHTML = "";
            currentGame === null || currentGame === void 0 ? void 0 : currentGame.board.series[indx].cards.sort(compareCards);
            currentGame === null || currentGame === void 0 ? void 0 : currentGame.board.series[indx].cards.forEach(function (card) {
                div_1.innerHTML += "<div class=\"card\" style=\"background-image: url('" + card.imgUrl + "');\"></div>";
            });
        }
    }
    catch (error) {
        console.error(error);
    }
}
function setExistListenner(series) {
    try {
        if (currentPlayer.firstDrop) {
            series.forEach(function (serie) {
                serie.addEventListener("mouseenter", function () {
                    debugger;
                    var turTocard = convertToCards(serie);
                    var card = chooseCardToAdd(turTocard);
                    if (card !== undefined) {
                        renderAddCardSerie(serie, card);
                        var more = confirm("Pass turn?");
                        if (more)
                            setNextPlayer();
                    }
                }); // Pass an anonymous function to addEventListener
            });
        }
        currentSeria = [];
    }
    catch (error) {
        console.error(error);
    }
}
function startAddToExist() {
    try {
        var mainBoard = document.querySelectorAll(".seria");
        setExistListenner(mainBoard);
    }
    catch (error) {
        console.error;
    }
}
function hundleOnClick(ev) {
    try {
        switch (ev.target.name) {
            case "close":
                closeSeria();
                break;
            case "done":
                checkDone();
                break;
            case "sortColor":
                sortByColor();
                break;
            case "sortValue":
                sortByValue();
                break;
            case "card":
                takeCard();
                break;
            case "addToSeria":
                startAddToExist();
                break;
        }
    }
    catch (error) {
        console.error(error);
    }
}
function sortByColor() {
    try {
        currentPlayer.cards.sort(compareCardsColor);
        renderPlayerBord(currentPlayer, document.querySelector("#player"));
    }
    catch (error) {
        console.error(error);
    }
}
function sortByValue() {
    try {
        currentPlayer.cards.sort(compareCards);
        renderPlayerBord(currentPlayer, document.querySelector("#player"));
    }
    catch (error) {
        console.error(error);
    }
}
// GAME
debugger;
var currentPlayer;
var playerList = getplayersListFromStorage();
var currentGame = loadFromLocalStorage();
if (currentGame === undefined || currentGame.gameOver) {
    if (playerList.length > 1) {
        startNewGame(playerList);
    }
    else
        location.href = "../HTML/index.html";
}
else {
    playRound(currentGame);
}
