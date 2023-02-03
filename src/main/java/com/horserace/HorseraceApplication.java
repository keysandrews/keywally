package com.horserace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.horserace.service.*;
import com.horserace.persistence.model.*;
@SpringBootApplication
public class HorseraceApplication {

	public static void main(String[] args) {
		GameImpl x = new GameImpl();
		x.startGame();
		for(GameSimEntity i : x.instructions){
			System.out.print(i.toString());
		}
		
		SpringApplication.run(HorseraceApplication.class, args);
	}

}
