<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>管理员信息</title>
       <script type="text/javascript" src="../js/jquery.js"></script>
  </head>
  <body>
  	<div id="Spacer"></div>
		<table id="ContentList">
		<tr>
		<td>
  	<s:form action="listRole" method="post" namespace="/roleManage">
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
					            <a href="deleteRole.action?role.id=<s:property value='#item.id' />" onclick="return confirm('确认删除?')">
							删除
							</a>
					            <a href="editShowRole.action?role.id=<s:property value='#item.id' />">修改</a>
				          		<a href="setShowRole.action?role.id=<s:property value='#item.id' />">授权</a>
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
    
    $("#op").click(function(){
        document.forms[0].action="addShowRole.action";
    	document.forms[0].submit();
    });
    
    
    });
   
   //-->
    </script>