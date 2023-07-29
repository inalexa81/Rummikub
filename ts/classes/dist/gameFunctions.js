function computeScore(players) {
    try {
        if (!players)
            throw new Error("Game element missing");
        players.forEach(function (player) {
            var sum = 0;
            player.player.cards.forEach(function (card) {
                sum += card.value;
            });
            player.score -= sum;
        });
        //setToLocalStorage();
        //move to score window? href
    }
    catch (error) {
        console.error(error);
    }
}
function minimumSum(cardsToBoard) {
    try {
        if (cardsToBoard === undefined || !cardsToBoard)
            throw new Error("No cards");
        var sum_1 = 0;
        cardsToBoard.forEach(function (card) {
            sum_1 += card.value;
        });
        return sum_1 < 30 ? false : true;
    }
    catch (error) {
        console.error(error);
    }
}
function checkSerial(cards, card) {
    try {
        if (cards === undefined || !cards)
            throw new Error("No cards");
        if (cards.length < 3) {
            alert("Minimum three cards");
            return false;
        }
        if (card === undefined || !card) {
            for (var i = 0; i < cards.length - 1; i++) {
                if ((cards[i].value + 1) !== cards[i + 1].value)
                    return false;
            }
        }
        else {
            if (cards[0].value - 1 !== card.value && cards[cards.length].value + 1 !== card.value)
                return false;
        }
        return true;
    }
    catch (error) {
        console.error(error);
    }
}
function checkColors(cards, card) {
    try {
        if (cards === undefined || !cards)
            throw new Error("No cards");
        if (cards.length < 3) {
            alert("Minimum three cards");
            return false;
        }
        if (card === undefined || !card) {
            for (var i = 0; i < cards.length - 1; i++) {
                if (cards[i].color !== cards[i + 1].color)
                    return false;
            }
        }
        else {
            if (cards[0].color !== card.color)
                return false;
        }
        return true;
    }
    catch (error) {
        console.error(error);
    }
}
function checkserie(cards, card) {
    try {
        if (cards === undefined || !cards)
            throw new Error("No cards");
        if (cards.length < 3) {
            alert("Minimum three cards");
            return false;
        }
        if (card === undefined || !card) {
            var colors_1 = [{ color: "red", set: true },
                { color: "blue", set: true },
                { color: "yellow", set: true },
                { color: "black", set: true }];
            cards.forEach(function (crd) {
                var color = colors_1.find(function (c) { return c.color === crd.color; });
                if (color === undefined)
                    throw new Error("No such color");
                if (!color.set)
                    return false;
                color.set = false;
            });
        }
        else {
            cards.forEach(function (c) {
                if (c.color === card.color)
                    return false;
            });
        }
        return true;
    }
    catch (error) {
        console.error(error);
    }
}
