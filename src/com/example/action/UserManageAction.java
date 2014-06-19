package com.example.action;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.base.action.BaseAction;
import com.base.service.BaseService;
import com.example.model.User;
import com.example.service.UserService;

@Namespace("/userManage")
public class UserManageAction extends BaseAction {

    private static final long serialVersionUID = -2176978868376389906L;
    private static final Logger logger = LoggerFactory.getLogger(UserManageAction.class);
    @Autowired
    private BaseService baseService;
    @Autowired
    private UserService userService;
    private User user;
    private List<User> resultList = new ArrayList<User>();

    /**
     * 用户帐号查询
     * 
     * @return
     */
    @SuppressWarnings("unchecked")
    @Action(value = "listUser", results = { @Result(name = "success", location = "/user/user_list.jsp") })
    public String listUser() {
        resultList = searchHql(userService.createHql(user), null);
        return SUCCESS;
    }

    /**
     * 新增用户帐号
     * 
     * @return
     */
    @Action(value = "addUser", results = { @Result(name = "success", location = "listUser", type = "redirectAction") })
    public String addUser() {
        baseService.insert(user);
        return SUCCESS;
    }

    /**
     * 用户新增页面跳转
     * 
     * @return
     */
    @Action(value = "addShowUser", results = { @Result(name = "success", location = "/user/user_add.jsp") })
    public String addShowUser() {
        return SUCCESS;
    }

    /**
     * 用户修改页面跳转
     * 
     * @return
     */
    @Action(value = "editShowUser", results = { @Result(name = "success", location = "/user/user_add.jsp") })
    public String editShowUser() {
        user = baseService.findByPrimaryKey(User.class, user.getId());
        return SUCCESS;
    }

    /**
     * 删除用户帐号
     * 
     * @return
     */
    @Action(value = "deleteUser", results = { @Result(name = "success", location = "listUser", type = "redirectAction") })
    public String deleteUser() {
        user = baseService.findByPrimaryKey(User.class, user.getId());
        baseService.delete(user);
        return SUCCESS;
    }

    /**
     * 更新用户信息
     * 
     * @return
     */
    @Action(value = "updateUser", results = { @Result(name = "success", location = "listUser", type = "redirectAction") })
    public String updateUser() {
        User userOld = baseService.findByPrimaryKey(User.class, user.getId());
        userOld.setName(user.getName());
        userOld.setPassword(user.getPassword());
        baseService.update(userOld);
        return SUCCESS;
    }

    public List<User> getResultList() {
        return resultList;
    }

    public void setResultList(List<User> resultList) {
        this.resultList = resultList;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
