package com.free.one.controller;

import com.free.one.entity.User;
import com.free.one.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    public UserService mService;

    @PostMapping("/add")
    public void addUser(@RequestBody User user) {
        mService.add(user);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable int id) {
        mService.delete(id);
    }

    @PutMapping("/update")
    public void update(@RequestBody User user) {
        mService.update(user);
    }

    @RequestMapping("/test/{name}")
    public List<User> loadAll(@PathVariable String name) {
        return mService.loadAll(name);
    }
}
