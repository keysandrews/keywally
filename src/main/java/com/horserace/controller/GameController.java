package com.horserace.controller;

import java.util.ArrayList;
import java.util.HashMap;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


import com.horserace.persistence.model.GameSimEntity;
import com.horserace.persistence.model.PlayerEntity;

import com.horserace.service.Game;
import com.horserace.service.GameImpl;
import com.horserace.service.Player;

@RestController
public class GameController {
    
    private Game game;
    private Player player;

    @GetMapping("/gameInstructions")
    public ArrayList<GameSimEntity> getGameInstructions(){
        game = new GameImpl();
        return game.startGame();
    }

    @GetMapping("/game")
    public ModelAndView myPage() {
      ModelAndView mav = new ModelAndView();
      mav.setViewName("game");
      return mav;
    }

    @PostMapping("/joinGame/{username}/{bet}")
    public ResponseEntity<String> joinGame(@RequestParam("username") String name, @RequestParam("bet") int bet) {
        System.out.println(name + " " + bet);
        PlayerEntity newPlayer = new PlayerEntity(name, bet);
        player.addPlayer(newPlayer);
        return ResponseEntity.ok("Data updated: " + name + " " + bet);
    }

    @GetMapping("/getPlayers")
    public HashMap<Integer, PlayerEntity> getPlayers(){
        return player.getPlayers();
    }
}
