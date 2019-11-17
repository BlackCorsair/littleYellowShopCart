package com.littleyellowshopcart.littleyellowshopcart;

import com.littleyellowshopcart.littleyellowshopcart.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class RequestController {
    @Autowired
    private RequestRepository rr;

    @CrossOrigin(origins = "http://localhost:8080/requests/*")
    @GetMapping("/requests/{id}")
    public Request getRequestById(@PathVariable("id") long id) {

        try {
            Request request = this.rr.findById(id).get();
            return request;
        } catch (java.util.NoSuchElementException e) {
            return null;
        }
    }

    @CrossOrigin(origins = "http://localhost:8080/requests")
    @GetMapping("/requests")
    public List<Request> getRequest() {
        return rr.findAll();
    }

    @CrossOrigin(origins = "http://localhost:8080/requests/*")
    @DeleteMapping("/requests/{id}")
    public String deleteRequestById(@PathVariable("id") long id) {
        try {
            rr.deleteById(id);
            return "{'status': 200}";
        } catch (Exception e) {
            return "{'status': 501}";
        }
    }
}