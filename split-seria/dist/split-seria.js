function splitSeria(existSeria, cardsToAdd) {
    try {
        var temporaryArr_1 = existSeria.concat(cardsToAdd);
        temporaryArr_1.sort(compare);
        var startOfNewSeria = temporaryArr_1.findIndex(function (card, index) { return card.value === temporaryArr_1[index + 1].value; }) + 1;
        console.log(startOfNewSeria);
        var newSeria1 = temporaryArr_1.slice(0, startOfNewSeria);
        var newSeria2 = temporaryArr_1.slice(startOfNewSeria);
        //add afunction that check the new serias
    }
    catch (error) {
        console.error(error);
    }
}
splitSeria([new Card(2, 'hh', 'jj', false), new Card(3, 'hh', 'jj', false), new Card(4, 'hh', 'jj', false)], [new Card(1, 'hh', 'jj', false), new Card(3, 'hh', 'jj', false), new Card(5, 'hh', 'jj', false)]);
