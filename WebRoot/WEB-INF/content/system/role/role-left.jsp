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
<title>角色授权</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="css/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="js/jquery.js"></script>
<script type="text/javascript" src="js/jquery.ztree.core-3.1.js"></script>
<script type="text/javascript" src="js/jquery.ztree.excheck-3.1.js"></script>
<SCRIPT type="text/javascript">
		<!--
		var setting = {
		    	data: {
					simpleData: {
						enable: true,
					}
			},
			async: {
				enable: true,
				url:"system/role/tree.action",
				otherParam: ["role.id",2]
			},
		    callback: {
				onCheck: onCheck
			},
	    	check: {
	    		enable: true,
			}
		};
		
		function onCheck() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			var result="";
			for(var i=0;i<zTree.getCheckedNodes(true).length;i++){
        		if(result==""){
        			result=zTree.getCheckedNodes(true)[i].id;
        		}else{
        			result=result+"&"+zTree.getCheckedNodes(true)[i].id;
        		}
        	}
          $("#userArray")[0].value=result;
		};
		
		
		var setting2 = {
		    	data: {
					simpleData: {
						enable: true,
						pIdKey: "pid"
					}
			},
			async: {
				enable: true,
				url:"system/role/tree2.action",
			},
			 callback: {
					onClick: onClick
				}
		};
		
		function onClick(event, treeId, treeNode, clickFlag) {
			   window.parent.right.location.href="role.action?id="+treeNode.id;
		};
		
		$(document).ready(function(){
			$.fn.zTree.init($("#treeDemo"), setting2);
		});
		//-->
	</SCRIPT>
	</head>
<body>
	<s:form method="post">
	<s:hidden name="role.id" id="roleId"></s:hidden>
	<s:hidden name="userArray" id="userArray"/>
	<div class="zTreeDemoBackground left">
		<ul id="treeDemo" class="ztree"></ul>
	</div>
	</s:form>
</body>
</html>