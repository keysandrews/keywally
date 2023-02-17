package com.horserace.service;

import java.util.HashMap;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.horserace.persistence.model.PlayerEntity;

@Component
@Scope("singleton")
public class PlayerImpl {

    private HashMap<Integer, PlayerEntity> players = new HashMap<>();

    int index = 0;

    public PlayerImpl() {
        System.out.println("creating PlayerImpl instance");
    }

    public HashMap<Integer, PlayerEntity> getPlayers(){
        return players;

    }

    public synchronized void addPlayer(PlayerEntity player){
        if(players.isEmpty()) {
            System.out.println(player.getSuit());
            players.put(index, player);
        } else {
            System.out.println(player.getSuit());
            index++;
            players.put(index, player);
        }
    }

    public void removePlayer(PlayerEntity player){
        for (HashMap.Entry<Integer, PlayerEntity> entry : players.entrySet()) {
            int key = entry.getKey();
            PlayerEntity tempPlayer = entry.getValue();
            if(tempPlayer.getName() == player.getName()){
                players.remove(key);
            }
        }
    }

    public void resetPlayers(){
        System.out.println("Clearing list");
        players.clear();
        index = 0;
    }
    
}
