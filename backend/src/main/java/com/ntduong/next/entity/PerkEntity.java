package com.ntduong.next.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Setter
@Getter
@Entity
@Table(name = "perks")
public class PerkEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long peckId;
    private Long placeId;
    private String peckName;
}
