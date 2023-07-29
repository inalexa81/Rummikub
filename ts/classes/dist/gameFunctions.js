function computeScore(players) {
    try {
        if (!players)
            throw new Error("Game element missing");
        players.forEach(function (player) {
            var sum = 0;
            player.player.cards.forEach(function (card) {
                sum += card.value;
            });
            player.score -= sum;
        });
        //setToLocalStorage();
        //move to score window? href
    }
    catch (error) {
        console.error(error);
    }
}
