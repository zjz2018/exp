package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "T_DEPT")
public class Dept implements java.io.Serializable {
    private Long id;
    private String name;
    private Long pid;

    @SequenceGenerator(name = "generator", sequenceName = "SEQ_DEPT_ID", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
    @Column(name = "ID", nullable = false)
    public Long getId() {
        return id;
    }

    @Column(name = "NAME", length = 30)
    public String getName() {
        return name;
    }

    @Column(name = "PID", length = 30)
    public Long getPid() {
        return pid;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

}
