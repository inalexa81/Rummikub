class Card {
    constructor(public value: number, public color: string, public imgUrl: string, public isJoker: boolean) {
    }
}

const player: Card[] = [
    new Card(1, 'black', './imgs/1black.png', false),
    new Card(1, 'blue', './imgs/1blue.png', false),
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

const board: Square[] = [
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
    new Square(false),
]
const boardElement = document.querySelector('#board') as HTMLDivElement

board.forEach(square => {
    boardElement.innerHTML += `<div class="square" id="${square.id}"></div>`

})

const squares = document.querySelectorAll(".square") as NodeListOf<HTMLDivElement>

let currentCard: Card | undefined
let indexOfCurrentCard
let currentCardElement: any

playerCards.forEach(element => {
    element.style.borderRadius = '7px'
    element.addEventListener("mousedown", function () {
        element.style.position = 'fixed;'
        indexOfCurrentCard = player.findIndex(card => `${card.value}${card.color}` === element.id)
        currentCard = player[indexOfCurrentCard]
        if (currentCard !== undefined) {

            document.addEventListener("mousemove", function (ev) {
                element.style.position = "fixed;"
                let x = ev.clientX
                let y = ev.clientY
                let xx = element.clientLeft
                element.style.left = `${x - 400}px`
                element.style.top = `${y - 400}px`


            })
        }

    })


})

function drawCard(square) {
    try {
        if (currentCard === undefined) throw new Error('can not find current card')

        square.style.backgroundSize = 'cover'
        square.style.backgroundImage = `url(${currentCard.imgUrl})`
        currentCardElement = document.getElementById(`${currentCard.value}${currentCard.color}`)
        currentCardElement.style.display = 'none'
        const currentSquare = board.find(sqr => sqr.id == square.id)
        if (!currentSquare) throw new Error('can not find current square')
        currentSquare.setOccupiedAndCardProperties(currentCard)
        newSeria.push(currentCard)
        console.log(newSeria);
        
        currentCard=undefined
    } catch (error) {
        console.error(error)
    }
}
const newSeria:Card[]=[]
squares.forEach(square => {
    square.addEventListener("click", function () {
        drawCard(square)
    })
    square.addEventListener("mouseenter",function(){
        square.style.border = '1px solid navy'
        // square.style.background = 'rgb(0, 232, 232)'
    })

    square.addEventListener("mouseout",function(){
        square.style.border = ''
        // if(!square.style.backgroundImage){
        //     square.style.background=''
        // }

    })


    //     const rrr = currentCard.color
    //     console.log(currentCard);
    //     console.log(rrr);

    //     square.style.backgroundSize = 'cover'
    //     square.style.backgroundImage = rrr
    //     // element.style.display = 'none'
    //     // const indexOfCurrentCard = player.findIndex(card =>
    //     //     `url("${card.imgUrl}")` == `${element.style.backgroundImage}`)
    //     let newSeria: Card[] = []
    //     // newSeria.push(player[indexOfCurrentCard])
    //     // console.log(newSeria);


    // })

})
