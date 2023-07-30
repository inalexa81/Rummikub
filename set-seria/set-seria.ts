class Card {
    constructor(public value: number, public color: string, public imgUrl: string, public isJoker: boolean) {
    }
}

const player: Card[] = [
    new Card(1, 'black', './imgs/1black.png', false),
    new Card(1, 'blue', './imgs/1blue.png', false),
    new Card(1, 'red', './imgs/1red.png', false),
    new Card(1, 'red', './imgs/1red.png', false),
    new Card(1, 'yellow', './imgs/1yellow.png', false),
    new Card(2, 'black', './imgs/2black.png', false),
    new Card(2, 'blue', './imgs/2blue.png', false),
    new Card(2, 'red', './imgs/2red.png', false),
    new Card(2, 'yellow', './imgs/2yellow.png', false),
    new Card(3, 'black', './imgs/3black.png', false),
    new Card(3, 'blue', './imgs/3blue.png', false),
    new Card(3, 'red', './imgs/3red.png', false),
    new Card(3, 'yellow', './imgs/3yellow.png', false),
]
let i = 0

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



const playerElement = document.querySelector('#player') as HTMLDivElement

let html = ``

player.forEach(card => {
    playerElement.innerHTML += `<div class="card" id = "${card.value}${card.color}" style="background-image: url('${card.imgUrl}');"></div>`
})
const playerCards = document.querySelectorAll(".card") as NodeListOf<HTMLDivElement>


const squares = document.querySelectorAll(".square") as NodeListOf<HTMLDivElement>

const newSerias: Card[][] = []
const currentSeria: Card[] = []
let currentCard: Card | undefined
let indexOfCurrentCard: number

playerCards.forEach(element => {
    element.style.borderRadius = '7px'

    const addCard = element.addEventListener("click", function () {
        indexOfCurrentCard = player.findIndex(card => `${card.value}${card.color}` === element.id)
        currentCard = player[indexOfCurrentCard]
        if (currentCard !== undefined) {
            if (element.style.bottom === '30px') {
                element.style.bottom = '0px'
                element.style.boxShadow = ''
                const indexOfCard = currentSeria.findIndex(card => `${card.value}${card.color}` === element.id)
                currentSeria.splice(indexOfCard, 1)

            } else {
                element.style.bottom = '30px'
                element.style.boxShadow = '0px 0px 5px 3px yellow'
                currentSeria.push(currentCard)

            }

            console.log(currentSeria);
        }
    })
})



function checkSumAtLeast30() {
    try {
        let sumOfCard = 0
        const checking = newSerias.flat()
        checking.forEach(card => sumOfCard += card.value)
        return sumOfCard
    } catch (error) {
        console.error(error)
    }
}
