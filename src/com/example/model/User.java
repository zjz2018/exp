package com.example.model;

// default package

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

/**
 * User entity.
 * 
 */
@Entity
@Table(name = "T_USER")
public class User implements java.io.Serializable {
    private static final long serialVersionUID = -898132427123387038L;

    private Long id;
    private String name;// 姓名
    private String password;// 密码
    private Dept dept;
    private Set<Role> roleSet = new HashSet<Role>();

    /** default constructor */
    public User() {
    }

    // Property accessors
    @SequenceGenerator(name = "generator", sequenceName = "SEQ_USER_ID", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
    @Column(name = "ID", nullable = false)
    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "NAME", nullable = false, length = 30)
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "PASSWORD", nullable = false, length = 30)
    public String getPassword() {
        return password;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DEPT_ID")
    public Dept getDept() {
        return dept;
    }

    @ManyToMany(targetEntity = Role.class, cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.LAZY)
    @JoinTable(name = "USER_ROLE1", joinColumns = { @JoinColumn(name = "USER_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
    public Set<Role> getRoleSet() {
        return roleSet;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDept(Dept dept) {
        this.dept = dept;
    }

    public void setRoleSet(Set<Role> roleSet) {
        this.roleSet = roleSet;
    }

}