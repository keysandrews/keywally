package com.horserace.service;

import java.util.*;

import org.springframework.stereotype.Service;

import com.horserace.persistence.model.*;
import com.horserace.persistence.model.enums.*;

@Service
public class GameImpl implements Game {
    
    private ArrayList<GameSimEntity> instructions;
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
        //Keep Track of side deck Card;
        CardEntity sideDeckCard;

        //System.out.println("Playing Game");
        do {
            //Flip Top Card
            flipTopCard(deck);
            //Find the Horse that cooresponds with suit of flipped card
            tempHorse = findHorse(horses, topCard, 1);
 
            //Move Horse Instruction
            createInstructionStep(Action.MOVE, Type.ACE, tempHorse, updateHorse.getPosition(), true);

            //Check to trap condition is met
            int minPos = horses.stream().min(Comparator.comparingInt(HorseEntity::getPosition)).get().getPosition();
            if (minPos > count){
                sideDeckCard = sideDeck.get(count);
                //Flip side card
                createInstructionStep(Action.FLIP, Type.SIDE, sideDeckCard, minPos, false);
                //Move horse back
                tempHorse = findHorse(horses, sideDeckCard, -1);
                createInstructionStep(Action.MOVE, Type.ACE, tempHorse, updateHorse.getPosition(), false);
                count++;
            }
    
        } while (updateHorse.getPosition() != 7);

        return instructions;

    }

    public void flipTopCard(ArrayList<CardEntity> deck){
        //Get top card from the deck
        topCard = deck.get(0);
        //Remove from the deck
        deck.remove(0);
        //Add Flipped Card to Instruction
        createInstructionStep(Action.FLIP, Type.DECK, topCard, 0, false);
    }

    //Create an instruction step and add it to the list
    public void createInstructionStep(Action action, Type type, CardEntity card, int position, boolean forward){
        instructionStep = GameSimEntity.builder().action(action).type(type).card(card).position(position).forward(forward).build(); 
        instructions.add(instructionStep);
    }

    public CardEntity findHorse(ArrayList<HorseEntity> horses, CardEntity card, int pos){
        //Find Cooresponding Horse and update position
        updateHorse = horses.stream().filter(x -> x.getSuit().equals(card.getSuit())).findFirst().get();
        //Update the position of the horse
        updateHorse.setPosition((updateHorse.getPosition() + pos));
        //Create temp Horse to move corresponding Ace
        tempHorse = new CardEntity(card.getSuit(), Rank.ACE);

        return tempHorse;
    }

}
