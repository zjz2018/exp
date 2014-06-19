<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>head</title>
<style type="text/css">
	table{
		padding-top:70px;
		padding-left: 50px;
	}
	a{
		text-decoration: none;
	}
</style>
</head>
<body>
	<table border=0 style="width:300px;" align="center">
		<tr><td width="50"><a href="include/role.jsp" target="left">角色管理</a></td><td width="50"><a href="deptManage/showDept.action" target="left">部门管理</a></td></tr>
	</table>
</body>
</html>
