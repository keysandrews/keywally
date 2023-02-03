package com.horserace.persistence.model;

import com.horserace.persistence.model.enums.Rank;
import com.horserace.persistence.model.enums.Suit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@AllArgsConstructor
@Getter
@Setter
@Builder
public class CardEntity {   
    private final Suit suit;
    private final Rank rank;

}


