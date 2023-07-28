var Card = /** @class */ (function () {
    function Card(value, color, imgUrl, isJoker) {
        this.value = value;
        this.color = color;
        this.imgUrl = imgUrl;
        this.isJoker = isJoker;
    }
    return Card;
}());
var player = [
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
];
var i = 0;
var Square = /** @class */ (function () {
    function Square(isOccupied, imgUrl, value, color) {
        this.isOccupied = isOccupied;
        this.imgUrl = imgUrl;
        this.value = value;
        this.color = color;
        this.id = i;
        i++;
    }
    Square.prototype.setOccupiedAndCardProperties = function (card) {
        try {
            this.isOccupied = true;
            this.imgUrl = card.imgUrl;
            this.color = card.color;
            this.value = card.value;
        }
        catch (error) {
            console.error(error);
        }
    };
    return Square;
}());
var playerElement = document.querySelector('#player');
var html = "";
player.forEach(function (card) {
    playerElement.innerHTML += "<div class=\"card\" id = \"" + card.value + card.color + "\" style=\"background-image: url('" + card.imgUrl + "');\"></div>";
});
var playerCards = document.querySelectorAll(".card");
var board = [
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
];
var boardElement = document.querySelector('#board');
board.forEach(function (square) {
    boardElement.innerHTML += "<div class=\"square\" id=\"" + square.id + "\"></div>";
});
var squares = document.querySelectorAll(".square");
var currentCard;
var indexOfCurrentCard;
var currentCardElement;
playerCards.forEach(function (element) {
    element.style.borderRadius = '7px';
    element.addEventListener("mousedown", function () {
        element.style.position = 'fixed;';
        indexOfCurrentCard = player.findIndex(function (card) { return "" + card.value + card.color === element.id; });
        currentCard = player[indexOfCurrentCard];
        if (currentCard !== undefined) {
            document.addEventListener("mousemove", function (ev) {
                element.style.position = "fixed;";
                var x = ev.clientX;
                var y = ev.clientY;
                var xx = element.clientLeft;
                element.style.left = x - 400 + "px";
                element.style.top = y - 400 + "px";
            });
        }
    });
});
function drawCard(square) {
    try {
        if (currentCard === undefined)
            throw new Error('can not find current card');
        square.style.backgroundSize = 'cover';
        square.style.backgroundImage = "url(" + currentCard.imgUrl + ")";
        currentCardElement = document.getElementById("" + currentCard.value + currentCard.color);
        currentCardElement.style.display = 'none';
        var currentSquare = board.find(function (sqr) { return sqr.id == square.id; });
        if (!currentSquare)
            throw new Error('can not find current square');
        currentSquare.setOccupiedAndCardProperties(currentCard);
        newSeria.push(currentCard);
        console.log(newSeria);
        currentCard = undefined;
    }
    catch (error) {
        console.error(error);
    }
}
var newSeria = [];
squares.forEach(function (square) {
    square.addEventListener("click", function () {
        drawCard(square);
    });
    square.addEventListener("mouseenter", function () {
        square.style.border = '1px solid navy';
        // square.style.background = 'rgb(0, 232, 232)'
    });
    square.addEventListener("mouseout", function () {
        square.style.border = '';
        // if(!square.style.backgroundImage){
        //     square.style.background=''
        // }
    });
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
});
