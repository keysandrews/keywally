package com.horserace.controller;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


import com.horserace.persistence.model.GameSimEntity;
import com.horserace.persistence.model.PlayerEntity;

import com.horserace.service.Game;
import com.horserace.service.PlayerImpl;

@RestController
public class GameController {
    @Autowired
	private PlayerImpl player;
    @Autowired
    private Game game;

    @GetMapping("/gameInstructions")
    public ArrayList<GameSimEntity> getGameInstructions(){
        System.out.println("Game Instructions");
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
    public HashMap<Integer, PlayerEntity> getPlayers() {
        return player.getPlayers();
    }

    @GetMapping("/clearPlayerList")
    public String clearPlayerList() {
        System.out.println("Clearing list Controller");
        player.resetPlayers();
        return "Player list has been cleared";
    }
}
