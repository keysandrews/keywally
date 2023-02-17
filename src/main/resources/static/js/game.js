const image = document.getElementById("deck");

//Flip the main deck
const flipDeck = (image) => {
    return new Promise((resolve) => {
        image.addEventListener("click", () => {
            resolve();
        });
    });
}

//Move horse
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

//Call the API to get insturctions
async function getGameInstructions() {
    try {
        const response = await fetch("/gameInstructions");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

//Flip image
async function onImageClick(rank, suit, image) {
    image.src = `images/cards/${rank}_of_${suit}.png`; 
} 

/**
 * Method will call API to get the list 
 * of instructions for a given game and 
 * will display the cooresponding steps on 
 * the screen
 */
async function playGame() {
    try{
        //Get Game instructions from backend
        const instructions = await getGameInstructions();
        //For each instruction
        for(const instruction of instructions){
            //Build Instruction Object
            const { card, position, type, action, forward } = instruction;
            const rank = card.rank;
            const suit = card.suit;
            //Id to move the cooresponding horse card
            const id = `#${rank}${suit}`;

            if(action == "FLIP"){
                if(type == "DECK") {
                    //Flip the Deck Card
                    await flipDeck(image).then(() => onImageClick(rank, suit, image));
                } else {
                    //Flip the Side Deck
                    const image = document.getElementById((`${type}${position}`));    
                    await flipSideDeck(image, rank, suit);
                    setTimeout(function() {}, 1000);
                }         
            } else {
                if (forward == false) {
                    setTimeout(() => moveHorse(id, -1), 500);
                } else {
                    await moveHorse(id, 1);
                }        
            }
        }
    } catch(error){
        console.error(error);
    }    
}

playGame();