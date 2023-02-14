package com.horserace.controller;

import java.util.Map;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import com.horserace.persistence.model.PlayerEntity;
import com.horserace.persistence.model.enums.Suit;
import com.horserace.service.Player;
import com.horserace.service.PlayerImpl;

@Controller
public class WebSocketController {

    private String name;
    private int bet;
    private Suit suit;

    @MessageMapping("/update/player")
    @SendTo("/topic/player")
    public PlayerEntity sendData(@RequestBody Map<String, Object> data) throws Exception {
            for (Map.Entry<String, Object> entry : data.entrySet()) {
                if(entry.getKey() == "username"){
                    name = entry.getValue().toString();
                } else if (entry.getKey() == "bet"){
                    bet = Integer.parseInt(entry.getValue().toString());
                    System.out.println(bet);
                } else{
                    suit = Suit.valueOf(entry.getValue().toString()); 
                    System.out.println(suit);
                }
            } 
            PlayerEntity newPlayer = new PlayerEntity(name, bet, suit);
            //player.addPlayer(newPlayer);
            
            return newPlayer;
    }
}

