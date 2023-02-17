const form = document.getElementById("addPlayer");
var stompClient = null;


function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

/**
 * Method connects to the websocket in order
 * to send messages 
 */
function connect() {
    var socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/player', function (player) {
            console.log(JSON.stringify(player));
        });
    });
}

/**
 * Function to disconnect, it is currently not used
 */
function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

//Connect when the page is opened
connect();

/**
 * Send a player information to backend to be 
 * stored for the current game
 * @param {[PlayerEntity]} playerInfo 
 * @returns a promise which waits for post to take place
 */
const postPlayerInfo = (playerInfo) => {
    return new Promise((resolve) => {
        fetch("/joinGame", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(playerInfo)
        })
        resolve();
    });
}

// This event listener waits for the submit button to be clicked
form.addEventListener("submit", async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const playerInfo = {};

    for (const [key, value] of formData.entries()) {
        if (key === "bet") {
            playerInfo[key] = parseInt(value, 10);
        } else {
            playerInfo[key] = value;
        }
        console.log(playerInfo[key])
        console.log(playerInfo[value])
    }
    console.log(JSON.stringify(playerInfo))
    stompClient.send("/app/update/player", {}, JSON.stringify(playerInfo));

    await postPlayerInfo(playerInfo);
});