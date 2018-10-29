package com.free.one.service;

import com.free.one.dao.UserDao;
import com.free.one.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    public UserDao mUserDao;

    public void add(User user) {
        //TODO logic
        mUserDao.save(user);
    }

    public void delete(int id) {
        //TODO logic
        mUserDao.delete(id);
    }

    public void update(User user) {
        //TODO logic
        mUserDao.update(user);
    }

    public User load(int id) {
        //TODO logic
        return mUserDao.load(id);
    }

    public void loadAll() {
        //TODO logic
        mUserDao.loadAll();
    }

    public List<User> loadAll(String userName) {
        String hql = "select new User(id,name) from User where name= ?0";
        return mUserDao.list(hql, new String[]{userName});
    }

}
