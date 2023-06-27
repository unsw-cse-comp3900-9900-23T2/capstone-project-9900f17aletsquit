package com.unsw.back_end.controller;

import com.unsw.back_end.mapper.OrderMapper;
import com.unsw.back_end.pojo.Order;
import com.unsw.back_end.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.LinkedList;


@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    @GetMapping("/dateSearch")
    public ResponseEntity<?> dateSearch(@RequestParam("fromtime")String fromtime, @RequestParam("totime")String totime) throws ParseException {
        String pattern = "yyyy-MM-dd";
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        Date fromdate = sdf.parse(fromtime);
        Date todate = sdf.parse(totime);
        int i = orderService.dateSearch(fromdate, todate);
        if (i==0){
            return ResponseEntity.ok("The date and time of your application are reasonable.");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("The date and time of your parking space have been reserved by others.");

//        System.out.println(order.getFromTime());
    }
}
