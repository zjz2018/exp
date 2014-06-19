package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "T_PERMISSION")
public class Permission implements java.io.Serializable {
    private Long id;
    private String name;

    @SequenceGenerator(name = "generator", sequenceName = "SEQ_PERMISSION_ID", allocationSize = 1)
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

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

}
