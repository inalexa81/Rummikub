


const p: { player: Player, score: number }[] = [{ player: new Player("red"), score: 0 },
{ player: new Player("red2"), score: 0 },
{ player: new Player("red3"), score: 0 },
{ player: new Player("red4"), score: 0 }]

p[0].player.cards = [{ color: "red", value: 3, imgUrl: " string", isJoker: false },
{ color: "red", value: 4, imgUrl: " string", isJoker: false },
{ color: "red", value: 5, imgUrl: " string", isJoker: false },
{ color: "red", value: 6, imgUrl: " string", isJoker: false },
{ color: "red", value: 7, imgUrl: " string", isJoker: false },
{ color: "red", value: 8, imgUrl: " string", isJoker: false },]

p[1].player.cards = [{ color: "red", value: 3, imgUrl: " string", isJoker: false },
{ color: "red", value: 4, imgUrl: " string", isJoker: false },
{ color: "red", value: 2, imgUrl: " string", isJoker: false },
{ color: "red", value: 6, imgUrl: " string", isJoker: false },
{ color: "red", value: 3, imgUrl: " string", isJoker: false },
{ color: "red", value: 8, imgUrl: " string", isJoker: false },]

p[2].player.cards = [{ color: "red", value: 3, imgUrl: " string", isJoker: false },
{ color: "red", value: 1, imgUrl: " string", isJoker: false },
{ color: "red", value: 5, imgUrl: " string", isJoker: false },
{ color: "red", value: 6, imgUrl: " string", isJoker: false },
{ color: "red", value: 12, imgUrl: " string", isJoker: false },
{ color: "red", value: 8, imgUrl: " string", isJoker: false },]

p[3].player.cards = [{ color: "red", value: 3, imgUrl: " string", isJoker: false },
{ color: "red", value: 11, imgUrl: " string", isJoker: false },
{ color: "red", value: 5, imgUrl: " string", isJoker: false },
{ color: "red", value: 12, imgUrl: " string", isJoker: false },
{ color: "red", value: 7, imgUrl: " string", isJoker: false },
    { color: "red", value: 8, imgUrl: " string", isJoker: false },]



function computeScore(players: { player: Player, score: number }[]) {
    try {
        if (!players) throw new Error("Game element missing");
        players.forEach(player => {
            let sum: number = 0;
            player.player.cards.forEach((card) => {
                sum += card.value;
            });
            player.score -= sum;
        });
        //setToLocalStorage();
        //move to score window? href
    } catch (error) {
        console.error(error)
    }
}

function minimumSum(cardsToBoard: Card[]): boolean | undefined {
    try {
        if (cardsToBoard === undefined || !cardsToBoard) throw new Error("No cards");
        let sum = 0;
        cardsToBoard.forEach(card => {
            sum += card.value;
        })
        return sum < 30 ? false : true;
    } catch (error) {
        console.error(error)
    }
}

function checkSerial(cards: Card[], card: Card): boolean | undefined {
    try {
        if (cards === undefined || !cards) throw new Error("No cards");
        if (cards.length < 3) {
            alert("Minimum three cards")
            return false;
        }
        if (card === undefined || !card) {
            for (let i = 0; i < cards.length - 1; i++) {
                if ((cards[i].value + 1) !== cards[i + 1].value) return false;
            }
        }
        else {
            if (cards[0].value - 1 !== card.value && cards[cards.length].value + 1 !== card.value)
                return false;
        }
        return true;
    } catch (error) {
        console.error(error)
    }
}

function checkColors(cards: Card[], card: Card): boolean | undefined {
    try {
        if (cards === undefined || !cards) throw new Error("No cards");
        if (cards.length < 3) {
            alert("Minimum three cards")
            return false;
        }
        if (card === undefined || !card) {
            for (let i = 0; i < cards.length - 1; i++) {
                if (cards[i].color !== cards[i + 1].color) return false;
            }
        }
        else {
            if (cards[0].color !== card.color)
                return false;
        }
        return true;
    } catch (error) {
        console.error(error)
    }
}

function checkserie(cards: Card[], card: Card): boolean | undefined {
    try {
        if (cards === undefined || !cards) throw new Error("No cards");
        if (cards.length < 3) {
            alert("Minimum three cards")
            return false;
        }
        if (card === undefined || !card) {
            const colors: { color: string, set: boolean }[] = [{ color: "red", set: true },
            { color: "blue", set: true },
            { color: "yellow", set: true },
            { color: "black", set: true }]
            cards.forEach(crd => {
                const color = colors.find(c => c.color === crd.color)
                if (color === undefined) throw new Error("No such color");
                if (!color.set)
                    return false;
                color.set = false;
            })
        }
        else {
            cards.forEach(c => {
                if (c.color === card.color) return false;
            })
        }
        return true;
    } catch (error) {
        console.error(error)
    }
}

console.log(p)
computeScore(p);
console.log(p)
