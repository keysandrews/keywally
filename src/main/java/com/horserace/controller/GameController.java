package com.horserace.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


import com.horserace.persistence.model.GameSimEntity;
import com.horserace.persistence.model.PlayerEntity;

import com.horserace.service.Game;
import com.horserace.service.GameImpl;
import com.horserace.service.Player;
import com.horserace.service.PlayerImpl;
import com.horserace.persistence.model.enums.Suit;

@RestController
public class GameController {
    @Autowired
	private PlayerImpl player;
    
    private Game game;;
    private String name;
    private int bet;
    private Suit suit;

    // @Autowired
    // public GameController(PlayerImpl player) {
    //     this.player = player;
    // }

    @GetMapping("/gameInstructions")
    public ArrayList<GameSimEntity> getGameInstructions(){
        System.out.println("Game Instructions");
        game = new GameImpl();
        return game.startGame();
    }

    @GetMapping("/game")
    public ModelAndView playGame() {
        System.out.println("Starting game");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("game");
        return mav;
    }

    @GetMapping("/addPlayer")
    public ModelAndView addPlayerPage() {
        System.out.println("Add Player");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("addPlayer");
        return mav;
    }

    @GetMapping("/getPlayers")
    public HashMap<Integer, PlayerEntity> getPlayers(){
        return player.getPlayers();
    }
}
