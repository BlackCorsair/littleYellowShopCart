package com.littleyellowshopcart.littleyellowshopcart;

import com.littleyellowshopcart.littleyellowshopcart.model.Element;
import com.littleyellowshopcart.littleyellowshopcart.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;
import java.util.Random;


@Controller
public class MainPageController {
    private List<String> randomVisitor = Arrays.asList("guate", "pipiolo", "panocho", "héroe",
            "teleco", "jirafa", "jenkins lover", "titan");

    @Autowired
    private RequestRepository rr;

    @PostConstruct
    public void init() {
        for (String random : this.randomVisitor) {
            Element e = new Element(random);
            Request r = new Request(random);
            r.addElement(e);
            rr.save(r);
        }
    }

    @CrossOrigin(origins = "http://localhost:8080/*")
    @GetMapping("/")
    public String greeter(Model model) {
        model.addAttribute("visitor", this.randomVisitor.get(new Random().nextInt(this.randomVisitor.size())));
        model.addAttribute("requests", rr.findAll());
        return "home";
    }
}
