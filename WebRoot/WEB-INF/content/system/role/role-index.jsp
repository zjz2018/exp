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
<title>栏目管理</title>
<link href="system/skin/skin1/css/style.css" rel="stylesheet" type="text/css" />
<script src="system/js/jquery.js" type="text/javascript"></script>
<script>
        function setUrl(lefturl, righturl) {
            var MenuFrame = document.all ? document.all.menu : document.getElementById("menu");
            var RightFrame = document.all ? document.all.right : document.getElementById("right");
            MenuFrame.src = lefturl;
            RightFrame.src = righturl;
        }
        
        function resize()
        {
            var bodyHeight = parseInt(parent.document.getElementById("leftFrame").offsetHeight);
            
            document.getElementById("menu").style.height = bodyHeight - document.getElementById("topMenuTable").scrollHeight - document.getElementById("leftFuncMenu").scrollHeight - 4;
            document.getElementById("right").style.height = bodyHeight - document.getElementById("topMenuTable").scrollHeight - 4;
        }
    </script>
</head>
<body onload="resize();" scroll="no" bgcolor="#DEE3ED" style="border-left: 0px; border-right: 0px; overflow:hidden;">
<table width="100%" border="0" cellpadding="0" cellspacing="0" class="table">
            <tr>
                <td align="center" valign="top" bgcolor="#FFFFFF">
                    <table id=topMenuTable width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                            <td height="28" align="left" valign="bottom" background="system/skin/skin1/images/centerbg.jpg">
                                <table width="100%" height="26" border="0" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td width="58%" align="left" valign="middle">
                                            <table height="24" border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td width="33" align="center" valign="middle">
                                                        <img src="system/skin/skin1/images/ico/ico_list.gif" width="16" height="16" /></td>
                                                    <td align="left" valign="middle">
                                                        <div class="STYLE1">
                                                            <!--[if !IE]>    模块名称开始    <![endif]-->
                                                            角色管理
                                                            <!--[if !IE]>    模块名称结束    <![endif]-->
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="200" align="center" valign="top" style="border-right: #88A3B7 1px solid;
                                border-top: #ffffff 1px solid; border-left: none; border-bottom: none;">
                                <table id=leftFuncMenu width="100%" border="0" cellspacing="0" cellpadding="0">
                                    <tr>
                                        <td width="5%" height="23" background="system/skin/skin1/images/list_bg.jpg">
                                            &nbsp;</td>
                                        <td width="95%" align="left" valign="middle" background="system/skin/skin1/images/list_bg.jpg">
                                            <img width=16 height=16 align=absmiddle src="system/skin/skin1/images/button/16X16/DotButton.png"/>
                                            <!--[if !IE]>    功能名称开始    <![endif]-->
                                          角色管理
                                            <!--[if !IE]>    功能名称结束    <![endif]-->
                                        </td>
                                    </tr>
                                </table>
                                <table width="98%" height="320" border="0" cellpadding="0" cellspacing="0" class="zts" style="text-align:left">
                                    <tr>
                                        <td height="420" align="left" valign="top">
                                            <!--[if !IE]>    左侧框架开始    <![endif]-->
                                            <iframe height="800" id="menu" name="menu" src="" width="100%" frameborder="NO" border="0"
                                                framespacing="0" ></iframe>
                                            <!--[if !IE]>    左侧框架结束    <![endif]-->
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            <td align="left" bgcolor="#DEE3ED" height="100%" valign="top" id="tdFrame">
                                <!--[if !IE]>    右侧框架开始    <![endif]-->
                                <iframe width="100%" height="100%" id="right" name="right" src="" class="outset-table"
                                    frameborder="NO" border="0" scrolling="auto" framespacing="0" noresize align="middle">
                                </iframe>
                                <script>setUrl("system/role/role!left.action","system/role/role.action");</script>
                                <!--[if !IE]>    右侧框架结束    <![endif]-->
                            </td>
                        </tr>
                    </table>                                                         
                </td>
            </tr>
        </table>
</body>
</html>