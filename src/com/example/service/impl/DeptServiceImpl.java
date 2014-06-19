package com.example.service.impl;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.dao.DeptDao;
import com.example.model.Dept;
import com.example.model.User;
import com.example.service.DeptService;

@Service("deptService")
public class DeptServiceImpl implements DeptService {

    @Autowired
    public DeptDao deptDao;

    public List<Dept> getDeptList() {
        return deptDao.getDeptList();
    }

	public List<User> getUserListByDeptId(String deptId) {


		return deptDao.getUserListByDeptId(deptId);
	}

}
