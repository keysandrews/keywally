package com.horserace.persistence.model;

import com.horserace.persistence.model.enums.Suit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
@Builder
public class PlayerEntity {
    private String name;
    private int bet;
    private Suit suit;
}
