package com.horserace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.horserace.service.*;
import com.horserace.persistence.model.*;

@SpringBootApplication
public class HorseraceApplication {

	public static void main(String[] args) {

		Game game = new GameImpl();
		
		for(GameSimEntity i : game.startGame()){
			System.out.println(i.getAction().toString() + " " + i.getType().toString() + " [" + i.getCard().getRank().toString() + ", " + i.getCard().getSuit().toString() + "] " + i.getPosition());
		}
		
		SpringApplication.run(HorseraceApplication.class, args);
	}

}
