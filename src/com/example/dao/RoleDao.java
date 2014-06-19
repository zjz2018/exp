package com.example.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.base.dao.BaseDao;
import com.example.model.User;

@Repository
public class RoleDao {
    @Autowired
    public BaseDao baseDao;

    public List<User> getUserListByRoleId(String roleId) {
        StringBuffer hql = new StringBuffer();
        hql.append("select elements(r.userSet) from Role r where r.id=?");
        List<User> list = baseDao.findByHql(hql.toString(),roleId);
        return list;
    }

    public String createHql() {
        StringBuffer hql = new StringBuffer();
        hql.append("from Role");
        return hql.toString();
    }
    
    public void deleteRoleUser(String roleId){
        StringBuffer sql = new StringBuffer();
        sql.append("delete from USER_ROLE T WHERE T.ROLE_ID=?");
        baseDao.findBySql(sql.toString(),roleId);
    }

}
