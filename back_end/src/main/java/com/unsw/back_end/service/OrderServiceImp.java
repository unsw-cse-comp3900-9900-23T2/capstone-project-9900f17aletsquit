package com.unsw.back_end.service;

import com.unsw.back_end.mapper.CarspaceMapper;
import com.unsw.back_end.mapper.OrderMapper;
import com.unsw.back_end.mapper.UserMapper;
import com.unsw.back_end.pojo.Carspace;
import com.unsw.back_end.pojo.Order;
import com.unsw.back_end.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.LinkedList;

@Service
public class OrderServiceImp implements OrderService {
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    CarspaceMapper carspaceMapper;
    @Autowired
    UserMapper userMapper;
    @Override
    public int dateSearch(Date fromtime, Date totime) {
        LinkedList<Order> orders = orderMapper.dateSearch(fromtime, totime);
        if(orders.size()==0){
            return 0;
        }
        return 1;
    }

    @Override
    public int addOrder(Order order) {
        Double sum = order.getSum();
        Integer customerId = order.getCustomerId();
        Integer providerId = order.getProviderId();
        User customer = userMapper.selectByPrimaryKey(customerId);
        User provider = userMapper.selectByPrimaryKey(providerId);
        Double walletExtra1 = customer.getWalletExtra();
        Double walletExtra2 = provider.getWalletExtra();
        Double new_wallet1 = walletExtra1-sum;
        if(new_wallet1<0.0){
            return 2;
        }
        Double new_wallet2 = walletExtra2+sum;
        customer.setWalletExtra(new_wallet1);
        provider.setWalletExtra(new_wallet2);
        userMapper.updateByPrimaryKeySelective(customer);
        userMapper.updateByPrimaryKeySelective(provider);
        return orderMapper.insertSelective(order);
    }

    @Override
    public int editOrder(Order order) {
        Date date = new Date();
        System.out.println(date);
        Order order1 = orderMapper.selectByPrimaryKey(order.getOrderId());
        Date fromTime = order1.getFromTime();
        if(order1.getCurRank()!=null && order1.getHistoryComment()!=null){
            System.out.println(2);
            return 2;
        }
        if(date.compareTo(fromTime)>=0){
            Carspace carspace = carspaceMapper.selectByPrimaryKey(order1.getCarSpaceId());
            Integer ranknum = carspace.getRanknum();
            Double totalrank = carspace.getTotalrank();
            String curcomment = carspace.getCurcomment();
            String historyComment = order.getHistoryComment();
            Double new_rank = (totalrank+order.getCurRank())/(ranknum+1);
            if(curcomment!=null&&curcomment.length()+historyComment.length()>30000){
                return 3;
            }else {
                String new_comment = historyComment+curcomment;
                carspace.setCurcomment(new_comment);
                carspace.setRanknum(ranknum+1);
                carspace.setTotalrank(new_rank);
                carspaceMapper.updateByPrimaryKeySelective(carspace);
            }
            return orderMapper.updateByPrimaryKeySelective(order);
        }else {
            return 0;
        }
    }

    @Override
    public int removeOrder(int orderId) {
        Date date = new Date(System.currentTimeMillis() + 7*24*3600*1000);
        Order order1 = orderMapper.selectByPrimaryKey(orderId);
        Date fromTime = order1.getFromTime();
        if(date.compareTo(fromTime)>=0){
            return 0;
        }else{
            Double sum = order1.getSum();
            Integer customerId = order1.getCustomerId();
            Integer providerId = order1.getProviderId();
            User customer = userMapper.selectByPrimaryKey(customerId);
            User provider = userMapper.selectByPrimaryKey(providerId);
            Double walletExtra1 = customer.getWalletExtra();
            Double walletExtra2 = provider.getWalletExtra();
            Double new_wallet1 = sum+walletExtra1;
            Double new_wallet2 = walletExtra2-sum;
            customer.setWalletExtra(new_wallet1);
            provider.setWalletExtra(new_wallet2);
            userMapper.updateByPrimaryKeySelective(customer);
            userMapper.updateByPrimaryKeySelective(provider);
            orderMapper.deleteByPrimaryKey(orderId);
            return 1;
        }

    }

}
