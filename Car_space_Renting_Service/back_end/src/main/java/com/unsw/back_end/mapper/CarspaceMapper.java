package com.unsw.back_end.mapper;

import com.unsw.back_end.pojo.Carspace;

public interface CarspaceMapper {
    int deleteByPrimaryKey(Integer carSpaceId);

    int insert(Carspace record);

    int insertSelective(Carspace record);

    Carspace selectByPrimaryKey(Integer carSpaceId);

    int updateByPrimaryKeySelective(Carspace record);

    int updateByPrimaryKey(Carspace record);

    Carspace selectByAddress(String address);

}