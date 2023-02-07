package com.horserace.service;

import java.util.HashMap;
import com.horserace.persistence.model.PlayerEntity;

public interface Player {
    
    HashMap<Integer, PlayerEntity> getPlayers();

    void addPlayer(PlayerEntity player);

    void removePlayer(PlayerEntity player);
}
