package com.unsw.back_end.service;

import com.unsw.back_end.mapper.CarspaceMapper;
import com.unsw.back_end.pojo.Carspace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

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

    @Override
    public int updateCarSpace(Carspace carspace) {
        Integer carSpaceId = carspace.getCarSpaceId();
        LinkedList<Carspace> carspaces = carspaceMapper.selectByUserId(carspace.getUserId());
        Carspace carspace2 = carspaceMapper.selectByPrimaryKey(carSpaceId);
        if(carspaces.contains(carspace2)){
            String address = carspace.getAddress();
            Carspace carspace1 = carspaceMapper.selectByAddress(carspace.getAddress());
            if(carspace1==null){
                return carspaceMapper.updateByPrimaryKeySelective(carspace);
            }
        }

        return 0;
    }

    @Override
    public LinkedList<Carspace> queryYourOwnedSpace(int userId, int pageNum) {
        LinkedList<Carspace> carspaces = carspaceMapper.selectByUserId(userId);
        int pageSize = 3;
        int count = 0;
        int size = carspaces.size();
        int start = pageNum*pageSize-3;

        LinkedList<Carspace> result = new LinkedList<Carspace>();
        if(pageNum*pageSize<=size){
            while(count<3){
                result.add(carspaces.get(start+count));
                count++;
            }
        }else{
            int stopNum = pageSize-(pageNum*pageSize -size);
            while(count<stopNum){
                result.add(carspaces.get(start+count));
                count++;
            }
        }
        return result;
    }

    @Override
    public int quertPageNum(int userId) {
        LinkedList<Carspace> carspaces = carspaceMapper.selectByUserId(userId);
        return carspaces.size();
    }
}
