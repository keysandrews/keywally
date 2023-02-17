const image = document.getElementById("deck");

//Flip the main deck
const flipDeck = (image) => {
    return new Promise((resolve) => {
        image.addEventListener("click", () => {
            resolve();
        });
    });
}

/**
 * This method will find the location of a card
 * in the grid and will either update it by 1 or -1
 * thus simulating a card moving
 * @param {[String]} id [finding the correct card to move]
 * @param {[Integer]} mover [1 or -1 to move card forward or backward] 
 * @returns the new poistion of a card
 */
const moveHorse = (id, mover) => {
    return new Promise((resolve) => {
        //Get the location of the card
        const gridItem = document.querySelector(id);
        const styles = window.getComputedStyle(gridItem);
        const gridColumn = styles.getPropertyValue('grid-column');
        //Slipt the values [ex. grid-column: 1 / 2] 
        var gridColumnStartLine = gridColumn.split(' / ')[0];
        const gridColumnEndLine = gridColumn.split(' / ')[1];
        //Update the values
        let newStart = parseInt(gridColumnStartLine) + mover;
        var newEnd = parseInt(gridColumnEndLine) + mover;
        //Combine them back into correct format
        var newPos = `${newStart} / ${newEnd}`;
        //Update the grid position
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

        //Suit to display on pop up
        var imageSuit;

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
            imageSuit = suit;
        }
        restartGame(imageSuit);
    } catch(error){
        console.error(error);
    }    
}

async function restartGame(imageSuit) {
    console.log("Hello");
  
    // Create the modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
  
    // Create the modal content
    const content = document.createElement('div');
    content.classList.add('modal-content');
  
    // Create the header with the image
    const header = document.createElement('div');
    header.classList.add('modal-header');
    const image = document.createElement('img');
    image.src = `../images/${imageSuit}.png`;
    header.appendChild(image);
    const winnerText = document.createElement('div');
    winnerText.textContent = 'Winner';
    winnerText.classList.add('winner-text');
    header.appendChild(winnerText);
    content.appendChild(header);
  
    // Create the buttons
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Restart Game';
    restartBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        // Call the function again to restart the game
        location.reload();
    });
  
    const lobbyBtn = document.createElement('button');
    lobbyBtn.textContent = 'Return to Main Lobby';
    lobbyBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      clearPlayerList();
    });
  
    // Add the elements to the modal content
    content.appendChild(restartBtn);
    content.appendChild(lobbyBtn);
  
    // Add the modal content to the modal
    modal.appendChild(content);
  
    // Add the modal to the document
    document.body.appendChild(modal);
  
    // Display the modal
    modal.style.display = 'block';
  }
  
async function clearPlayerList(){
    try {
        console.log("clear list");
        fetch("/clearPlayerList").then(response => {
            console.log(response)
            window.location.href = '/';
        })
    } catch (error) {
        console.error(error);
    }
}


playGame();


