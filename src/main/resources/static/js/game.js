const image = document.getElementById("deck");

const task = (image) => {
    return new Promise((resolve) => {
        image.addEventListener("click", () => {
            resolve();
        });
    });
}

const task1 = (id, mover) => {
    return new Promise((resolve) => {
        console.log(id);
        console.log(mover);
        const gridItem = document.querySelector(id);
        const styles = window.getComputedStyle(gridItem);
        const gridColumn = styles.getPropertyValue('grid-column');
        console.log("Old position: "+ gridColumn)
        var gridColumnStartLine = gridColumn.split(' / ')[0];
        const gridColumnEndLine = gridColumn.split(' / ')[1];
        let newStart = parseInt(gridColumnStartLine) + mover;
        var newEnd = parseInt(gridColumnEndLine) + mover;
        var newPos = `${newStart} / ${newEnd}`;
        gridItem.style.gridColumn = `${newPos}`;
        console.log("New Posistion: "+ newPos);
        resolve();
    });
}

//Flip side deck
const task3 = (image, rank, suit) => {
    return new Promise((resolve) => {
        image.src = `images/cards/${rank}_of_${suit}.png`; 
        resolve();
    });
}

async function getDataFromAPI() {
    try {
        const response = await fetch("/gameInstructions");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function onImageClick(rank, suit, image) {
    image.src = `images/cards/${rank}_of_${suit}.png`; 
} 

async function loop() {
    const data = await getDataFromAPI();
    console.log(typeof data);
    for(let i = 0; i < data.length; i++) {
        let rank = data[i].card.rank;
        let suit = data[i].card.suit;
        let pos = data[i].position;
        let type = data[i].type;
        let action = data[i].action;      
        if(action == "FLIP"){
            if(type == "DECK") {
                await task(image).then(() => onImageClick(rank, suit, image));
            } else {
                const image = document.getElementById((type + pos));
                mover = -1;
                let id = `#ACE${suit}`;      
                await task3(image, rank, suit);
                setTimeout(function() {

                }, 1000);
            }         
        } else {
            let forward = data[i].forward;
            let id = `#${rank}${suit}`;
            console.log(id);
            if (forward == false) {
                setTimeout(function() {
                    task1(id, -1);
                }, 500);
            } else {
                await task1(id, 1);
            }


            
        }
    }       
}

loop();