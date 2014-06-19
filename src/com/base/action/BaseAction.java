package com.base.action;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.base.service.BaseService;
import com.base.util.PageNavigator;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

/**
 * 父类action,定义一些基本方法
 * 
 * @author zjz
 * @date 2012-3-6
 */
@Controller
@Scope("prototype")
public abstract class BaseAction extends ActionSupport {
    /** 进行增删改操作后,以redirect方式重新打开action默认页的result名 */
    public static final String RELOAD = "reload";
    private String errorContext;
    private String errorMsg;
    private PageNavigator pageNavigator = new PageNavigator();
    @Autowired
    private BaseService baseService;

    public String getRealRoot() {
        return ServletActionContext.getServletContext().getRealPath(File.separator);
    }

    public String getRoot() {
        return this.getRequest().getContextPath();
    }

    protected HttpServletRequest getRequest() {
        return (HttpServletRequest) ActionContext.getContext().get(ServletActionContext.HTTP_REQUEST);
    }

    public String getParameter(String name) {
        return (null == this.getRequest().getParameter(name)) ? null : this.getRequest().getParameter(name);
    }

    protected Map<String, Object> getSession() {
        return ActionContext.getContext().getSession();
    }

    protected HttpServletResponse getResponse() {
        return (HttpServletResponse) ActionContext.getContext().get(ServletActionContext.HTTP_RESPONSE);
    }

    public void outString(String str) {
        try {
            PrintWriter out = getResponse().getWriter();
            out.write(str);
        } catch (IOException e) {
        }
    }

    public void outXMLString(String xmlStr) {
        getResponse().setContentType("application/xml;charset=UTF-8");
        outString(xmlStr);
    }

    public String getErrorContext() {
        return errorContext;
    }

    public void setErrorContext(String errorContext) {
        this.errorContext = errorContext;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public PageNavigator getPageNavigator() {
        return pageNavigator;
    }

    public void setPageNavigator(PageNavigator pageNavigator) {
        this.pageNavigator = pageNavigator;
    }

    protected List searchSql(String sql, Object... params) {
        this.pageNavigator.action();
        return this.baseService.searchSql(sql, this.pageNavigator, params);
    }

    protected List searchAll(String hql, Object... params) {
        return this.baseService.findByHql(hql, params);
    }

    protected List searchHql(String hql, Object... params) {
        this.pageNavigator.action();
        return this.baseService.searchHql(hql, this.pageNavigator, params);
    }

}
