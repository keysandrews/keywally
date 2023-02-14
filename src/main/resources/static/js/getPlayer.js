let playersAddedToList = [];

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

        const isInList = playersAddedToList.some(element => 
            element.name === player.name && element.bet === player.bet && element.suit === player.suit
        );
        
        if(isInList){
            console.log("player is already in the list")
        } else {
            console.log("player is not in the list")
            playersAddedToList.push(player);
            let listId = document.getElementById(player.suit);
            let playerString = player.name + ": " + player.bet;
            let item = document.createElement('li');  
            item.appendChild(document.createTextNode(playerString));
            listId.appendChild(item);
        }
        console.log(playersAddedToList);
    });
    return playerCount;
}

async function getPlayerCount(){
    var playerCount = await getPlayer();
    const updatePlayerCount = document.getElementById("player-count");
    updatePlayerCount.textContent = `Number of players: ${playerCount}`;
}

let intervalId;

const stopButton = document.getElementById("startGame");
console.log(stopButton)
stopButton.addEventListener("click", stop);

// intervalId = setInterval(() => {
//     console.log(playersAddedToList)
//     getPlayerCount();
// }, 5000);

function stop() {
    clearInterval(intervalId);
}


newButton.addEventListener("click", getPlayerCount);
// button.addEventListener("click", updateList);