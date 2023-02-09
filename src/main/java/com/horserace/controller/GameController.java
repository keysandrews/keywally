package com.horserace.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
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

@RestController
public class GameController {
    
    private Game game;
    private Player player = new PlayerImpl();
    private String name;
    private int bet;

    @GetMapping("/gameInstructions")
    public ArrayList<GameSimEntity> getGameInstructions(){
        System.out.println("Game Instructions");
        game = new GameImpl();
        return game.startGame();
    }

    @GetMapping("/game")
    public ModelAndView myPage() {
        System.out.println("Starting game");
        ModelAndView mav = new ModelAndView();
        mav.setViewName("game");
        return mav;
    }

    // @PostMapping("/joinGame")
    // public ResponseEntity<String> joinGame(@RequestParam("username") String name, @RequestParam("b") int bet) {
    //     System.out.println(name + " " + bet);
    //     PlayerEntity newPlayer = new PlayerEntity(name, bet);
    //     player.addPlayer(newPlayer);
    //     return ResponseEntity.ok("Data updated: " + name + " " + bet);
    // }

    @PostMapping("/joinGame")
    public ResponseEntity<String> joinGame(@RequestBody Map<String, Object> data) {
        System.out.println(data);
        for (Map.Entry<String, Object> entry : data.entrySet()) {
            if(entry.getKey() == "username"){
                name = entry.getValue().toString();
                System.out.println(name);
            } else {
                bet = Integer.parseInt(entry.getValue().toString());
                System.out.println(bet);
            }
        } 
        PlayerEntity newPlayer = new PlayerEntity(name, bet);
        System.out.println(newPlayer.getName()); 
        System.out.println(newPlayer.getBet()); 
        player.addPlayer(newPlayer);
         
        return ResponseEntity.ok().body("Data saved successfully");
    }

    @GetMapping("/getPlayers")
    public HashMap<Integer, PlayerEntity> getPlayers(){
        return player.getPlayers();
    }
}
