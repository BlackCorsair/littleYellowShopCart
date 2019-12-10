package com.littleyellowshopcart.littleyellowshopcart;

import com.littleyellowshopcart.littleyellowshopcart.model.Element;
import com.littleyellowshopcart.littleyellowshopcart.model.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.json.*;
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
            return "{\"status\": 200}";
        } catch (Exception e) {
            return "{\"status\": 501}";
        }
    }

    @CrossOrigin(origins = "http://localhost:8080/requests/*")
    @DeleteMapping("/requests/{id}/{item}")
    public String deleteRequestElementById(@PathVariable("id") long id, @PathVariable("item") long element) {
        try {
            Request request = rr.findById(id).get();
            String out = request.deleteElementById(element);
            rr.save(request);
            return out;
        } catch (Exception e) {
            return "{'status': 501}";
        }
    }

    @CrossOrigin(origins = "http://localhost:8080/requests/*")
    @PostMapping("/requests/{id}/{elementName}")
    public String addElementToRequest(@PathVariable("id") long id, @PathVariable("elementName") String elementName) {
        try {
            Request request = rr.findById(id).get();
            Element element = new Element(elementName);
            String out = request.addElement(element);
            rr.save(request);
            return out;
        } catch (Exception e) {
            return "{'status': 501}";
        }
    }

    @CrossOrigin(origins = "http://localhost:8080/requests/*")
    @PostMapping("/newRequest")
    public String newRequest(@RequestBody String requestString) {
        try {
            JSONObject requestJson = new JSONObject(requestString);
            Request request = new Request(requestJson.get("request").toString());
            request.addElement(new Element(requestJson.get("element").toString()));
            rr.save(request);
            return "{\"status\": 200}";
        } catch (Exception e) {
            return "{'status': 501}";
        }
    }
}