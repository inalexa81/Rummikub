var playerList = [];
var playerNum = playerList.length;
function handleInput(event) {
    do {
        buttonState(playerList);
        console.dir(event);
        console.log(event.target.value);
        var root = document.querySelector('#root');
    } while (playerNum > 5);
}
var formInput = document.querySelector("#name");
var formButton = document.querySelector("#send");
function handleSubmit(ev) {
    try {
        if (playerList.length < 4) {
            ev.preventDefault();
            console.dir(ev);
            var username = ev.target.player.value;
            console.log(username);
            playerList.push(username);
            console.log(playerList);
            ev.target.reset();
            renderPlayers(playerList);
            console.log(playerList);
        }
        else {
            ev.preventDefault();
            console.dir(ev);
            console.log(username);
            console.log(playerList);
            ev.target.reset();
            console.log(playerList);
            formInput === null || formInput === void 0 ? void 0 : formInput.removeEventListener = "true";
            formButton === null || formButton === void 0 ? void 0 : formButton.ariaDisabled = "true";
            formInput === null || formInput === void 0 ? void 0 : formInput.ariaDisabled = "true";
            alert('You have reached the maximum number of players');
        }
    }
    catch (error) {
        console.error(error);
    }
}
function renderPlayers(playersList) {
    var usersWrapper = document.querySelector("#usersWrapper");
    var playerNum = playerList.length;
    console.log(playerList);
    console.log(playerNum);
    var playerDetails = playerList[playerList.length - 1];
    if (!playerDetails)
        throw new Error("Player's details not found");
    if (usersWrapper) {
        usersWrapper.innerHTML += "<div class=\"row\" id=\"\" >\n        <div class=\"playerRow\" id=\"\" style=\"background-color: black\">\n        <div class=\"details\" ><h3> \u05E9\u05D7\u05E7\u05DF \u05DE\u05E1\u05E4\u05E8    " + playerNum + " :    " + playerDetails + "</h3></div>\n      </div> \n      <button type=\"button\" id=\"deletePlayer\" onclick=\"handleDeletePlayer(event)\" >\n      delete\n      </button>\n      </div>";
    }
    if (playerNum > 1) {
        submitWrapper.innerHTML = '';
        submitWrapper.innerHTML += "\n        <form onsubmit=\"handleSubmitGo(event)\">\n        <input type=\"submit\" id=\"go\" value=\"!\u05E7\u05D3\u05D9\u05DE\u05D4\" />\n        </form> ";
    }
}
function handleDeletePlayer(playerNum) {
    try {
        playerList.splice(playerNum, 1);
        console.log(playerList);
        renderPlayers;
    }
    catch (error) {
        console.error(error);
    }
}
function handleSubmitGo(ev) {
    try {
        ev.preventDefault();
        console.dir(ev);
    }
    catch (error) {
        console.error(error);
    }
}
function buttonState(playerList) {
    if (playerList.length === 4) {
        formButton.ariaDisabled = "true";
    }
    else {
        formButton.ariaDisabled = "false";
    }
}
