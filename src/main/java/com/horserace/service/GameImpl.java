package com.horserace.service;

import java.util.*;

import com.horserace.persistence.model.*;
import com.horserace.persistence.model.enums.*;

public class GameImpl {
    
    public ArrayList<GameSimEntity> instructions;
    private CardEntity topCard;
    private CardEntity tempHorse;
    private HorseEntity updateHorse; 
    private GameSimEntity instructionStep;

    public ArrayList<GameSimEntity> startGame() {

        //Intialize the instructions
        instructions = new ArrayList<>();
        //Get the Deck without the Aces
        ArrayList<CardEntity> deck = CardSetup.getDeck();
        //Remove the first 6 cards from the deck 
        ArrayList<CardEntity> sideDeck = CardSetup.getSideDeck(deck);
        // Get Horses
        ArrayList<HorseEntity> horses = CardSetup.getHorses();
        //Use counter to count side deck
        int count = 0;
                
        do {
            //Get top card
            topCard = deck.get(0);
            //Remove from the deck
            deck.remove(0);
            //Add Flipped Card to Instruction
            instructionStep = GameSimEntity.builder().action(Action.FLIP).type(Type.DECK).card(topCard).position(0).build();
            instructions.add(instructionStep);
            //Find Cooresponding Horse and update position
            updateHorse = horses.stream().filter(x -> x.getSuit().equals(topCard.getSuit())).findFirst().get();
            //Update Position
            updateHorse.setPosition((updateHorse.getPosition() + 1)); 
    
            //COULD STOP GAME HERE WHEN WIN

            //Create temp Horse to move corresponding Ace
            tempHorse = new CardEntity(updateHorse.getSuit(), topCard.getRank());
            //Move Horse Instruction
            instructionStep = GameSimEntity.builder().action(Action.MOVE).type(Type.ACE).card(tempHorse).position(updateHorse.getPosition()).build(); 
            instructions.add(instructionStep); 

            int minPos = horses.stream().min(Comparator.comparingInt(HorseEntity::getPosition)).get().getPosition();

            if (minPos > count){
                instructionStep = GameSimEntity.builder().action(Action.FLIP).type(Type.SIDE).card(sideDeck.get(count)).position(minPos).build(); 
                instructions.add(instructionStep);
                count++;
            }
    
        } while (updateHorse.getPosition() != 7);

        return instructions;

    }

}
