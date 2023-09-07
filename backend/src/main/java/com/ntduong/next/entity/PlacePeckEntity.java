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
@Table(name = "place_peck")
public class PlacePeckEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long placePeckId;
    private Long placeId;
    private Long peckId;
}
