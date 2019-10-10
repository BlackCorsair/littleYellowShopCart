package com.littleyellowshopcart.littleyellowshopcart;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.Arrays;
import java.util.List;
import java.util.Random;


@Controller
public class Greeter {
    private List<String> randomVisitor = Arrays.asList("guate", "pipiolo", "panocho", "héroe",
                                                        "teleco", "jirafa", "jenkins lover", "titan");

    @GetMapping("/")
    public String greeter(Model model) {
        model.addAttribute("visitor", this.randomVisitor.get(new Random().nextInt(this.randomVisitor.size())));
        return "home";
    }
}
