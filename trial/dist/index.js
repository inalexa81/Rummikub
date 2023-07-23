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
var playerElement = document.querySelector('#player');
var html = "";
player.forEach(function (card) {
    playerElement.innerHTML += "<div class=\"card\" id = \"" + card.value + card.color + "\"style=\"background-image: url('" + card.imgUrl + "');\"></div>";
});
var playerCards = document.querySelectorAll(".card");
var squares = document.querySelectorAll(".square");
playerCards.forEach(function (element) {
    element.style.borderRadius = '7px';
    element.addEventListener("mouseup", function () {
    });
    element.addEventListener("mousedown", function () {
        element.style.position = 'fixed;';
        document.addEventListener("mousemove", function (ev) {
            element.style.position = "fixed;";
            var x = ev.clientX;
            var y = ev.clientY;
            element.style.left = x - 50 + 'px';
            element.style.top = y - 50 + 'px';
            squares.forEach(function (square) {
                square.addEventListener("click", function () {
                    square.style.backgroundSize = 'cover';
                    square.style.backgroundImage = element.style.backgroundImage;
                    element.style.display = 'none';
                    var indexOfCurrentCard = player.findIndex(function (card) {
                        return "url(\"" + card.imgUrl + "\")" == "" + element.style.backgroundImage;
                    });
                    var newSeria = [];
                    newSeria.push(player[indexOfCurrentCard]);
                    console.log(newSeria);
                });
            });
        });
    });
});
