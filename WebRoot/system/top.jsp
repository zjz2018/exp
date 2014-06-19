<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>top</title>
<link href="skin/skin1/css/style.css" rel="stylesheet"
	type="text/css" />
<script language="javascript" type="text/javascript"
	src="skin/skin1/js/left.js"></script>
</head>
<body>
<table width="100%" border="0" align="center" cellpadding="0"
	cellspacing="0"
	style="background:#fff url(skin/skin1/images/top/top_bg.jpg) right bottom repeat-x;  border-style:none">
	<tr>
		<td width="219" height="60" align="left" valign="middle"
			style="background:#fff url(skin/skin1/images/top/logo.jpg) left top no-repeat;  border-style:none">
		</td>
		<td align="left" valign="top">
		<table width="100%" height="50px" border="0" align="left"
			cellpadding="0" cellspacing="0">
			<tr>
				<td align="left" valign="middle">
				<table height="22" border="0" align="left" cellpadding="0"
					cellspacing="0" style="margin-top: 20px">
					<tr>
						<td style="width: 30px">&nbsp;</td>
						<td width="14"><img
							src="skin/skin1/images/top/top_roll_left.jpg" width="14"
							height="22" /></td>
						<td align="left" valign="middle"
							style="width:660px; background:url(skin/skin1/images/top/top_roll_bg.jpg) left top repeat-x;">
						<span class="headfont"> [admin]您好，欢迎您登录使用信息发布系统”。 </span></td>
						<td width="24"><img
							src="skin/skin1/images/top/top_roll_right.jpg" width="14"
							height="22" /></td>
					</tr>
				</table>
				</td>
			</tr>
		</table>
		</td>
		<td width="278" align="right" valign="top"
			style="background:#fff url(skin/skin1/images/top/desktop.jpg) right top no-repeat;  border-style:none">
		</td>
	</tr>
</table>
<table width="100%" height="32" border="0" align="center"
	cellpadding="0" cellspacing="0"
	style="background: url(skin/skin1/images/top/menubg.jpg) left top repeat-x;">
	<tr>
		<td width="12" valign="top"
			style="background: url(skin/skin1/images/top/menu_left.jpg) left top no-repeat;">
		</td>
		<td align="left" valign="middle" height="32">
		<table width="100%" height="29" border="0" cellpadding="0"
			cellspacing="0">
			<tr>
				<td width="40%" align="left" valign="middle">
				<table height="29" border="0" cellpadding="0" cellspacing="0">
					<tr>
							<td id=tdsplit width='18' align='center' valign='middle'
								style='background: url(skin/skin1/images/top/menu.jpg) no-repeat; background-position:center center;'></td>
						
							<td width="84" id="topTd1_2" align="right" valign="middle">
							<table width="84" height="29" border="0" cellpadding="0"
								cellspacing="0" class="ButtonTop" id="menu2"
								style="padding-top: 0; margin-top: 0;">
								<tr>
									<td width="84" align="center" valign="top" id="2"><a
										target="leftFrame" id='href2' onclick="changeBK('2','0');"
										href="left.jsp" target="nav">系统管理</a></td>
								</tr>
							</table>
							</td>
							<td id=tdsplit width='18' align='center' valign='middle'
								style='background: url(skin/skin1/images/top/menu.jpg) no-repeat; background-position:center center;'></td>
						
					</tr>
				</table>
				</td>
			</tr>
		</table>
		</td>
		<td width="60%" align="right" valign="middle">
		<table width="280" height="29" border="0" cellpadding="0"
			cellspacing="0">
			<tr>
				<td width="153" align="center" valign="middle"></td>
				<td width="10" align="center"
					style="background: url(skin/skin1/images/top/menu.jpg) no-repeat; background-position:center center">
				</td>
				<td width="84" align="center" valign="middle">
				<table width="84" height="29" border="0" cellpadding="0"
					cellspacing="0" class="ButtonTop">
					<tr>
						<td width="84" align="center" valign="middle" id="17"><a
							href="../Common/portal/ModityPassword.aspx" onclick=bgChange(17);
							target="main_content"> 修改密码</a></td>
					</tr>
				</table>
				</td>
				<td width="10" align="center"
					style="background: url(skin/skin1/images/top/menu.jpg) no-repeat; background-position:center center">
				</td>
				<td align="center" valign="middle">
				<table height="29" border="0" cellpadding="0" cellspacing="0"
					id="menu03">
					<tr>
						<td width="40" align="center" valign="middle" id="20"><a
							href="javascript:check();" onclick=bgChange(20);>退出</a></td>
					</tr>
				</table>
				</td>
			</tr>
		</table>
		</td>
		<td width="14" valign="top"
			style="background: url(skin/skin1/images/top/menu_right.jpg) right top no-repeat;">
		
		</td>
	</tr>
</table>
<table width="100%" height="4" border="0" align="center" cellpadding="0"
	cellspacing="0">
	<tr>
		<td width="10"  height="4" align="left" valign="top"
			style="background:#9FC6FF url(skin/skin1/images/pic_left.jpg) left top no-repeat;">

		</td>
		<td width="98%" height="4" align="center" valign="top"
			style="background:url(skin/skin1/images/up1.jpg) left top repeat-x;">
		</td>
		<td width="8" align="right" height="4" valign="top"
			style="background:#9FC6FF url(skin/skin1/images/pic_right.jpg) right top no-repeat;">
		</td>
	</tr>
</table>
<script>
	function changeBK(index, menucount) {

		bgChange(index);
		currentGrid = parseInt(index);
		total = parseInt(menucount);
	}

	function check() {
		re = confirm("你确定要退出吗？");
		if (re) {
			top.location.href = "security/check/login!logout.action";
		} else {
		}
	}
</script>
</body>
</html>