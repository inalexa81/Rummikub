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
var gameDeck = getNewDeck();
var Game = /** @class */ (function () {
    function Game(player1, player2, player3, player4, startIndx, currIndx) {
        this.players = [];
        debugger;
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
                var _a;
                (_a = _this.gameDeck) === null || _a === void 0 ? void 0 : _a.push(card);
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
            gameDeck === null || gameDeck === void 0 ? void 0 : gameDeck.push(Card);
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
    return a.card.value - b.card.value; // Sorting by card value
}
