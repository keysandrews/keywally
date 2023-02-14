var socket = new SockJS('/gs-guide-websocket');
var stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe("/topic/player", function(data) {
        // Display the updated data on the home page
        getPlayerCount();
    });
});


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