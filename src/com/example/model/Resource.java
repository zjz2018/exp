package com.example.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
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
import javax.persistence.OrderBy;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.util.ReflectionUtils;

/**
 * 受保护的资源.
 * 注释见{@link User}.
 * 
 * @author shiweijun
 */
@Entity
@Table(name = "tm_resource")
public class Resource implements java.io.Serializable {

    // -- resourceType常量 --//
    public static final String URL_TYPE = "url";
    public static final String MENU_TYPE = "menu";
    private Long id;
    private String resourceType;
    private String value;
    private double position;
    private List<Authority> authorityList = new ArrayList<Authority>();

    /** * roles. */
    private Set<Role> roles = new HashSet<Role>(0);

    /** * 是否授权. */
    private Boolean authorized;

    @SequenceGenerator(name = "generator", sequenceName = "SEQ_RESOURCE_ID", allocationSize = 1)
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "generator")
    @Column(name = "ID", nullable = false)
    public Long getId() {
        return id;
    }

    /**
     * 资源类型.
     */
    @Column(nullable = false)
    public String getResourceType() {
        return resourceType;
    }

    public void setResourceType(String resourceType) {
        this.resourceType = resourceType;
    }

    /**
     * 资源标识.
     */
    @Column(nullable = false, unique = true)
    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    /**
     * 资源在SpringSecurity中的校验顺序字段.
     */
    public double getPosition() {
        return position;
    }

    public void setPosition(double position) {
        this.position = position;
    }

    /**
     * 可访问该资源的授权集合.
     */
    @ManyToMany
    @JoinTable(name = "SS_RESOURCE_AUTHORITY", joinColumns = { @JoinColumn(name = "RESOURCE_ID") }, inverseJoinColumns = { @JoinColumn(name = "AUTHORITY_ID") })
    @Fetch(FetchMode.JOIN)
    @OrderBy("id")
    public List<Authority> getAuthorityList() {
        return authorityList;
    }

    public void setAuthorityList(List<Authority> authorityList) {
        this.authorityList = authorityList;
    }

    /** * @return roles. */
    @ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.LAZY)
    @JoinTable(name = "tm_role_resc", joinColumns = { @JoinColumn(name = "RESC_ID") }, inverseJoinColumns = { @JoinColumn(name = "ROLE_ID") })
    public Set<Role> getRoles() {
        return roles;
    }

    /** * @param roles roles. */
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    /** * @return is authorized. */
    @Transient
    public Boolean getAuthorized() {
        return authorized;
    }

    /** * @param authorized is authorized. */
    public void setAuthorized(Boolean authorized) {
        this.authorized = authorized;
    }

    /**
     * 可访问该资源的授权名称字符串, 多个授权用','分隔.
     */
    @Transient
    public String getAuthNames() {
        return null;
        // return ReflectionUtils.convertElementPropertyToString(authorityList, "name", ",");
    }

    public void setId(Long id) {
        this.id = id;
    }
}
