package com.base.service;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import com.base.util.PageNavigator;

public interface BaseService {

    public List searchSql(String sql, PageNavigator pageNavigator, Object... params);

    public List findByHql(String hql, Object... params);

    public List searchHql(String hql, PageNavigator pageNavigator, Object... params);

    public abstract <T> T findByPrimaryKey(Class<T> class1, Serializable serializable);

    public <T> T loadByPrimaryKey(Class<T> clazz, Serializable key);

    public abstract void update(Object obj);

    public abstract <T> void update(Collection<T> collection);

    public abstract <T> void saveOrUpdate(Object obj);

    public abstract Serializable insert(Object obj);

    public abstract <T> Collection<T> insert(Collection<T> collection);

    public abstract void delete(Object obj);

    public abstract <T> void deleteById(Class<T> clazz, Serializable id);

    public abstract <T> void delete(Collection<T> collection);

    public <T> List<T> findBySqlToMap(String sql);

}
