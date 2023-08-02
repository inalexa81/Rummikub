var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
function addToExist(serie, cardToAdd) {
    try {
        debugger;
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
function setJokerVal(card, newVal) {
    try {
        if (card === undefined || !card)
            throw new Error("Missing joker");
        card.value = newVal;
    }
    catch (error) {
        console.error(error);
    }
}
