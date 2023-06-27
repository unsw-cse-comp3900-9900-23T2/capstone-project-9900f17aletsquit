package com.unsw.back_end.service;

import com.unsw.back_end.mapper.OrderMapper;
import com.unsw.back_end.pojo.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.LinkedList;

@Service
public class OrderServiceImp implements OrderService {
    @Autowired
    OrderMapper orderMapper;
    @Override
    public int dateSearch(Date fromtime, Date totime) {
        LinkedList<Order> orders = orderMapper.dateSearch(fromtime, totime);
        if(orders.size()==0){
            return 0;
        }
        return 1;
    }
}
