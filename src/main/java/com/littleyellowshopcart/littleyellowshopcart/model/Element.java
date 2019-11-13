package com.littleyellowshopcart.littleyellowshopcart.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Element {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    private String name;
    private boolean ticked = false;

    public Element() {
    }

    public Element(String name) {
        super();
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isTicked() {
        return ticked;
    }

    public void tick() {
        this.ticked = true;
    }

    public void untick() {
        this.ticked = false;
    }
}
