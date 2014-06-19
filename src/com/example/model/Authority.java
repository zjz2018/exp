package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.apache.commons.lang.builder.ToStringBuilder;

/**
 * 权限.
 * 注释见{@link User}.
 * 
 * @author shiweijun
 */
@Entity
@Table(name = "TM_AUTHORITY")
public class Authority {
    private Long id;
    private String name;
    private String displayName;

    public Authority() {
    }

    public Authority(Long id, String name, String displayName) {
        this.id = id;
        this.name = name;
        this.displayName = displayName;
    }

    @SequenceGenerator(name = "generator", sequenceName = "SEQ_AUTHORITY_ID", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
    @Column(name = "ID", nullable = false)
    public Long getId() {
        return id;
    }

    @Column(nullable = false, unique = true)
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    public void setId(Long id) {
        this.id = id;
    }
}
