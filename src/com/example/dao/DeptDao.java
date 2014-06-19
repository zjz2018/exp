package com.example.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.base.dao.BaseDao;
import com.example.model.Dept;
import com.example.model.User;

@Repository
public class DeptDao {
    @Autowired
    public BaseDao baseDao;

    public String createHql() {
        StringBuffer hql = new StringBuffer();
        hql.append("from Dept");
        return hql.toString();
    }

    public List<Dept> getDeptList() {
        StringBuffer hql = new StringBuffer();
        hql.append("from Dept");
        return baseDao.findByHql(hql.toString());
    }

    public List<User> getUserListByDeptId(String deptId) {
        StringBuffer hql = new StringBuffer();
        hql.append("from User t where t.dept.id=?");
        return baseDao.findByHql(hql.toString(),deptId);
    }

}
