function computeScore(players: {player:Player, score:number}[]) {
    try {
        if (!players) throw new Error("Game element missing");
        players.forEach(player => {
            let sum: number = 0;
            player.player.cards.forEach((card) => {
                sum += card.value;
            });
            player.score -= sum; 
        });
        //setToLocalStorage();
        //move to score window? href
    } catch (error) {
        console.error(error)
    }
}

