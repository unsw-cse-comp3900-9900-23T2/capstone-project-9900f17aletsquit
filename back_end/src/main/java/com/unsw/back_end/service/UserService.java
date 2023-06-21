package com.unsw.back_end.service;

import com.unsw.back_end.pojo.User;

public interface UserService {
    public User login(String username, String password);

    public int register(User user);

    public void logout(int userId);

    public User sendProfile(int token);

    public int editProfile(User user);

}
