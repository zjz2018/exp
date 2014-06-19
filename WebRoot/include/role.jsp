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
		<tr>
		<td width="50"><A href="system/role/role!addShow.action" target="main">角色新增</A></td>
		</tr>
		<tr>
		<td width="50"><a href="system/role/role!list.action" target="main">角色管理</a></td>
		</tr>
	</table>
</body>
</html>
