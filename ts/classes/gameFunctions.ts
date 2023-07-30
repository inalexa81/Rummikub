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
    } catch (error) {
        console.error(error)
    }
}

// before first drop to table
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

// 1,2,3.. 
function checkSerial(cards: Card[], card: Card | null): boolean | undefined {
    try {
        if (cards === undefined || !cards) throw new Error("No cards");
        if (cards.length < 3) {
            alert("Minimum three cards")
            return false;
        }

        if (!card) {
            for (let i = 0; i < cards.length - 1; i++) {
                if ((cards[i].value + 1) !== cards[i + 1].value) return false;
            }
        }
        else {
            if (cards[0].value - 1 !== card.value && cards[cards.length - 1].value + 1 !== card.value)
                return false;
        }
        return true;
    } catch (error) {
        console.error(error)
    }
}

// same color checking
function checkColors(cards: Card[], card: Card | null): boolean | undefined {
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


// 1red, 1yellow, 1blue, 1black 
function checkserie(cards: Card[], card: Card | null): boolean | undefined {
    try {
        if (cards === undefined || !cards) throw new Error("No cards");
        if (cards.length < 3) {
            alert("Minimum three cards")
            return false;
        }
        if (card === undefined || !card) {
            if (cards.length > 3) {
                alert("Max four cards, can not add")
                return false;
            }
            const colors: { color: string, set: boolean }[] = [{ color: "red", set: true },
            { color: "blue", set: true },
            { color: "yellow", set: true },
            { color: "black", set: true }]
            const val = cards[0].value;
            for (let i = 0; i < cards.length; i++) {
                const color = colors.find(c => c.color === cards[i].color)
                if (color === undefined) throw new Error("No such color");
                if (val !== cards[i].value) {
                    alert(`${cards[i].value} ${cards[i].color} not part of serie, different number`);
                    return false;
                }
                if (!color.set) {
                    alert(`${cards[i].value} ${cards[i].color} already exist, can not add`);
                    return false;
                }
                color.set = false;
            }
        }
        else {
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].color === card.color) {
                    alert(`${card.value} ${card.color} already exist, can not add`);
                    return false;
                }
                if (cards[i].value !== card.value) {
                    alert(`${card.value} ${card.color} not part of serie, different number`);
                    return false;
                }
            }
        }
        return true;
    } catch (error) {
        console.error(error)
    }
}

function compare(a: Card, b: Card) {    // sorting by cards value
    if (a.value < b.value) {
        return -1;
    }
    return 1;
}


function addToExist(serie: Card[], cardToAdd: Card) {  // when adding card to an exsit serie on bord
    try {
        debugger;
        if (serie === undefined) throw new Error("No serie cards");
        if (cardToAdd === undefined) throw new Error("No card to add");
        if (checkserie(serie, cardToAdd)) {
            serie.push(cardToAdd);
            console.dir(serie)
        }
        else {
            if (checkColors(serie, cardToAdd) && checkSerial(serie, cardToAdd)) {
                serie.push(cardToAdd);
                serie.sort(compare);
                console.dir(serie)
            }
        }
    } catch (error) {
        console.error(error)
    }
}

// to implement in class Game - use to shift turns at the end of one game round 
function setBigginerIndx(currGame: Game) {
    try {
        if (currGame.startIndx === currGame.players.length)
            currGame.startIndx = 0;
        else
            currGame.startIndx++;
        localStorage.setItem("Game", JSON.stringify(currGame));
    } catch (error) {
        console.error(error)
    }
}

// use to save data -   localStorage.setItem("Game", JSON.stringify(currGame));  
// get game from local storage
function getPlayersFromStorage(): Game | undefined {
    try {

        const storageString = localStorage.getItem(`Game`);
        if (!storageString) throw new Error("No such name in local storage");
        //convert string to array of objects
        const storageArray = JSON.parse(storageString);
        //convert array of objects to array of Card | Player
        const players: Game = storageArray.map((game: Game) => {

            return new Game(
                game.players[0].player,
                game.players[1].player,
                game.players[2].player,
                game.players[3].player,
            );
        });
        return players;

    } catch (error) {
        console.error(error)
    }

}


// input - card:joker, newVal: card.value of replaced card
function setJokerVal(card: Card, newVal:number) {
    try {
        if (card === undefined || !card) throw new Error("Missing joker");
        card.value = newVal;
    } catch (error) {
        console.error(error)
    }
}