package com.free.one;

import com.free.one.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;

public class test {

    @Autowired
    public static UserService userService;

    public static void main(String[] args) {
        userService.loadAll("fxs");
    }
}
