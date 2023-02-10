const button = document.getElementById("myButton");
const newButton = document.getElementById("getPlayers");

async function getPlayers() {
    try {
        const response = await fetch("/getPlayers");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function getPlayer(){
    var playerCount = 0;
    const players = await getPlayers();

    let playersList = [];
    if (typeof players === 'object') {
        playersList = Object.values(players);
    } else {
        playersList = [players];
    }

    playerCount = playersList.length;
    playersList.forEach(player => {
        let listId = document.getElementById(player.suit);
        let playerString = player.name + ": " + player.bet;
        let item = document.createElement('li');  
        item.appendChild(document.createTextNode(playerString));
        listId.appendChild(item);
    });
    return playerCount;
}

async function getPlayerCount(){
    var playerCount = await getPlayer();
    const updatePlayerCount = document.getElementById("player-count");
    updatePlayerCount.textContent = `Number of players: ${playerCount}`;
}

newButton.addEventListener("click", getPlayerCount);
// button.addEventListener("click", updateList);