package com.unsw.back_end.service;

import com.unsw.back_end.pojo.Order;

import java.util.Date;
import java.util.LinkedList;

public interface OrderService {
    public int dateSearch(Date fromtime,Date totime);
}
