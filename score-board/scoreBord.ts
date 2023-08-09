

interface User {
    score: number;
    name: string;
  }
  
  const players: User[] = [
    { score: 100, name: 'John Doe' },
    {  score: 80, name: 'Jane Smith'},
    {score: 120, name: 'Bob Johnson' },
    {score: 34, name: 'Pepito' },

  ];



  
  function renderPlayerTable(players: User[]) {
    // Sort players by score in descending order
    const sortedPlayers = players.sort((a, b) => b.score - a.score);
    console.log(sortedPlayers);
    // Limit the number of players to display (2 to 4)
    const numberOfPlayers = Math.min(sortedPlayers.length, 4);
  
    const playerTable = document.querySelector('#score-table');
    if (!playerTable) return;
  
    //playerTable.innerHTML = ''; // Clear existing content
  
    for (let i = 0; i < numberOfPlayers; i++) {
      const player = sortedPlayers[i];
  
      const row = document.createElement('tr');
      
      const scoreCell = document.createElement('td');
      const nameCell = document.createElement('td');
      const rankCell = document.createElement('td');

      
      nameCell.textContent = player.name;
      scoreCell.textContent = player.score.toString();
      rankCell.textContent = (i+1).toString();
    
      row.appendChild(scoreCell);
      row.appendChild(nameCell);
      row.appendChild(rankCell);
      
          // Add a CSS class to the row based on a condition (e.g., the player with the highest score)
    if (player.score === sortedPlayers[0].score) {
        row.classList.add('highest-score');
      } else if(player.score === sortedPlayers[1].score){
        row.classList.add('second-score');
      } else if(player.score === sortedPlayers[2].score){
        row.classList.add('third-score');
      }

      playerTable.appendChild(row);
    }
  }
  
  // Initial rendering of player table
  renderPlayerTable(players);
  