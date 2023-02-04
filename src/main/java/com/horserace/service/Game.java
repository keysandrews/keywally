package com.horserace.service;

import java.util.ArrayList;
import com.horserace.persistence.model.GameSimEntity;

public interface Game {
   
    ArrayList<GameSimEntity> startGame();
    
}
