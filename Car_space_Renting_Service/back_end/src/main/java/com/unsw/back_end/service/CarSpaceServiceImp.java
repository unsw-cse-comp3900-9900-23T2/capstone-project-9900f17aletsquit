package com.unsw.back_end.service;

import com.unsw.back_end.mapper.CarspaceMapper;
import com.unsw.back_end.pojo.Carspace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarSpaceServiceImp implements CarSpaceService {
    @Autowired
    CarspaceMapper carspaceMapper;

    @Override
    public int addCarSpace(Carspace carspace) {
        Carspace carspace1 = carspaceMapper.selectByAddress(carspace.getAddress());
        if(carspace1==null){
            return carspaceMapper.insertSelective(carspace);
        }
        return 0;

    }
}
