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
var squares = document.querySelectorAll(".square");
var newSerias = [];
var currentSeria = [];
var currentCard;
var indexOfCurrentCard;
playerCards.forEach(function (element) {
    element.style.borderRadius = '7px';
    var addCard = element.addEventListener("click", function () {
        indexOfCurrentCard = player.findIndex(function (card) { return "" + card.value + card.color === element.id; });
        currentCard = player[indexOfCurrentCard];
        if (currentCard !== undefined) {
            if (element.style.bottom === '30px') {
                element.style.bottom = '0px';
                element.style.boxShadow = '';
                var indexOfCard = currentSeria.findIndex(function (card) { return "" + card.value + card.color === element.id; });
                currentSeria.splice(indexOfCard, 1);
            }
            else {
                element.style.bottom = '30px';
                element.style.boxShadow = '0px 0px 5px 3px yellow';
                currentSeria.push(currentCard);
            }
            console.log(currentSeria);
        }
    });
});
function checkSumAtLeast30() {
    try {
        var sumOfCard_1 = 0;
        var checking = newSerias.flat();
        checking.forEach(function (card) { return sumOfCard_1 += card.value; });
        return sumOfCard_1;
    }
    catch (error) {
        console.error(error);
    }
}
