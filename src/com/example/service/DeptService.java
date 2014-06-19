package com.example.service;

import java.util.List;

import com.example.model.Dept;
import com.example.model.User;


public interface DeptService {
	
	public List<Dept> getDeptList();

    
    public List<User> getUserListByDeptId(String deptId);
}
