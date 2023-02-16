package com.horserace.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import com.horserace.persistence.model.PlayerEntity;
import com.horserace.persistence.model.enums.Suit;
import com.horserace.service.PlayerImpl;


@Controller
public class WebSocketController {

    private String name;
    private int bet;
    private Suit suit;
    @Autowired
	private PlayerImpl player;

    @MessageMapping("/update/player")
    @SendTo("/topic/player")
    public PlayerEntity sendData(@RequestBody Map<String, Object> data) throws Exception {
        System.out.println("send Data");
        for (Map.Entry<String, Object> entry : data.entrySet()) {
            if(entry.getKey().equals("username")){
                name = entry.getValue().toString();
            } else if (entry.getKey().equals("bet") ){
                bet = Integer.parseInt(entry.getValue().toString());
            } else{
                suit = Suit.valueOf(entry.getValue().toString()); 
            }
        } 
        PlayerEntity newPlayer = new PlayerEntity(name, bet, suit);
        player.addPlayer(newPlayer);
        
        return newPlayer;
    }

}

