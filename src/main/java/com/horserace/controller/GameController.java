package com.horserace.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.horserace.persistence.model.GameSimEntity;
import com.horserace.service.Game;
import com.horserace.service.GameImpl;

@RestController
public class GameController {
    
    private Game game;

    @GetMapping("/gameInstructions")
    public ArrayList<GameSimEntity> getGameInstructions(){
        game = new GameImpl();
        return game.startGame();
    }
}
