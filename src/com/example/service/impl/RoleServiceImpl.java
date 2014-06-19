package com.example.service.impl;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.base.dao.BaseDao;
import com.example.action.vo.UserNode;
import com.example.dao.DeptDao;
import com.example.dao.RoleDao;
import com.example.model.Dept;
import com.example.model.Role;
import com.example.model.User;
import com.example.service.RoleService;

@Service("roleService")
public class RoleServiceImpl implements RoleService {

    @Autowired
    public RoleDao roleDao;
    @Autowired
    public DeptDao deptDao;
    @Autowired
    public BaseDao baseDao;

    public List<UserNode> getUserNodeList(String roleId) {
        List<UserNode> list = new LinkedList<UserNode>();
        List<User> users = roleDao.getUserListByRoleId(roleId);
        List<Dept> deptList = deptDao.getDeptList();
        for (Dept dept : deptList) {
            list.add(new UserNode(dept.getId(), dept.getName(), dept.getPid(), true, null));
            List<User> userList = deptDao.getUserListByDeptId(dept.getId().toString());
            for (User user : userList) {
                list.add(new UserNode(user.getId(), user.getName(), user.getDept().getId(), false, users.contains(user) ? true : false));
            }
        }
        return list;
    }

    public void setUserRole(String roleId, String[] userIds) {
        roleDao.deleteRoleUser(roleId);
        for (int i = 0; i < userIds.length; i++) {
            if(StringUtils.isEmpty(userIds[i])){
                break;
            }
            User user = baseDao.findByPrimaryKey(User.class, Long.valueOf(userIds[i]));
            user.getRoleSet().add(baseDao.findByPrimaryKey(Role.class, Long.valueOf(roleId)));
            baseDao.saveOrUpdate(user);
        }
    }

    public String createHql() {
        return roleDao.createHql();
    }
}
