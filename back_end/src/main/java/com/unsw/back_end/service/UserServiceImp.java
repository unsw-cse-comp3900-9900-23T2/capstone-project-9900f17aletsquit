package com.unsw.back_end.service;

import com.unsw.back_end.mapper.UserMapper;
import com.unsw.back_end.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User login(String username, String password) {
        User user = userMapper.selectByUsername(username);
        if(user==null){
            return null;
        }
        if(password.equals(user.getUPassword())){
            if(user.getCurStatus()){
                return null;
            }
            user.setCurStatus(true);
            userMapper.updateByPrimaryKeySelective(user);
            return user;
        }
        return null;

    }

    @Override
    public int register(User user) {
        User user1 = userMapper.selectByUsername(user.getUsername());
        User user2 = userMapper.selectByEmail(user.getEmail());
        if(user1== null && user2 == null){
            int insert = userMapper.insertSelective(user);
            System.out.println("insert=========="+insert);
            return insert;
        }else{
            return 0;
        }

    }

    @Override
    public int logout(int userId) {
        User user = userMapper.selectByPrimaryKey(userId);
        if(!user.getCurStatus()){
            return 0;
        }
        user.setCurStatus(false);
        return userMapper.updateByPrimaryKeySelective(user);
    }


    @Override
    public User sendProfile(int token) {
        User user = userMapper.selectByPrimaryKey(token);
        return user;
    }

    @Override
    public int editProfile(User user) {
        User user1 = userMapper.selectByUsername(user.getUsername());
        User user2 = userMapper.selectByEmail(user.getEmail());
        if(user1== null && user2 == null){
            return userMapper.updateByPrimaryKeySelective(user);
        }else{
            return 0;
        }
    }


}
