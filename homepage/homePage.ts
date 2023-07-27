
const playerList = [];
const playerNum = playerList.length;

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
    try {
        if (playerList.length < 4) {
        ev.preventDefault();
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
            formInput?.removeEventListener = "true"
            formButton?.ariaDisabled = "true";
            formInput?.ariaDisabled = "true";
            alert('You have reached the maximum number of players');
        }
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
        usersWrapper.innerHTML += `<div class="playerRow" id="" style="background-color: black">
        <div class="details" ><h3> שחקן מספר    ${playerNum} :    ${playerDetails}</h3></div>
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

   function handleSubmitGo(ev:any){
    try {
        ev.preventDefault();
        console.dir(ev);

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
