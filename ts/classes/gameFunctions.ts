function computeScore(players: { player: Player, score: number }[]) {
    try {
        if (!players) throw new Error("Game element missing");
        players.forEach(player => {
            const initialValue = 0;
            const sumWithInitial = player.player.cards.reduce(
                (accumulator, currentValue) => accumulator + currentValue.value,
                initialValue
            );
            player.score -= initialValue; // winner new to add (+) score
        });
    } catch (error) {
        console.error(error)
    }
}

// before first drop to table
function minimumSum(cardsToBoard: Card[]): boolean | undefined {
    try {
        if (cardsToBoard === undefined || !cardsToBoard) throw new Error("No cards");
        const initialValue = 0;
        const sumWithInitial = cardsToBoard.reduce(
            (accumulator, currentValue) => accumulator + currentValue.value,
            initialValue
        );
        return initialValue < 30 ? false : true;
    } catch (error) {
        console.error(error)
    }
}

function checkAddToSerial(cards: Card[], card: Card): boolean | undefined {
    try {
        if (!cards || !card) throw new Error("Missing card");
        const first = (cards[0].value - 1 === card.value);
        const last = (cards[cards.length - 1].value + 1 === card.value);
        const color = (cards[0].color === card.color);
        return (color && (last || first))

    } catch (error) {
        console.error(error)
    }
}

// 1,2,3.. 
function checkSerial(cards: Card[]): boolean | undefined {
    try {
        if (!cards) throw new Error("No cards");
        if (cards.length < 3) {
            alert("Minimum three cards")
            return false;
        }
        const isSequential = cards.slice(0, -1).every((card, index) => (card.value + 1) === cards[index + 1].value);
        const sameColor = checkColors(cards);
        return isSequential && sameColor;
    } catch (error) {
        console.error(error)
    }
}

// same color checking
function checkColors(cards: Card[]): boolean | undefined {
    try {
        if (!cards) throw new Error("No cards");
        const colors = new Set(cards.map((card) => card.color));
        return colors.size === 1
    } catch (error) {
        console.error(error)
    }
}

//only one show of each color
function diffColors(cards: Card[]) {
    try {
        const colors = new Set(cards.map((card) => card.color));
        return (colors.size === 4 || colors.size === 3)

    } catch (error) {
        console.error(error);
    }
    // }
}


function checkAddToSerie(cards: Card[], card: Card): boolean | undefined {
    try {
        if (cards === undefined || !cards) throw new Error("No cards");
        if (cards.length < 3) {
            alert("Minimum three cards")
            return false;
        }
        if (cards.findIndex(c => c.value === card.value) === -1) {
            alert(`${card.value} ${card.color} Not part of serie, different number`);
            return false;
        }
        const concatenatedCards = [...cards, card];
        if (!diffColors(concatenatedCards)) {
            alert(`${card.value} ${card.color} Can't add, already exist`);
            return false;
        }
        return true;
    } catch (error) {
        console.error(error)
    }
}

// 1red, 1yellow, 1blue, 1black 
function checkSerie(cards: Card[]): boolean | undefined {
    try {
        if (cards === undefined || !cards) throw new Error("No cards");
        if (cards.length < 3) {
            alert("Minimum three cards")
            return false;
        }
        const values = new Set(cards.map((card) => card.value));
        return (diffColors(cards) && (values.size === 1));
    } catch (error) {
        console.error(error)
    }
}

function compareCards(a: Card, b: Card) {    // sorting by cards value
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
        if (checkAddToSerie(serie, cardToAdd)) serie.push(cardToAdd);
        else {
            if (checkAddToSerial(serie, cardToAdd)) {
                serie.push(cardToAdd);
                serie.sort(compareCards);
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
function setJokerVal(card: Card, newVal: number) {
    try {
        if (card === undefined || !card) throw new Error("Missing joker");
        card.value = newVal;
    } catch (error) {
        console.error(error)
    }
}