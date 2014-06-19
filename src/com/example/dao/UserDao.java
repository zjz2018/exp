package com.example.dao;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.base.dao.BaseDao;
import com.example.model.User;

@Repository
public class UserDao {
    @Autowired
    private BaseDao baseDao;

    public String createHql(User user) {
        StringBuffer hql = new StringBuffer();
        hql.append("from User t where 1=1");
        if (null != user) {
            if (StringUtils.isNotBlank(user.getName())) {
                hql.append(" and t.name like '%" + user.getName() + "%" + "'");
            }
        }
        return hql.toString();
    }
}
