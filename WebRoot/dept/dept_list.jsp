<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>部门信息</title>
       <script type="text/javascript" src="../js/jquery.js"></script>
  </head>
  <body>
  	<div id="Spacer"></div>
		<table id="ContentList">
		<tr>
		<td>
  	<s:form action="listDeptUser" method="post" namespace="/deptManage">
  	<s:hidden name="dept.id"  id="type"/>
  	<table width="80%" cellspacing="0">
  				 <tr><td align="center" colspan="2"><input type="button" class="buttonclass" value="新增部门" id="opDept"></td>
  				 <td align="center" colspan="3"><input type="button" class="buttonclass" value="新增用户" id="opUser"></td></tr>
  	        
  	        		<tr><td>name：</td><td><s:textfield name="user.name" label="用户名"  theme="simple" size="5"/>
  	        		</td><td><s:submit theme="simple"/></td></tr>
  	         <tr>
				<th width="40">序号</th>
				<th>
					ID
				</th>
				<th>
					name
				</th>
				<th>
					操作
				</th>
			</tr>
			<s:if test="null!=userList&&userList.size()>0">
					<s:iterator value="userList" id="item" status="user">
				<tr>
						    <td align="center">
						        <s:property value="#user.index+1"/>
						    </td>
							<td align="center">
								<s:property value="#item.id" />
							</td>
							<td align="center">
								<s:property value="#item.name" />
							</td>
							<td align="center">
					            <a href="../userManage/deleteUser.action?user.id=<s:property value='#item.id' />" onclick="return confirm('确认禁用?')">
							删除
							</a>
					            <a href="../userManage/editShowUser.action?user.id=<s:property value='#item.id' />">修改</a>
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
				  <jsp:include page="../pageNavigator.jsp" />
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
    
    $("#opDept").click(function(){
        document.forms[0].action="addShowDept.action";
    	document.forms[0].submit();
    });
    
    $("#opUser").click(function(){
    	document.form[0].action="../userManage/addShowUser.action";
    	document.form[0].submit();
    });
    
    });
   
   //-->
    </script>