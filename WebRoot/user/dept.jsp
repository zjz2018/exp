<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<title>组织架构</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="css/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.ztree.core-3.1.js"></script>
<SCRIPT type="text/javascript">
		<!--
		var setting = {
			data: {
					simpleData: {
						enable: true,
						idKey: "id",
						pIdKey: "pid",
					}
			},
				
			async: {
				enable: true,
				url:"deptManage/listDept.action",
			},
			
			callback: {
				onClick: onClick
			},
		
		};
		
		function onClick(event, treeId, treeNode, clickFlag) {
			//alert(treeNode.name+"=="+treeId);
			var url1="listDeptUser.action?dept.id="+treeNode.id;
			//window.top.document.getElementById('main').src="http://www.baidu.com";
			window.top.main.location=url1;
		};
		
		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting);
		});
		//-->
	</SCRIPT>
	</head>
<body>
    <div class="zTreeDemoBackground left">
		<ul id="treeDemo" class="ztree"></ul>
	</div>
</body>
</html>