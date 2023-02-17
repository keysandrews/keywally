var socket = new SockJS('/gs-guide-websocket');
var stompClient = Stomp.over(socket);
var playerCount = 0;

stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe("/topic/player", function(player) {
        // Display the updated data on the home page
        console.log(player.body);
        getPlayerCount(player.body);
    });
});

/**
 * Method will take the body of the message sent
 * by the form on addPlayer page and add the player to
 * the home screen
 * @param {[String]} playerInfo [body of message]
 */
async function displayPlayer(playerInfo){
    //Convert body of the message to a list to work with player info
    const playersList = Object.values((JSON.parse(playerInfo)));
    //Get the list in index.html that corresponds with suit of player
    let listId = document.getElementById(playersList[2]);
    //Create a string to display player name and bet
    let playerString = playersList[0] + ": " + playersList[1];
    //Create a list item
    let item = document.createElement('li');  
    //Add the item to the list
    item.appendChild(document.createTextNode(playerString));
    listId.appendChild(item);
    //Update the count of players in the game
    playerCount++;
}

/**
 * Update the player count and call displayPlayer
 * @param {[String]} playerInfo [body of message]
 */
async function getPlayerCount(playerInfo) {
    await displayPlayer(playerInfo);
    const updatePlayerCount = document.getElementById("player-count");
    updatePlayerCount.textContent = `Number of players: ${playerCount}`;
}