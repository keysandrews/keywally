var socket = new SockJS('/gs-guide-websocket');
var stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe("/topic/player", function(data) {
        // Display the updated data on the home page
        console.log("Data received:", data.body);
    });
});
