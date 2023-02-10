const form = document.getElementById("addPlayer");
  
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

    await postPlayerInfo(playerInfo);
    window.location = "/";
});

