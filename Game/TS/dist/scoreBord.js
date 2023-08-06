var User = /** @class */ (function () {
    function User(score, name) {
        this.score = score;
        this.name = name;
    }
    return User;
}());
var players = [];
var plrs = localStorage.getItem("playerList");
if (plrs) {
    var plrsArr = JSON.parse(plrs);
    plrsArr.forEach(function (plr) {
        var p = new User(plr.score, plr.player.name);
        players.push(p);
    });
}
function renderPlayerTable(players) {
    // Sort players by score in descending order
    var sortedPlayers = players.sort(function (a, b) { return b.score - a.score; });
    // Limit the number of players to display (2 to 4)
    var numberOfPlayers = Math.min(sortedPlayers.length, 4);
    var playerTable = document.querySelector('#score-table');
    if (!playerTable)
        return;
    //playerTable.innerHTML = ''; // Clear existing content
    for (var i = 0; i < numberOfPlayers; i++) {
        var player = sortedPlayers[i];
        var row = document.createElement('tr');
        var scoreCell = document.createElement('td');
        var nameCell = document.createElement('td');
        var rankCell = document.createElement('td');
        nameCell.textContent = player.name;
        scoreCell.textContent = player.score.toString();
        rankCell.textContent = (i + 1).toString();
        row.appendChild(scoreCell);
        row.appendChild(nameCell);
        row.appendChild(rankCell);
        // Add a CSS class to the row based on a condition (e.g., the player with the highest score)
        if (player.score === sortedPlayers[0].score) {
            row.classList.add('highest-score');
        }
        else if (player.score === sortedPlayers[1].score) {
            row.classList.add('second-score');
        }
        else if (player.score === sortedPlayers[2].score) {
            row.classList.add('third-score');
        }
        playerTable.appendChild(row);
    }
}
// Initial rendering of player table
renderPlayerTable(players);
