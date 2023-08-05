var Player = /** @class */ (function () {
    function Player(name, firstDrop) {
        this.name = name;
        this.cards = [];
        this.firstDrop = (firstDrop !== undefined) ? firstDrop : false;
    }
    return Player;
}());
var Card = /** @class */ (function () {
    function Card(value, color, imgUrl, isJoker) {
        this.value = value;
        this.color = color;
        this.imgUrl = imgUrl;
        this.isJoker = isJoker;
    }
    return Card;
}());
var playerList = getplayersListFromStorage();
renderPlayers(document.querySelector("#usersWrapper"));
function getplayersListFromStorage() {
    try {
        debugger;
        var storageString = localStorage.getItem("playerList");
        if (!storageString)
            throw new Error("No such name in local storage");
        //convert string to array of objects
        var storageArray = JSON.parse(storageString);
        //convert array of objects to array of Card | Player
        var players = storageArray.map(function (p) {
            return new Player(p.name);
        });
        return players;
    }
    catch (error) {
        console.error(error);
        return [];
    }
}
// function handleInput(event) {
//     do {
//         debugger;
//         buttonState(playerList.length)
//         const root = document.querySelector('#root');
//     }
//     while (playerNum > 5);
// }
function handleSubmit(ev) {
    try {
        debugger;
        ev.preventDefault();
        var formButton = document.querySelector("#send");
        var formInput = document.querySelector("#name");
        if (!formButton)
            throw new Error("No send button");
        if (!formInput)
            throw new Error("No #name");
        if (playerList.length < 4) {
            var username = ev.target.player.value;
            var player = new Player(username);
            playerList.push(player);
            ev.target.reset();
            renderPlayer(player);
        }
        else {
            ev.target.reset();
            // formInput.removeEventListener = "true"
            formButton.ariaDisabled = "true";
            formInput.ariaDisabled = "true";
            alert('You have reached the maximum number of players');
        }
        localStorage.setItem('playerList', JSON.stringify(playerList));
    }
    catch (error) {
        console.error(error);
    }
}
// function renderPlayer(player: Player) {
//     const usersWrapper = document.querySelector(`#usersWrapper`);
//     const playerNum = playerList.length;
//     // const playerDetails = playerList[playerList.length - 1];
//     if (!player) throw new Error(`Player not found`);
//     if (usersWrapper) {
//         usersWrapper.innerHTML += `<div class="row" id="" >
//         <div class="playerRow" id="" style="background-color: black">
//         <div class="details" ><h3> שחקן מספר    ${playerNum} :    ${player.name}</h3></div>
//       </div>
//       <button type="button" id="" onclick="handleDeletePlayer(event)" >
//       delete
//       </button>
//       </div>`;
//     }
//     if (playerNum > 1) {
//         submitWrapper.innerHTML = '';
//         submitWrapper.innerHTML += `
//         <form onsubmit="handleSubmitGo(event)">
//         <input type="submit" id="go" value="!קדימה" />
//         </form> `;
//     }
// }
function renderPlayer(player) {
    var usersWrapper = document.querySelector("#usersWrapper");
    if (!player)
        throw new Error("Player not found");
    if (!usersWrapper)
        throw new Error("#usersWrapper not found");
    usersWrapper.innerHTML += "<div class=\"row\" id=\"\" >\n        <div class=\"playerRow\" id=\"\" style=\"background-color: black\">\n        <div class=\"details\" ><h3> \u05E9\u05D7\u05E7\u05DF \u05DE\u05E1\u05E4\u05E8    " + playerList.length + " :    " + player.name + "</h3></div>\n      </div> \n      <button type=\"button\" id=\"p" + playerList.length + "\" onclick=\"handleDeletePlayer(event)\" >\n      delete\n      </button>\n      </div>";
    if (playerList.length == 2) {
        renderGoBtn(document.querySelector("#submitWrapper"));
    }
    if (playerList.length == 4) {
        buttonState("true");
    }
}
function renderPlayers(usersWrapper) {
    try {
        if (!usersWrapper)
            throw new Error("Player not found");
        usersWrapper.innerHTML = playerList.map(function (p, index) {
            return "<div class=\"row\" id=\"\" >\n                <div class=\"playerRow\" id=\"\" style=\"background-color: black\">\n                <div class=\"details\" ><h3> \u05E9\u05D7\u05E7\u05DF \u05DE\u05E1\u05E4\u05E8    " + index + " :    " + p.name + "</h3></div>\n              </div> \n              <button type=\"button\" id=\"\" onclick=\"handleDeletePlayer(event)\" >\n              delete\n              </button>\n              </div>";
        }).join();
        if (playerList.length > 1) {
            renderGoBtn(document.querySelector("#submitWrapper"));
        }
    }
    catch (error) {
        console.error(error);
    }
}
function renderGoBtn(btn) {
    try {
        if (!btn)
            throw new Error("Player not found");
        btn.innerHTML = "\n            <form onsubmit=\"handleSubmitGo(event)\">\n            <input type=\"submit\" id=\"go\" value=\"!\u05E7\u05D3\u05D9\u05DE\u05D4\" />\n            </form> ";
    }
    catch (error) {
        console.error(error);
    }
}
function handleDeletePlayer(ev) {
    try {
        debugger;
        var playerId = ev.target.id;
        var playerNum = parseInt(playerId.substring(1)) - 1;
        playerList.splice(playerNum, 1);
        renderPlayers(document.querySelector("#usersWrapper"));
        buttonState("false");
    }
    catch (error) {
        console.error(error);
    }
}
function handleSubmitGo(ev) {
    ev.preventDefault();
    try {
        console.dir(ev);
        window.location.href = "../HTML/game.html";
    }
    catch (error) {
        console.error(error);
    }
}
// function buttonState(length: number) {
//     if (playerList.length === 4) {
//         formButton.ariaDisabled = "true";
//     } else {
//         formButton.ariaDisabled = "false";
//     }
// }
function buttonState(set) {
    try {
        var formButton = document.querySelector("#send");
        if (!formButton)
            throw new Error("no button");
        formButton.ariaDisabled = set;
    }
    catch (error) {
        console.error(error);
    }
}
