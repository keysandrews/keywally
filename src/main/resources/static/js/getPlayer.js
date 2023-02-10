const button = document.getElementById("myButton");

async function getPlayers() {
    try {
        const response = await fetch("/getPlayers");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function addToList(){
    const data = await getPlayers();
    let values = [];

    if (typeof data === 'object') {
        values = Object.values(data);
    } else {
        values = [data];
    }

    let html = "<ul>";
    values.forEach(value => {
        html += "<li>" + value.name +": " + value.bet +": "+ value.suit  + "</li>";
    });

    html += "</ul>";
    console.log(html)
    return html;
}

async function updateList(){
    let list = await addToList();
    document.getElementById("myDiv").innerHTML = list;
}


async function getPlayer(){
    fetch('/getPlayers')
    .then(response => response.json())
    .then(players => {
      let heartsList = document.getElementById('HEARTS');
      let clubsList = document.getElementById('CLUBS');
      let diamondsList = document.getElementById('DIAMONDS');
      let spadesList = document.getElementById('SPADES');

      players.forEach(player => {
        let item = document.createElement('li');

        item.appendChild(document.createTextNode(player));

        list.appendChild(item);
      });
    });
}

button.addEventListener("click", updateList);