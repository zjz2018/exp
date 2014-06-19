<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
    <title>角色设置</title>
          <script type="text/javascript" src="js/jquery.js"></script>
  </head>
  
  <body>
  <s:form method="post" >
  <s:hidden name="role.id"  id="type"/>
    <table id="Context" align="center">
			<tr>
				<th align="center" colspan="2">
					角色设置
				</th>
			</tr>
			<tr>
			<s:textfield name="role.name" label="name" />
			<tr>
				<td colspan="2" align="center">
					<input type="button" value="保存" id="op" class="buttonclass"/>
				</td>
			</tr>
		</table>
		 </s:form>
  </body>
</html>
<script type="text/javascript" >
   <!-- 
    $("document").ready(function(){
    
    $("#op").click(function(){
    	 if(""!=$("#type").val()){
    		 alert("gegnxing");
    		 document.forms[0].action="system/role/role!update.action";
    		 document.forms[0].submit();
        	}else{
          		 document.forms[0].action="system/role/role!add.action";
        	     document.forms[0].submit();
        	}
    });
    
    });
   
   //-->
    </script>
