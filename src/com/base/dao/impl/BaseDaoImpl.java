package com.base.dao.impl;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import javax.annotation.Resource;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.orm.hibernate3.HibernateTemplate;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;
import org.springframework.stereotype.Repository;

import com.base.dao.BaseDao;

@Repository("baseDao")
public class BaseDaoImpl extends HibernateDaoSupport implements BaseDao {

    @Resource(name = "hibernateTemplate")
    public void setSuperHibernateTemplate(HibernateTemplate hibernateTemplate) {
        super.setHibernateTemplate(hibernateTemplate);
    }

    public int queryHqlCount(final String strHql, final Object... params) throws Exception {
        String shql = strHql.substring(strHql.indexOf("from"), strHql.length());
        final String hql = "select count(*) " + shql;
        int count = 0;
        List result = new ArrayList();
        try {
            result = this.getHibernateTemplate().executeFind(new HibernateCallback() {
                public Object doInHibernate(Session session) throws HibernateException {
                    Query query = session.createQuery(hql);
                    for (int i = 0; params != null && i < params.length; i++) {
                        query.setString(i, params[i].toString());
                    }
                    return query.list();
                }
            });
        } catch (Exception e) {
            new Exception("not find");
        }
        if ((result == null) || (result.size() == 0)) {
            count = 0;
        } else {
            count = ((Number) result.get(0)).intValue();
        }
        return count;
    }

    @SuppressWarnings("unchecked")
    public List queryHql(final String strHql, final int start, final int pageSize, final Object... params) {
        List result = new ArrayList();
        try {
            result = (List) this.getHibernateTemplate().executeFind(new HibernateCallback() {
                public Object doInHibernate(Session session) throws HibernateException {
                    Query query = session.createQuery(strHql);
                    for (int i = 0; params != null && i < params.length; i++) {
                        query.setString(i, params[i].toString());
                    }
                    query.setMaxResults(pageSize);
                    query.setFirstResult(start);
                    return query.list();
                }
            });

        } catch (Exception e) {
        }
        return result;
    }

    public int querySqlCount(final String strSql, final Object... params) throws Exception {
        BigDecimal result = null;
        try {
            final String sql = "select count(*) from (" + strSql + ")";
            result = (BigDecimal) this.getHibernateTemplate().execute(new HibernateCallback() {
                public Object doInHibernate(Session session) throws HibernateException {
                    Query query = session.createSQLQuery(sql);
                    for (int i = 0; params != null && i < params.length; i++) {
                        query.setString(i, params[i].toString());
                    }
                    return query.uniqueResult();
                }
            });
        } catch (Exception e) {
            new Exception("not find");
        }
        return result.intValue();
    }

    @SuppressWarnings("unchecked")
    public List<String[]> querySql(final String strSql, final int start, final int pageSize, final Object... params) {
        List<String[]> result = new ArrayList<String[]>();
        try {
            List<Object[]> items = (List<Object[]>) this.getHibernateTemplate().executeFind(new HibernateCallback() {
                public Object doInHibernate(Session session) throws HibernateException {
                    Query query = session.createSQLQuery(strSql);
                    for (int i = 0; params != null && i < params.length; i++) {
                        query.setString(i, params[i].toString());
                    }
                    query.setMaxResults(pageSize);
                    query.setFirstResult(start);
                    return query.list();
                }
            });
            for (Object[] objs : items) {
                String[] s = new String[objs.length];
                for (int i = 0; i < objs.length; i++) {
                    s[i] = objs[i] == null ? "" : String.valueOf(objs[i]);
                }
                result.add(s);
            }
        } catch (Exception e) {
        }
        return result;
    }

    @SuppressWarnings("unchecked")
    public List<?> findByHql(final String hql, final Object... params) {
        List<?> result = new ArrayList();
        result = (List<?>) this.getHibernateTemplate().executeFind(new HibernateCallback() {
            public Object doInHibernate(Session session) throws HibernateException {
                Query query = session.createQuery(hql);
                for (int i = 0; params != null && i < params.length; i++) {
                    query.setString(i, params[i].toString());
                }
                return query.list();
            }
        });
        return result;
    }

    @SuppressWarnings("unchecked")
    public List<String[]> findBySql(final String strSql, final Object... params) {
        List<String[]> result = new ArrayList<String[]>();
        try {
            List<Object[]> items = (List<Object[]>) this.getHibernateTemplate().execute(new HibernateCallback() {
                public Object doInHibernate(Session session) throws HibernateException {
                    Query query = session.createSQLQuery(strSql);
                    for (int i = 0; params != null && i < params.length; i++) {
                        query.setString(i, params[i].toString());
                    }
                    List list = query.list();
                    return list;
                }
            });
            for (Object[] objs : items) {
                String[] s = new String[objs.length];
                for (int i = 0; i < objs.length; i++) {
                    s[i] = objs[i] == null ? "" : String.valueOf(objs[i]);
                }
                result.add(s);
            }
        } catch (Exception e) {
        }

        return result;
    }

    @SuppressWarnings("unchecked")
    public <T> T findByPrimaryKey(Class<T> clazz, Serializable key) {
        T obj = (T) getSession().get(clazz, key);
        return obj;
    }

    @SuppressWarnings("unchecked")
    public <T> T loadByPrimaryKey(Class<T> clazz, Serializable key) {
        T obj = (T) getSession().load(clazz, key);
        return obj;
    }

    public void update(Object obj) {
        getSession().update(obj);
    }

    public Serializable insert(Object obj) {
        return getSession().save(obj);
    }

    public void delete(Object obj) {
        getSession().delete(obj);
    }

    public <T> void update(Collection<T> objs) {
        if (objs == null || objs.isEmpty())
            return;
        Object t;
        for (Iterator<T> iterator = objs.iterator(); iterator.hasNext(); update(t))
            t = (Object) iterator.next();
    }

    @SuppressWarnings("unchecked")
    public <T> Collection<T> insert(Collection<T> objs) {
        List<T> result = new ArrayList<T>();
        if (objs == null || objs.isEmpty())
            return result;
        Object t;
        for (Iterator<T> iterator = objs.iterator(); iterator.hasNext();) {
            t = (Object) iterator.next();
            result.add((T) insert(t));
        }
        return result;
    }

    public <T> void delete(Collection<T> objs) {
        if (objs == null || objs.isEmpty())
            return;
        Object t;
        for (Iterator<T> iterator = objs.iterator(); iterator.hasNext(); delete(t))
            t = (Object) iterator.next();
    }

    @SuppressWarnings("unchecked")
    public <T> List<T> findBySqlToMap(String sql) {
        Query query = this.getSession().createSQLQuery(sql).setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP);
        return query.list();
    }

    public <T> void saveOrUpdate(Object obj) {
        this.getSession().saveOrUpdate(obj);
    }

}
