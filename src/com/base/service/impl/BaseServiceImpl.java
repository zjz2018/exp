package com.base.service.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.base.dao.BaseDao;
import com.base.service.BaseService;
import com.base.util.PageNavigator;

@Service("baseService")
public class BaseServiceImpl implements BaseService {
    @Autowired
    private BaseDao baseDao;

    public List searchSql(String sql, PageNavigator pageNavigator, Object... params) {
        List<String[]> result = new ArrayList<String[]>();
        try {
            if (pageNavigator != null) {
                pageNavigator.setRecordNumber(baseDao.querySqlCount(sql, params));
                int start = pageNavigator.getStartRecordNoOfCurrentPage() - 1;
                result = baseDao.querySql(sql, start, pageNavigator.getPageSize(), params);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    public List searchHql(String hql, PageNavigator pageNavigator, Object... params) {
        List result = new ArrayList();
        try {

            if (pageNavigator != null) {
                pageNavigator.setRecordNumber(baseDao.queryHqlCount(hql, params));
                int start = pageNavigator.getStartRecordNoOfCurrentPage() - 1;
                result = baseDao.queryHql(hql, start, pageNavigator.getPageSize(), params);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }

    public <T> void delete(Collection<T> collection) {
        baseDao.delete(collection);
    }

    public void delete(Object obj) {
        baseDao.delete(obj);
    }

    public <T> T findByPrimaryKey(Class<T> class1, Serializable serializable) {
        return baseDao.findByPrimaryKey(class1, serializable);
    }

    public <T> Collection<T> insert(Collection<T> collection) {
        return baseDao.insert(collection);
    }

    public Serializable insert(Object obj) {
        return baseDao.insert(obj);
    }

    public <T> T loadByPrimaryKey(Class<T> clazz, Serializable key) {
        return baseDao.loadByPrimaryKey(clazz, key);
    }

    public <T> void update(Collection<T> collection) {
        baseDao.update(collection);
    }

    public void update(Object obj) {
        baseDao.update(obj);
    }

    public <T> List<T> findBySqlToMap(String sql) {
        return baseDao.findBySqlToMap(sql);
    }

    public <T> void saveOrUpdate(Object obj) {
        this.baseDao.saveOrUpdate(obj);
    }

    public <T> void deleteById(Class<T> clazz, Serializable id) {
        Object obj = baseDao.findByPrimaryKey(clazz, id);
        this.baseDao.delete(obj);
    }

    public List findByHql(String hql, Object... params) {
        return baseDao.findByHql(hql, params);
    }

}
