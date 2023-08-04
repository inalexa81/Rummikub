
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
let i = 0;

class Square {
    id: number
    constructor(public isOccupied: boolean, public imgUrl?: string, public value?: number, public color?: string) {
        this.id = i
        i++
    }

    setOccupiedAndCardProperties(card: Card) {
        try {
            this.isOccupied = true
            this.imgUrl = card.imgUrl
            this.color = card.color
            this.value = card.value
        } catch (error) {
            console.error(error)
        }
    }
}

function getplayersListFromStorage(): Player[] {
    try {
        
        const storageString = localStorage.getItem(`playerList`);
        if (!storageString) throw new Error("No such name in local storage");
        //convert string to array of objects
        const storageArray = JSON.parse(storageString);
        //convert array of objects to array of Card | Player
        const players: Player[] = storageArray.map((p: Player) => {
            return new Player(
                p.name
            )
        });
        return players;

    } catch (error) {
        console.error(error)
        return [];
    }

}

class Game {
    gameDeck: Card[];
    startIndx: number;
    currIndx: number;
    players: { player: Player, score: number }[] = [];
    constructor(player1: Player,
        player2: Player,
        player3?: Player,
        player4?: Player,
        startIndx?: number | undefined,
        currIndx?: number | undefined) {
        
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
                this.gameDeck.push(card);
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
            this.currIndx = this.startIndx;
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
            this.gameDeck.push(Card);
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
    return b.card.value - a.card.value; // Sorting by card value
}
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

function compareCardsColor(a: Card, b: Card) {    // sorting by cards value
    
    if (a.color < b.color) {
        return -1;
    } else if (a.color > b.color) {
        return 1;
    } else {
        return 0;
    }
}


function addToExist(serie: Card[], cardToAdd: Card) {  // when adding card to an exsit serie on bord
    try {
        
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
function setJokerVal(card: Card) {
    try {
        if (card === undefined || !card) throw new Error("Missing joker");
        const newVal = Number(prompt("Enter new Value for Joker"));
        let newColor:string | null = null;
        while (!newColor) {
            newColor = prompt("Enter red \ yellow \ blue \ black");
        }
        card.value = newVal;
        card.color = newColor;
    } catch (error) {
        console.error(error)
    }
}

function getNewDeck(): Card[] {
    try {
        const deck = getCards();
        const shuffeld = shuffleCards(deck);
        return shuffeld
    } catch (error) {
        console.error(error)
        return []
    }
}

function getCards(): Card[] {
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
        ]

    } catch (error) {
        console.error(error)
        return []
    }
}

function shuffleCards(cards: Card[]): Card[] {
    try {
        const shuffledDeck: Card[] = [];
        while (cards.length > 0) {
            const randomIndx = Math.floor(Math.random() * cards.length);
            shuffledDeck.push(cards[randomIndx]);
            cards.splice(randomIndx, 1);
        }
        return shuffledDeck;
    } catch (error) {
        console.error(error)
        return []
    }

}
let currentGame: Game;
function startGame(players: Player[]) {
    try {
        currentGame = new Game(playerList[0], playerList[1], playerList[2], playerList[3]);
        currentGame.pickBigginer();
        let countRouds = 4;
        playRound(currentGame);
    } catch (error) {
        console.error(error)
    }

}

function playRound(game: Game) {
    try {
        
        let bigginer = game.startIndx;
        let empty = false; //player with empty hands
        currentPlayer = game.players[bigginer].player;
        deal14Cards(game);
        renderPlayerBord(currentPlayer, document.querySelector("#player"));
    } catch (error) {
        console.error(error)
    }
}
const newSerias: Card[][] = []
const currentSeria: Card[] = []
let currentCard: Card;
let indexOfCurrentCard: number

function cardsEventListener(player: Player, cards: NodeListOf<HTMLDivElement>) {
    try {
        
        cards.forEach(element => {
            element.style.borderRadius = '7px'
            const addCard = element.addEventListener("click", function () {
                indexOfCurrentCard = player.cards.findIndex(card => `${card.value}${card.color}` === element.id)
                currentCard = player.cards[indexOfCurrentCard]
                if (currentCard !== undefined) {
                    if (element.style.bottom === '30px') {
                        element.style.bottom = '0px'
                        element.style.boxShadow = ''
                        const indexOfCard = currentSeria.findIndex(card => `${card.value}${card.color}` === element.id)
                        currentSeria.splice(indexOfCard, 1)

                    } else {
                        if (currentCard.isJoker) setJokerVal(currentCard);
                        element.style.bottom = '30px'
                        element.style.boxShadow = '0px 0px 5px 3px yellow'
                        currentSeria.push(currentCard)

                    }

                    console.log(currentSeria);
                }
            })
        })
    } catch (error) {
        console.error(error)
    }
}

function deal14Cards(game: Game) {
    try {
        game.players.forEach(p => {
            let numOfCard = 14;
            while (numOfCard > 0) {
                const randomIndx = Math.floor(Math.random() * game.gameDeck.length);
                p.player.cards.push(game.gameDeck[randomIndx]);
                game.gameDeck.splice(randomIndx, 1);
                numOfCard--;
            }
        })
    } catch (error) {
        console.error(error)
    }
}

function renderPlayerManu(player: Player, div:HTMLDivElement | null) {
    try {
        if (!div) throw new Error("No #player");
        div.innerHTML = `<button name="close" onclick="hundleOnClick(event)">close Seria</button>
        <button name="done" onclick="hundleOnClick(event)">Done</button>
        <button name="card" onclick="hundleOnClick(event)">Get Card</button>
        <button name="sortColor" onclick="hundleOnClick(event)">Sort By Color</button>
        <button name="sortValue" onclick="hundleOnClick(event)">Sort By Value</button>`
    
        cardsEventListener(player, document.querySelectorAll(".card"));
    } catch (error) {
        console.error(error)
    }
}

function renderPlayerBord(player: Player, div: HTMLDivElement | null) {
    try {
        
        if (!div) throw new Error("No #player");
        const bord = document.querySelector("#cards");
        if (!bord) throw new Error("No #cards");
        bord.innerHTML = ``;
        player.cards.forEach(card => {
            bord.innerHTML += `<div class="card" id = "${card.value}${card.color}" style="background-image: url('${card.imgUrl}');"></div>`
        })
        bord.innerHTML += `<p>Current Player Turn: ${player.name}</p>`
        renderPlayerManu(player,document.querySelector("#playerAction"))
       
    } catch (error) {
        console.error(error)
    }
}

function setNextPlayer() {
    try {
        if (currentGame.gameDeck.length === 0) {
            // endOfGame();
        }
        const nextIndx = currentGame.currIndx + 1 === currentGame.players.length ?  0 : currentGame.currIndx + 1
        currentPlayer = currentGame.players[nextIndx].player;
        currentGame.currIndx = nextIndx;
        renderPlayerBord(currentPlayer, document.querySelector("#player"));
    } catch (error) {
        console.error(error)
    }
}

function takeCard() {
    try {
        debugger;
        const card = currentGame.gameDeck.pop()
        if (card === undefined) throw new Error("no card");
        currentPlayer.cards.push(card)
        localStorage.setItem("Game", JSON.stringify(currentGame))
        renderPlayerBord(currentPlayer, document.querySelector("#player"))
        setTimeout(() =>{
            setNextPlayer();
        },2000)
    } catch (error) {
        console.error(error)
    }
}

function removeFromBord(cards: Card[]) {
    try {
        cards.forEach(cardToRemove => {
            const index = currentPlayer.cards.findIndex(c => c.value === cardToRemove.value && c.color === cardToRemove.color);
            currentPlayer.cards.splice(index, 1);
        })
        renderPlayerBord(currentPlayer, document.querySelector("#player"));
    } catch (error) {
        console.error(error)
    }
}

function clearSerie(cards: Card[]) {
    try {
        cards.length = 0;
    } catch (error) {
        console.error(error)
    }
}

function closeSeria() {
    try {
        debugger;
        if (checkSerial(currentSeria) || checkSerie(currentSeria)) {
            newSerias.push({ ...currentSeria });
            removeFromBord(currentSeria);
            clearSerie(currentSeria);
        }

    } catch (error) {
        console.error(error)
    }
}

function renderToMainBord(cards: Card[][], board: HTMLDivElement | null) {
    try {
        debugger;
        if (!board) throw new Error("no #board");
        cards.forEach(seria => {
            let html = `<div>
             `;
            seria.forEach(card => {
                html += `<div class="card" style="background-image: url('${card.imgUrl}');"></div>`
            })
            html += `</div>`
        })
    } catch (error) {
        console.error(error)
    }
}

function returnCardsToBord(cardsToReturn:Card[][], player:Player) {
    try {
        const cards = cardsToReturn.flat();
        debugger;
    } catch (error) {
        console.error(error)
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

    } catch (error) {
        console.error(error)
    }
}

function checkSumAtLeast30(serias: Card[][]): number {
    try {
        let sumOfCard = 0
        const checking = serias.flat()
        checking.forEach(card => sumOfCard += card.value)
        return sumOfCard
    } catch (error) {
        console.error(error)
        return 0;
    }
}

function hundleOnClick(ev: any) {
    try {
        
        switch (ev.target.name) {
            case "close": closeSeria(); break;
            case "done": checkDone(); break;
            case "sortColor": sortByColor(); break;
            case "sortValue": sortByValue(); break;
            case "card": takeCard(); break;

        }
    } catch (error) {
        console.error(error);
    }
}

function sortByColor() {
    try {
        currentPlayer.cards.sort(compareCardsColor)
        renderPlayerBord(currentPlayer, document.querySelector("#player"))
    } catch (error) {
        console.error(error)
    }
}

function sortByValue() {
    try {
        currentPlayer.cards.sort(compareCards)
        renderPlayerBord(currentPlayer, document.querySelector("#player"))
    } catch (error) {
        console.error(error)
    }
}

// GAME
let currentPlayer: Player;
const playerList: Player[] = getplayersListFromStorage();
if (playerList.length > 1) {
    startGame(playerList);
}