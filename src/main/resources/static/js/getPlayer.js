/**
 * Function calls API to get the list of players that is stored
 * in the backend when the game starts
 * @returns players which is a list of all the players in the game
 */
async function getPlayers() {
    try {
        const response = await fetch("/getPlayers");
        const players = await response.json();
        return players;
    } catch (error) {
        console.error(error);
    }
}

/**
 * Function calls getPlayers() then for each player
 * adds them to the list on the front end
 */
async function displayPlayers(){
    //Call API
    const players = await getPlayers();

    //Convet Obj to list 
    let playersList = [];
    if (typeof players === 'object') {
        playersList = Object.values(players);
    } else {
        playersList = [players];
    }

    //For each player in the list add them to HTML list
    playersList.forEach(player => {
        //Get the correct list ID
        let listId = document.getElementById(player.suit);
        let playerString = player.name + ": " + player.bet;
        let item = document.createElement('li');  
        item.appendChild(document.createTextNode(playerString));
        listId.appendChild(item);
    });
}

//Call function when page is loaded
displayPlayers();