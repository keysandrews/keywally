package com.horserace.service;

import java.util.HashMap;

import org.springframework.stereotype.Component;

import com.horserace.persistence.model.PlayerEntity;

@Component
public class PlayerImpl {

    private HashMap<Integer, PlayerEntity> players = new HashMap<>();

    int index = 0;

    public HashMap<Integer, PlayerEntity> getPlayers(){
        return players;

    }

    public synchronized void addPlayer(PlayerEntity player){
        if(players.isEmpty()) {
            players.put(index, player);
        } else {
            players.put(index++, player);
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
    
}
