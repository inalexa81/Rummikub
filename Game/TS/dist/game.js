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
    function Card(value, color, imgUrl, isJoker) {
        this.value = value;
        this.color = color;
        this.imgUrl = imgUrl;
        this.isJoker = isJoker;
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
var i = 0;
var Square = /** @class */ (function () {
    function Square(isOccupied, imgUrl, value, color) {
        this.isOccupied = isOccupied;
        this.imgUrl = imgUrl;
        this.value = value;
        this.color = color;
        this.id = i;
        i++;
    }
    Square.prototype.setOccupiedAndCardProperties = function (card) {
        try {
            this.isOccupied = true;
            this.imgUrl = card.imgUrl;
            this.color = card.color;
            this.value = card.value;
        }
        catch (error) {
            console.error(error);
        }
    };
    return Square;
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
var Game = /** @class */ (function () {
    function Game(player1, player2, player3, player4, startIndx, currIndx) {
        this.players = [];
        this.gameDeck = getNewDeck();
        this.players.push({ player: player1, score: 0 });
        this.players.push({ player: player2, score: 0 });
        if (player3 !== undefined)
            this.players.push({ player: player3, score: 0 });
        if (player4 !== undefined)
            this.players.push({ player: player4, score: 0 });
        this.startIndx = (startIndx !== undefined) ? startIndx : this.startIndx;
        this.currIndx = (currIndx !== undefined) ? currIndx : this.currIndx;
    }
    Game.prototype.setPlayersForDraw = function (playersPick) {
        var _this = this;
        try {
            this.players.forEach(function (p) {
                playersPick.push({ player: __assign({}, p.player), card: _this.drawnCard() });
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
            alert(playersPick_1[0].player.name.toUpperCase() + " you got the higest, you go first");
            this.currIndx = this.startIndx;
            console.log(playersPick_1);
            this.returnCardToDeck(playersPick_1);
            // // Now the playersPick array is sorted based on card value
            // console.log(playersPick);
            // console.log(this.gameDeck);
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
function computeScore(players) {
    try {
        if (!players)
            throw new Error("Game element missing");
        players.forEach(function (player) {
            var initialValue = 0;
            var sumWithInitial = player.player.cards.reduce(function (accumulator, currentValue) { return accumulator + currentValue.value; }, initialValue);
            player.score -= initialValue; // winner new to add (+) score
        });
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
        if (cards.length < 3) {
            alert("Minimum three cards");
            return false;
        }
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
        var colors = new Set(cards.map(function (card) { return card.color; }));
        return (colors.size === 4 || colors.size === 3);
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
        if (cards.length < 3) {
            alert("Minimum three cards");
            return false;
        }
        if (cards.findIndex(function (c) { return c.value === card.value; }) === -1) {
            alert(card.value + " " + card.color + " Not part of serie, different number");
            return false;
        }
        var concatenatedCards = __spreadArrays(cards, [card]);
        if (!diffColors(concatenatedCards)) {
            alert(card.value + " " + card.color + " Can't add, already exist");
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
function addToExist(serie, cardToAdd) {
    try {
        if (serie === undefined)
            throw new Error("No serie cards");
        if (cardToAdd === undefined)
            throw new Error("No card to add");
        if (checkAddToSerie(serie, cardToAdd))
            serie.push(cardToAdd);
        else {
            if (checkAddToSerial(serie, cardToAdd)) {
                serie.push(cardToAdd);
                serie.sort(compareCards);
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
var currentGame;
function startGame(players) {
    try {
        currentGame = new Game(playerList[0], playerList[1], playerList[2], playerList[3]);
        currentGame.pickBigginer();
        var countRouds = 4;
        playRound(currentGame);
    }
    catch (error) {
        console.error(error);
    }
}
function playRound(game) {
    try {
        var bigginer = game.startIndx;
        var empty = false; //player with empty hands
        currentPlayer = game.players[bigginer].player;
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
                indexOfCurrentCard = player.cards.findIndex(function (card) { return "" + card.value + card.color === element.id; });
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
                    console.log(currentSeria);
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
        div.innerHTML = "<button name=\"close\" onclick=\"hundleOnClick(event)\">close Seria</button>\n        <button name=\"done\" onclick=\"hundleOnClick(event)\">Done</button>\n        <button name=\"card\" onclick=\"hundleOnClick(event)\">Get Card</button>\n        <button name=\"sortColor\" onclick=\"hundleOnClick(event)\">Sort By Color</button>\n        <button name=\"sortValue\" onclick=\"hundleOnClick(event)\">Sort By Value</button>";
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
            bord_1.innerHTML += "<div class=\"card\" id = \"" + card.value + card.color + "\" style=\"background-image: url('" + card.imgUrl + "');\"></div>";
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
function takeCard() {
    try {
        debugger;
        var card = currentGame.gameDeck.pop();
        if (card === undefined)
            throw new Error("no card");
        currentPlayer.cards.push(card);
        localStorage.setItem("Game", JSON.stringify(currentGame));
        renderPlayerBord(currentPlayer, document.querySelector("#player"));
        setTimeout(function () {
            setNextPlayer();
        }, 2000);
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
        cards.length = 0;
    }
    catch (error) {
        console.error(error);
    }
}
function closeSeria() {
    try {
        debugger;
        if (checkSerial(currentSeria) || checkSerie(currentSeria)) {
            newSerias.push(__assign({}, currentSeria));
            removeFromBord(currentSeria);
            clearSerie(currentSeria);
        }
    }
    catch (error) {
        console.error(error);
    }
}
function renderToMainBord(cards, board) {
    try {
        debugger;
        if (!board)
            throw new Error("no #board");
        cards.forEach(function (seria) {
            var html = "<div>\n             ";
            seria.forEach(function (card) {
                html += "<div class=\"card\" style=\"background-image: url('" + card.imgUrl + "');\"></div>";
            });
            html += "</div>";
        });
    }
    catch (error) {
        console.error(error);
    }
}
function returnCardsToBord(cardsToReturn, player) {
    try {
        var cards = cardsToReturn.flat();
        debugger;
    }
    catch (error) {
        console.error(error);
    }
}
function checkDone() {
    try {
        debugger;
        if (!currentPlayer.firstDrop) {
            if (checkSumAtLeast30(newSerias) >= 30) {
                currentPlayer.firstDrop = true;
                renderToMainBord(newSerias, document.querySelector("#board"));
            }
            else {
                returnCardsToBord(newSerias, currentPlayer);
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
        var checking = serias.flat();
        checking.forEach(function (card) { return sumOfCard_1 += card.value; });
        return sumOfCard_1;
    }
    catch (error) {
        console.error(error);
        return 0;
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
var currentPlayer;
var playerList = getplayersListFromStorage();
if (playerList.length > 1) {
    startGame(playerList);
}
