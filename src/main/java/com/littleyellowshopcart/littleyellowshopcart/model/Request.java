package com.littleyellowshopcart.littleyellowshopcart.model;

import javax.persistence.*;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Request {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String title;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Element> elements = new ArrayList<>();

    protected Request() {
    }

    public Request(String title) {
        super();
        this.title = title;
    }

    public String deleteElementById(long id) {

        try {
            for (Element element : this.elements) {
                if (element.id == id) {
                    System.out.println("removing element: " + element.id);
                    this.elements.remove(element);
                    for (Element e : this.elements)
                        System.out.println("element: " + e.id);
                    return "{\"status\": 200}";
                }
            }
        } catch (Exception e) {
            System.out.println(e);
            return "{\"status\": 501}";
        }
        return "{\"status\": 501}";
    }

    public String addElementUnchecked(String name) {
        try {
            Element element = new Element(name);
            this.elements.add(element);
            return "{\"status\": 200}";
        } catch (Exception e) {
            System.out.println(e);
            return "{\"status\": 501}";
        }
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Element> getElements() {
        return elements;
    }

    public String addElement(Element element) {
        try {
            this.elements.add(element);
            return "{\"status\": 200}";
        } catch (Exception e) {
            System.out.println(e);
            return "{\"status\": 501}";
        }
    }
}
