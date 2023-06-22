package com.unsw.back_end.mapper;

import com.unsw.back_end.pojo.Carspace;

import java.util.LinkedList;
import java.util.List;

public interface CarspaceMapper {
    int deleteByPrimaryKey(Integer carSpaceId);

    int insert(Carspace record);

    int insertSelective(Carspace record);

    Carspace selectByPrimaryKey(Integer carSpaceId);

    Carspace selectByAddress(String address);

    LinkedList<Carspace> selectByUserId(Integer userId);

    int updateByPrimaryKeySelective(Carspace record);

    int updateByPrimaryKey(Carspace record);




}