package com.horserace.service;

import java.util.ArrayList;
import java.util.Collections;

import com.horserace.persistence.model.*;
import com.horserace.persistence.model.enums.Rank;
import com.horserace.persistence.model.enums.Suit;

public class CardSetup {

    //Returns deck of cards minus the aces
    public static ArrayList<CardEntity> getDeck() {
        ArrayList<CardEntity> deck = new ArrayList<>();
        for (Suit suit : Suit.values()) {
            for (Rank rank : Rank.values()) {
                //Remove Aces
                if (rank == Rank.ACE){
                    continue;
                } else {
                    deck.add(new CardEntity(suit, rank));
                }
            }
        }

        Collections.shuffle(deck);
        return deck;
    }
    
    //Returns deck of cards minus the aces and side cards
    public static ArrayList<CardEntity> getSideDeck(ArrayList<CardEntity> deck) {
        
        ArrayList<CardEntity> sideDeck = new ArrayList<>();

        //Remove first 6 Cards
        for(int i = 0; i <= 5; i++ ){
            CardEntity temp = deck.get(i);
            deck.remove(i);
            sideDeck.add(temp);
        }
        return sideDeck;
    }

    public static ArrayList<HorseEntity> getHorses () {
        ArrayList<HorseEntity> horses = new ArrayList<>();

        //Start all horses at 0
        for (Suit suit : Suit.values()) {
            horses.add(new HorseEntity(suit, 0));
            
        }

        return horses;

    }
}
