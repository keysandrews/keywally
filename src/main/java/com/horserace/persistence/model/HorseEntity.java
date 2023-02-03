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
public class HorseEntity {
    private Suit suit;
    private int position;

}
