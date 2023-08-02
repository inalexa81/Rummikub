class Card {
    constructor(public value: number, public color: string, public imgUrl: string, public isJoker: boolean) {
    }
}

class Player {
    cards: Card[] = [];
    firstDrop: boolean;
    constructor(public name: string, firstDrop?: boolean | undefined) {
        this.firstDrop = (firstDrop !== undefined) ? firstDrop : false;

    }
}


const gameDeck: Card[] | undefined = getNewDeck();


class Game {
    gameDeck: Card[] | undefined;
    startIndx: number;
    currIndx: number;
    players: { player: Player, score: number }[] = [];
    constructor(player1: Player,
        player2: Player,
        player3?: Player,
        player4?: Player,
        startIndx?: number | undefined,
        currIndx?: number | undefined) {
        debugger;
        this.gameDeck = getNewDeck();
        this.players.push({ player: player1, score: 0 });
        this.players.push({ player: player2, score: 0 });
        if (player3 !== undefined) this.players.push({ player: player3, score: 0 });
        if (player4 !== undefined) this.players.push({ player: player4, score: 0 });
        this.startIndx = (startIndx !== undefined) ? startIndx : this.startIndx;
        this.currIndx = (currIndx !== undefined) ? currIndx : this.currIndx;

    }

    setPlayersForDraw(playersPick: { player: Player, card: Card | undefined }[]) {
        try {
            this.players.forEach(p => {
                playersPick.push({ player: { ...p.player }, card: this.drawnCard() })
            })

        } catch (error) {
            console.error(error)
        }
    }

    returnCardToDeck(playersPick: { player: Player, card: Card }[]) {
        try {
            const cards = playersPick.map((p) => p.card);
            cards.forEach((card) => {
                this.gameDeck?.push(card);
            });

        } catch (error) {
            console.error(error)
        }
    }

    pickBigginer() {
        try {
            if (this.gameDeck === undefined) throw new Error("No more Cards to deal")
            const playersPick: { player: Player, card: Card }[] = [];
            this.setPlayersForDraw(playersPick);
            // Sort the playersPick array based on card value (ascending order)
            playersPick.sort(comparePlayer);
            this.startIndx = this.players.findIndex(p => p.player.name === playersPick[0].player.name);
            alert(`${playersPick[0].player.name.toUpperCase()} you got the higest, you go first`);
            console.log(playersPick);
            this.returnCardToDeck(playersPick);
            // // Now the playersPick array is sorted based on card value
            // console.log(playersPick);
            // console.log(this.gameDeck);

        } catch (error) {
            console.error(error)
        }
    }

    drawnCard(): Card | undefined {
        try {
            if (this.gameDeck === undefined) throw new Error("No more Cards to deal")
            const randomIndx = Math.floor(Math.random() * this.gameDeck.length);
            const Card: Card = this.gameDeck[randomIndx];
            this.gameDeck.splice(randomIndx, 1);
            return Card;
        } catch (error) {
            console.error(error)
        }
    }

    backToDeck(Card: Card) {
        try {
            gameDeck?.push(Card);
        } catch (error) {
            console.error(error)
        }
    }
}

function comparePlayer(a: { player: Player, card: Card | undefined }, b: { player: Player, card: Card | undefined }) {
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
