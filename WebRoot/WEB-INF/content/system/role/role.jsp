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
    <title>管理员信息</title>
       <script type="text/javascript" src="js/jquery.js"></script>
  </head>
  <body>
  	<div id="Spacer"></div>
  	<table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="1"
	class="zt" width="100%">
	<tr>
		<td width="100%" background="system/skin/skin1/images/list_bg.jpg">
		<table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="100%">
			<tr>
				<td background="system/skin/skin1/images/list_bg.jpg" nowarp>
					<span class="STYLE5"> &nbsp;&nbsp;
						<img width=16 height=16 align=absmiddle src="system/skin/skin1/images/button/16X16/DotButton.png" /> 
						角色管理
					</span>
				</td>
				<td align="right" background="system/skin/skin1/images/list_bg.jpg" style="background-color: #000">
					<div style="width:90%; overflow:hidden; text-align:right; padding-right:29px;">
					<s:if test="rd.isSystem==1">
					<!--功能按钮--> 
						<input type="button" class="ToolStyle addfolder"  value="新建角色分类"
						onclick="javascript:window.location='/system/role/role!dirOperate.action?parent.id=${id}'" />
						<input type="button" class="ToolStyle add"  value="新建角色"
						onclick="javascript:window.location='system/role/role!operate.action?id=${id}'" />
						<input type="button" class="ToolStyle" value="返回" onclick="javascript:history.back();"/>
					</s:if>
					</div>
				</td>
			</tr>
		</table>
		</td>
	</tr>
</table>
  	
  	
		<table id="ContentList">
		<tr>
		<td>
  	<s:form method="post" id="mainForm">
  	<table width="80%" cellspacing="0">
  				 <tr><td align="right" colspan="5"><input type="button" class="buttonclass" value="新增" id="op"></td></tr>
  	         <tr>
				<th width="40">序号</th>
				<th>
					NAME
				</th>
				<th>
					操作
				</th>
			</tr>
			<s:if test="null!=resultList&&resultList.size()>0">
					<s:iterator value="resultList" id="item" status="stu">
				<tr>
						    <td align="center">
						        <s:property value="#stu.index+1"/>
						    </td>
							<td align="center">
								<s:property value="#item.id" />
							</td>
							<td align="center">
								<s:property value="#item.name" />
							</td>
							<td align="center">
					            <a href="system/role/role!delete.action?role.id=<s:property value='#item.id' />" onclick="return confirm('确认删除?');">
							删除
							</a>
					            <a href="system/role/role!editShow.action?role.id=<s:property value='#item.id' />">修改</a>
				          		<a href="system/role/role!setShow.action?role.id=<s:property value='#item.id' />">授权</a>
				           </td>
						</tr>
					</s:iterator>
					</s:if>
						  <s:else>
						  <tr>
							<td colspan="5" align="center">
								没有数据
							</td>
							</tr>
						</s:else>
				</table>
			<div class="Page">
				  <jsp:include page="/pageNavigator.jsp" />
		    </div>
		    </s:form>
				</td>
			</tr>
		</table>
	</body>
</html>
<script type="text/javascript" >
   <!-- 
    $("document").ready(function(){
    
    $("#op").click(function(){
        document.forms[0].action="role!addShow.action";
    	document.forms[0].submit();
    });
    
    
    });
   
   //-->
    </script>