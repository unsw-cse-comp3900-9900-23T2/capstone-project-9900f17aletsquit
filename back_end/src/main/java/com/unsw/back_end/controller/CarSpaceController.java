package com.unsw.back_end.controller;

import com.unsw.back_end.pojo.Carspace;
import com.unsw.back_end.service.CarSpaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/carspace")
public class CarSpaceController {
    @Autowired
    CarSpaceService carSpaceService;

    @PostMapping("/add")
    public ResponseEntity<?> addNewSpace(@RequestHeader("token") String headerValue, @RequestBody Carspace carspace){
        carspace.setUserId(Integer.parseInt(headerValue));
        int i = carSpaceService.addCarSpace(carspace);
        if(i!=0){
            return ResponseEntity.ok("Adding a new car space successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Faild to add a new car space");
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateSPace(@RequestHeader("token") String headerValue, @RequestBody Carspace carspace){
        carspace.setUserId(Integer.parseInt(headerValue));
        System.out.println(carspace);
        int i = carSpaceService.updateCarSpace(carspace);
        if(i!=0){
            return ResponseEntity.ok("You have updated your car space successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Faild to update your car space");
    }

    @GetMapping("/queryOwned")
    public ResponseEntity<?> queryYourOwnedSPace(@RequestHeader("token") String headerValue, @RequestParam("pageNum") Integer pageNum){
        int i = Integer.parseInt(headerValue);
        int size = carSpaceService.quertPageNum(i);
        String pagesum = (int)Math.ceil((double) size / 3)+"";
        return ResponseEntity.ok().header("pageSum",pagesum).body(carSpaceService.queryYourOwnedSpace(i,pageNum));
    }


}
