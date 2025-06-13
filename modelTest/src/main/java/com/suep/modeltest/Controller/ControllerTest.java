package com.suep.modeltest.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerTest {

    @RequestMapping("/hello")
    public String hello(){
        return "hello";
    }

}
