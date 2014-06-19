package com.example.action;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;

import com.base.action.BaseAction;
import com.base.service.BaseService;
import com.example.action.vo.UserNode;
import com.example.model.Role;
import com.example.service.RoleService;

@Namespace("/system/role")
@Results({ @Result(name = BaseAction.RELOAD, location = "role.action?id=${id}", type = "redirect") })
public class RoleAction extends BaseAction {

    @Autowired
    private BaseService baseService;
    @Autowired
    private RoleService roleService;
    // 角色id
    private String id;
    private Role role;
    private List<Role> resultList = new ArrayList<Role>();
    private List<UserNode> userNodeList = new ArrayList<UserNode>();
    private String userArray;

    @Override
    public String execute() {
        resultList = searchHql(roleService.createHql(),id);
        return SUCCESS;
    }

    public String index() {
        return "index";
    }

    public String left() {
        return "left";
    }

    /**
     * 新增角色
     * 
     * @return
     */
    public String add() {
        baseService.insert(role);
        return RELOAD;
    }

    /**
     * 设置角色
     * 
     * @return
     */
    public String setRole() {
        roleService.setUserRole(role.getId().toString(), userArray.split("&"));
        return RELOAD;
    }

    /**
     * 角色查看
     * 
     * @return
     */
    public String setShow() {
        role = baseService.findByPrimaryKey(Role.class, role.getId());
        return "set";
    }

    @Action(value = "tree", results = { @Result(name = "success", type = "json", params = { "root", "userNodeList" }) })
    public String tree() {
        userNodeList= roleService.getUserNodeList(role.getId().toString());
        return SUCCESS;
    }
    
    @Action(value = "tree2", results = { @Result(name = "success", type = "json", params = { "root", "resultList" }) })
    public String tree2() {
        resultList = searchHql(roleService.createHql());
        return SUCCESS;
    }

    /**
     * 角色新增页面跳转
     * 
     * @return
     */
    public String addShow() {
        return "alter";
    }

    /**
     * 角色修改页面跳转
     * 
     * @return
     */
    public String editShow() {
        role = baseService.findByPrimaryKey(Role.class, role.getId());
        return "alter";
    }

    /**
     * 删除角色
     * 
     * @return
     */
    public String delete() {
        role = baseService.findByPrimaryKey(Role.class, role.getId());
        baseService.delete(role);
        return RELOAD;
    }

    /**
     * 更新角色
     * 
     * @return
     */
    public String update() {
        Role roleOld = baseService.findByPrimaryKey(Role.class, role.getId());
        // roleOld.setName(role.getName());
        baseService.update(roleOld);
        return RELOAD;
    }

    public List<Role> getResultList() {
        return resultList;
    }

    public void setResultList(List<Role> resultList) {
        this.resultList = resultList;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<UserNode> getUserNodeList() {
        return userNodeList;
    }

    public void setUserNodeList(List<UserNode> userNodeList) {
        this.userNodeList = userNodeList;
    }

    public String getUserArray() {
        return userArray;
    }

    public void setUserArray(String userArray) {
        this.userArray = userArray;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

}
