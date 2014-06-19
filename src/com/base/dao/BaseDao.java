package com.base.dao;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface BaseDao {

    public abstract int querySqlCount(final String strSql, final Object... params) throws Exception;

    public abstract List<String[]> querySql(final String strSql, final int start, final int pageSize, final Object... params);

    public abstract int queryHqlCount(final String strHql, final Object... params) throws Exception;

    public abstract List queryHql(final String strHql, final int start, final int pageSize, final Object... params);

    public abstract List findByHql(final String hql, final Object... params);

    public abstract List<String[]> findBySql(final String strSql, final Object... params);

    public abstract <T> T findByPrimaryKey(Class<T> class1, Serializable serializable);

    public <T> T loadByPrimaryKey(Class<T> clazz, Serializable key);

    public abstract void update(Object obj);

    public abstract <T> void update(Collection<T> collection);

    public abstract <T> void saveOrUpdate(Object obj);

    public abstract Serializable insert(Object obj);

    public abstract <T> Collection<T> insert(Collection<T> collection);

    public abstract void delete(Object obj);

    public abstract <T> void delete(Collection<T> collection);

    public <T> List<T> findBySqlToMap(String sql);

}
