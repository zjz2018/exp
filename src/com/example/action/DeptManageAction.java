package com.example.action;

import java.util.ArrayList;
import java.util.List;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.base.action.BaseAction;
import com.base.service.BaseService;
import com.example.model.Dept;
import com.example.model.User;
import com.example.service.DeptService;

@Namespace("/deptManage")
public class DeptManageAction extends BaseAction {

	@Autowired
	private BaseService baseService;
	@Autowired
	private DeptService deptService;
	private Dept dept;
	private User user;
	private List<Dept> resultList = new ArrayList<Dept>();
	private List<User> userList = new ArrayList<User>();

    /**
     * 显示部门树
     * 
     * @return
     */
    @Action(value = "listDept", results = { @Result(name = "success", type = "json", params = { "root", "resultList" }) })
    public String listDept() {
        resultList = deptService.getDeptList();
        return SUCCESS;
    }
	
	/**
	 * 显示部门下面的用户列表
	 * 
	 * @return
	 */
    @Action(value="listDeptUser",results={@Result(name="success",location="/dept/dept_list.jsp",params={"dept.id","${dept.id}"})})
    public String listDeptUser(){
    	userList=deptService.getUserListByDeptId(dept.getId().toString());
    	return SUCCESS;
    }
    
    /**
     * 新增部门
     * 
     * @return
     */
    @Action(value = "addDept", results = { @Result(name = "success", location = "listDept", type = "redirectAction") })
    public String addDept() {
        baseService.insert(dept);
        return SUCCESS;
    }

  
	@Action(value = "showDept", results = { @Result(name = "success", location = "/user/dept.jsp") })
	public String showDept() {
		return SUCCESS;
	}

	/**
	 * 用户新增页面跳转
	 * 
	 * @return
	 */
	@Action(value = "addShowDept", results = { @Result(name = "success", location = "/dept/dept_add.jsp") })
	public String addShowDept() {
		return SUCCESS;
	}

	/**
	 * 用户修改页面跳转
	 * 
	 * @return
	 */
	@Action(value = "editShowDept", results = { @Result(name = "success", location = "/dept/dept_add.jsp" ) })
	public String editShowDept() {
		dept = baseService.findByPrimaryKey(Dept.class, dept.getId());
		return SUCCESS;
	}

	/**
	 * 删除部门
	 * 
	 * @return
	 */
	@Action(value = "deleteDept", results = { @Result(name = "success", location = "listDept", type = "redirectAction") })
	public String deleteDept() {
		dept = baseService.findByPrimaryKey(Dept.class, dept.getId());
		baseService.delete(dept);
		return SUCCESS;
	}

	/**
	 * 更新部门
	 * 
	 * @return
	 */
	@Action(value = "updateDept", results = { @Result(name = "success", location = "listDept", type = "redirectAction") })
	public String updateDept() {
		Dept deptOld = baseService.findByPrimaryKey(Dept.class, dept.getId());
		deptOld.setName(dept.getName());
		baseService.update(deptOld);
		return SUCCESS;
	}

	public Dept getDept() {
		return dept;
	}

	public void setDept(Dept dept) {
		this.dept = dept;
	}

	public List<Dept> getResultList() {
		return resultList;
	}

	public void setResultList(List<Dept> resultList) {
		this.resultList = resultList;
	}

	public List<User> getUserList() {
		return userList;
	}

	public void setUserList(List<User> userList) {
		this.userList = userList;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
