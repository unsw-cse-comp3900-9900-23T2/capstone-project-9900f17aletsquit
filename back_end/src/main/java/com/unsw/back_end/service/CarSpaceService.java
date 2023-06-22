package com.unsw.back_end.service;

import com.unsw.back_end.pojo.Carspace;

import java.util.LinkedList;

public interface CarSpaceService {
    public int addCarSpace(Carspace carspace);

    public int updateCarSpace(Carspace carspace);

    public LinkedList<Carspace> queryYourOwnedSpace(int userId,int pageNum);

    public int quertPageNum(int userId);

}
