const image = document.getElementById("deck");

const flipDeck = (image) => {
    return new Promise((resolve) => {
        image.addEventListener("click", () => {
            resolve();
        });
    });
}

const moveHorse = (id, mover) => {
    return new Promise((resolve) => {
        const gridItem = document.querySelector(id);
        const styles = window.getComputedStyle(gridItem);
        const gridColumn = styles.getPropertyValue('grid-column');
        var gridColumnStartLine = gridColumn.split(' / ')[0];
        const gridColumnEndLine = gridColumn.split(' / ')[1];
        let newStart = parseInt(gridColumnStartLine) + mover;
        var newEnd = parseInt(gridColumnEndLine) + mover;
        var newPos = `${newStart} / ${newEnd}`;
        gridItem.style.gridColumn = `${newPos}`;
        resolve();
    });
}

//Flip side deck
const flipSideDeck = (image, rank, suit) => {
    return new Promise((resolve) => {
        image.src = `images/cards/${rank}_of_${suit}.png`; 
        resolve();
    });
}

async function getGameInstructions() {
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

async function playGame() {
    const data = await getGameInstructions();
    for(let i = 0; i < data.length; i++) {
        let rank = data[i].card.rank;
        let suit = data[i].card.suit;
        let pos = data[i].position;
        let type = data[i].type;
        let action = data[i].action;      
        if(action == "FLIP"){
            if(type == "DECK") {
                await flipDeck(image).then(() => onImageClick(rank, suit, image));
            } else {
                const image = document.getElementById((type + pos));
                mover = -1;
                let id = `#ACE${suit}`;      
                await flipSideDeck(image, rank, suit);
                setTimeout(function() {

                }, 1000);
            }         
        } else {
            let forward = data[i].forward;
            let id = `#${rank}${suit}`;
            if (forward == false) {
                setTimeout(function() {
                    moveHorse(id, -1);
                }, 500);
            } else {
                await moveHorse(id, 1);
            }        
        }
    }       
}

playGame();