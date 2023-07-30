
const playerList:[] = [];
const playerNum  = playerList.length;


function handleInput(event) {
  do{
      buttonState(playerList)
      console.dir(event)
      console.log(event.target.value);
      const root = document.querySelector('#root');
  }  
  while(playerNum > 5);

}
 

const formInput = document.querySelector("#name");

const formButton = document.querySelector("#send");

function handleSubmit(ev:any){
    ev.preventDefault();
    try {
        if (playerList.length < 4) {
        console.dir(ev);

       let username:string = ev.target.player.value;
        console.log(username)
        playerList.push(username);
        console.log(playerList);
        ev.target.reset();


        renderPlayers(playerList);
        console.log(playerList);
        }
        else {
            ev.preventDefault();
            console.dir(ev);
    
           
            console.log(username)
            console.log(playerList);
            ev.target.reset();
    
            console.log(playerList);

            formInput?.removeEventListener = "true"
            formButton?.ariaDisabled = "true";
            formInput?.ariaDisabled = "true";
            alert('You have reached the maximum number of players');
        }
        localStorage.setItem('playerList', JSON.stringify(playerList));
    } catch (error) {
        console.error(error);
    }
}
function renderPlayers(playersList) {
    const usersWrapper = document.querySelector(`#usersWrapper`);
     
     const playerNum = playerList.length;
     
     console.log(playerList)
     console.log(playerNum);
     const playerDetails = playerList[playerList.length - 1];
     if (!playerDetails) throw new Error(`Player's details not found`);
    if (usersWrapper) {
        usersWrapper.innerHTML += `<div class="row" id="" >
        <div class="playerRow" id="" style="background-color: black">
        <div class="details" ><h3> שחקן מספר    ${playerNum} :    ${playerDetails}</h3></div>
      </div> 
      <button type="button" id="" onclick="handleDeletePlayer(event)" >
      delete
      </button>
      </div>`;
      
    }
    
    if (playerNum > 1){
        submitWrapper.innerHTML ='';
        submitWrapper.innerHTML += `
        <form onsubmit="handleSubmitGo(event)">
        <input type="submit" id="go" value="!קדימה" />
        </form> `;
    }
  }

  function handleDeletePlayer(playerNum) {
    try {
        playerList.splice(playerNum,1);
       console.log(playerList)
       renderPlayers
    } catch (error) {
        console.error(error);
    }

  }

   function handleSubmitGo(ev:any){
    ev.preventDefault();
    try {
        console.dir(ev);
        const otherPageURL = 'set-seria.html';
        window.location.href = otherPageURL;
    } catch (error) {
        console.error(error);
    }
}


   
   function buttonState(playerList){
    if (playerList.length === 4){
        formButton.ariaDisabled = "true";
   } else {
    formButton.ariaDisabled = "false";
   }
   }
