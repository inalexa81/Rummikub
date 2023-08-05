class Player {
    cards: Card[] = [];
    firstDrop: boolean;
    constructor(public name: string, firstDrop?: boolean | undefined) {
        this.firstDrop = (firstDrop !== undefined) ? firstDrop : false;

    }
}

class Card {
    constructor(public value: number, public color: string, public imgUrl: string, public isJoker: boolean) {
    }
}

const playerList: Player[] = getplayersListFromStorage();
renderPlayers(document.querySelector("#usersWrapper"));

function getplayersListFromStorage(): Player[] {
    try {
        debugger;
        const storageString = localStorage.getItem(`playerList`);
        if (!storageString) throw new Error("No such name in local storage");
        //convert string to array of objects
        const storageArray = JSON.parse(storageString);
        //convert array of objects to array of Card | Player
        const players: Player[] = storageArray.map((p: Player) => {
            return new Player(
                p.name
            )
        });
        return players;

    } catch (error) {
        console.error(error)
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




function handleSubmit(ev: any) {
    try {
        debugger;
        ev.preventDefault();
        const formButton = document.querySelector("#send");
        const formInput = document.querySelector("#name");
        if (!formButton) throw new Error("No send button");
        if (!formInput) throw new Error("No #name");
        if (playerList.length < 4) {
            let username: string = ev.target.player.value;
            const player = new Player(username);
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
    } catch (error) {
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

function renderPlayer(player: Player) {
    const usersWrapper = document.querySelector(`#usersWrapper`);
    if (!player) throw new Error(`Player not found`);
    if (!usersWrapper) throw new Error(`#usersWrapper not found`);
    usersWrapper.innerHTML += `<div class="row" id="" >
        <div class="playerRow" id="" style="background-color: black">
        <div class="details" ><h3> שחקן מספר    ${playerList.length} :    ${player.name}</h3></div>
      </div> 
      <button type="button" id="p${playerList.length}" onclick="handleDeletePlayer(event)" >
      delete
      </button>
      </div>`;
    if (playerList.length == 2) {
        renderGoBtn(document.querySelector("#submitWrapper"))
    }
    if (playerList.length == 4) {
        buttonState("true");
    }
}

function renderPlayers(usersWrapper: HTMLDivElement | null) {
    try {
        if (!usersWrapper) throw new Error(`Player not found`);
        usersWrapper.innerHTML = playerList.map((p, index) => {
            return `<div class="row" id="" >
                <div class="playerRow" id="" style="background-color: black">
                <div class="details" ><h3> שחקן מספר    ${index} :    ${p.name}</h3></div>
              </div> 
              <button type="button" id="" onclick="handleDeletePlayer(event)" >
              delete
              </button>
              </div>`;
        }).join();
        if (playerList.length > 1) {
            renderGoBtn(document.querySelector("#submitWrapper"))
        }
    } catch (error) {
        console.error(error)
    }
}


function renderGoBtn(btn: HTMLDivElement | null) {
    try {
        if (!btn) throw new Error(`Player not found`);
        btn.innerHTML = `
            <form onsubmit="handleSubmitGo(event)">
            <input type="submit" id="go" value="!קדימה" />
            </form> `;
    } catch (error) {
        console.error(error)
    }
}



function handleDeletePlayer(ev) {
    try {
        debugger;
        const playerId: string = ev.target.id
        const playerNum = parseInt(playerId.substring(1)) - 1;
        playerList.splice(playerNum, 1);
        renderPlayers(document.querySelector(`#usersWrapper`));
        buttonState("false");
    } catch (error) {
        console.error(error);
    }

}

function handleSubmitGo(ev: any) {
    ev.preventDefault();
    try {
        console.dir(ev);
        window.location.href = `../HTML/game.html`;
    } catch (error) {
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

function buttonState(set: string) {
    try {
        const formButton = document.querySelector("#send");
        if (!formButton) throw new Error("no button");
        formButton.ariaDisabled = set;
    } catch (error) {
        console.error(error)
    }
}
