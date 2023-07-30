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
    Game.prototype.pickBigginer = function () {
        var _this = this;
        try {
            if (this.gameDeck === undefined)
                throw new Error("No more Cards to deal");
            var playersPick_1 = [];
            this.players.forEach(function (p) {
                playersPick_1.push({ player: __assign({}, p.player), card: _this.drawnCard() });
            });
            // Sort the playersPick array based on card value (ascending order)
            playersPick_1.sort(function (a, b) {
                if (a.card && b.card) {
                    if (a.card.isJoker)
                        return 1;
                    if (b.card.isJoker)
                        return 1;
                    return b.card.value - a.card.value;
                }
                // Move any undefined card to the end (optional)
                return a.card ? -1 : 1;
            });
            this.startIndx = this.players.findIndex(function (p) { return p.player.name === playersPick_1[0].player.name; });
            alert(playersPick_1[0].player.name.toUpperCase() + " you got the higest, you go first");
            console.log(playersPick_1);
            playersPick_1.forEach(function (p) {
                var _a;
                debugger;
                var card = __assign({}, p);
                var indx = playersPick_1.findIndex(function (player) { return player.player.name === p.player.name; });
                // playersPick.splice(indx,1);
                if (card === undefined)
                    throw new Error("");
                (_a = _this.gameDeck) === null || _a === void 0 ? void 0 : _a.push(card === null || card === void 0 ? void 0 : card.card);
            });
            // Now the playersPick array is sorted based on card value
            console.log(playersPick_1);
            console.log(this.gameDeck);
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
