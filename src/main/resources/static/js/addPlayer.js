const form = document.getElementById("addPlayer");
var stompClient = null;

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

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    setConnected(false);
    console.log("Disconnected");
}

connect();