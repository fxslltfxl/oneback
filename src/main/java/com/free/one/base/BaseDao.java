package com.free.one.base;


import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.support.HibernateDaoSupport;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.ParameterizedType;
import java.util.List;

@Transactional
public class BaseDao<T> extends HibernateDaoSupport {

    @Autowired
    public void setSessionFactoryBase(SessionFactory sessionFactory) {
        super.setSessionFactory(sessionFactory);
    }

    /**
     * 创建一个Class的对象来获取泛型的class
     */
    private Class<T> clz;

    @SuppressWarnings("unchecked")
    public Class<T> getClz() {
        if (clz == null) {
            clz = (Class<T>) (((ParameterizedType) this.getClass()
                    .getGenericSuperclass())
                    .getActualTypeArguments()[0]);
        }
        return clz;
    }

    public void save(T t) {
        this.getHibernateTemplate().save(t);
    }

    public void saveOrUpdate(T t) {
        this.getHibernateTemplate().saveOrUpdate(t);
    }

    public void delete(int id) {
        this.getHibernateTemplate().delete(this.load(id));
    }

    public void update(T t) {
        this.getHibernateTemplate().update(t);
    }

    public T load(int id) {
        return this.getHibernateTemplate().load(getClz(), id);
    }

    public List<T> loadAll() {
        return this.getHibernateTemplate().loadAll(getClz());
    }

    @SuppressWarnings("unchecked")
    public List<T> list(String hql, Object[] args) {
        @SuppressWarnings("deprecation")
        Query query = this.getSessionFactory().getCurrentSession().createQuery(hql,getClz());
        for (int i = 0; i < args.length; i++) {
            query.setParameter(i, args[i]);
        }
        List<T> list = query.list();
        return list;
    }

}
