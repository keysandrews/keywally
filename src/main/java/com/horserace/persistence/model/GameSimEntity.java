package com.horserace.persistence.model;

import com.horserace.persistence.model.enums.Action;
import com.horserace.persistence.model.enums.Type;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
public class GameSimEntity {

    private final Action action;
    private final Type type;
    private final CardEntity card;
    private final int position;
    private final boolean forward;
    
}
