<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>部门设置</title>
          <script type="text/javascript" src="../js/jquery.js"></script>
  </head>
  
  <body>
  <s:form method="post" namespace="/deptManage">

    <table id="Context" align="center">
			<tr>
				<th align="center" colspan="2">
					部门设置
				</th>
			</tr>
			<tr>
			<tr>
				<td>上一级部门id:</td><td><input type="text" name="dept.pid" value="${dept.id}"/></td>
			</tr>
			<s:textfield name="dept.name" label="部门名称"/>
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
    	 //if(""!=$("#type").val()){
    	//	 document.forms[0].action="updateUser.action";
    	//	 document.forms[0].submit();
        //	}else{
         // 		 document.forms[0].action="addUser.action";
        //	     document.forms[0].submit();
        //	}
    	 document.forms[0].action="addDept.action";
    	 document.forms[0].submit();
    
    });
    
    
    });
   
   //-->
    </script>
