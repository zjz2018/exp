package com.example.service;

import java.util.List;

import com.example.action.vo.UserNode;

public interface RoleService {

    public String createHql();

    public List<UserNode> getUserNodeList(String roleId);

    public void setUserRole(String roleId, String[] userIds);

}
