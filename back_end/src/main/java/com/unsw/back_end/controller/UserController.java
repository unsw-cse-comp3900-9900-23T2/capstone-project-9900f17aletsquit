package com.unsw.back_end.controller;

import com.unsw.back_end.pojo.Carspace;
import com.unsw.back_end.pojo.User;
import com.unsw.back_end.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user){
        String username = user.getUsername();
        String uPassword = user.getUPassword();

        User user1= userService.login(username, uPassword);

        if(user1 == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Login failed");
        }else{
            if(user1.getUserId()==0){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("You have already login");
            }
            String token = user1.getUserId()+"";
            return ResponseEntity.ok().header("token",token).body("Login success and token sent successfully");
        }
    }

    @PostMapping("/loginAdmin")
    public ResponseEntity<?> loginAdmin(@RequestBody User user){
        String username = user.getUsername();
        String uPassword = user.getUPassword();
        User user1= userService.login(username, uPassword);
        if(user1 == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Login failed");
        }else{
            String token = user.getUserId()+"";
            return ResponseEntity.ok().header("token",token).body("Login success admin");
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user){

        User register = userService.register(user);
        System.out.println("controller = "+user);
        if(register!=null){
            return ResponseEntity.ok("User created successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("register failed");
    }

    @PutMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("token") String headerValue){

        User logout = userService.logout(Integer.parseInt(headerValue));
        if(logout!=null){
            return ResponseEntity.ok("logout successfully");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("you have already logged out");
        }

    }

    @PutMapping("/logoutAdmin")
    public ResponseEntity<?> logoutAdmin(@RequestHeader("token") String headerValue){

        User logout = userService.logout(Integer.parseInt(headerValue));
        if(logout!=null){
            return ResponseEntity.ok("logout successfully");
        }else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("you have already logged out");
        }

    }

    @GetMapping("/sendProfile")
    public ResponseEntity<?> sendProfile(@RequestHeader("token") String headerValue){
        int token = Integer.parseInt(headerValue);
        return ResponseEntity.ok(userService.sendProfile(token));
    }

    @PutMapping("/editProfile")
    public ResponseEntity<?> editProfile(@RequestHeader("token") String headerValue, @RequestBody User user){
        int i = Integer.parseInt(headerValue);
        user.setUserId(i);
        User i1 = userService.editProfile(user);
        if(i1!=null){
            return ResponseEntity.ok("edit profile success");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("edit profile failed");
    }


}
