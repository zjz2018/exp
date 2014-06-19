<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
<title>菜单</title>

<link href="skin/skin1/css/style.css" rel="stylesheet"
	type="text/css" />
<script language="javascript" type="text/javascript" src="skin/skin1/js/left.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<base target="main" />
</head>

<script type="text/javascript">
        var oPopup = navigator.userAgent.indexOf("IE") >= 0 ? window.createPopup() : null;

        function richContext(obj, index) {
            if (oPopup != null) {
                var lefter2 = event.offsetY + 0;
                var topper2 = event.offsetX + 15;
                var divSpan = document.all ? eval("document.all.divSpan" + index) : document.getElementById("divSpan" + index);
                oPopup.document.body.innerHTML = divSpan.innerHTML;
                var count = divSpan.innerHTML.split("menuSpan").length - 1;
                var ss = oPopup.document.createStyleSheet("css/style.css");

                oPopup.show(34, lefter2 - 32 * count - 2, 166, 32 * count + 2 + (count == 1 ? 3 : 0), obj);
            }
        }

        function navigate(url) {
            parent.document.getElementById("main_content").src = url;
            oPopup.hide();
        }
    </script>

<script language="javascript" type="text/javascript">
       function show(num,count,url)
       {

           var obj = document.getElementById("firstSubject_ctl0"+num+"_second");
           if (typeof(obj)=="undefined"&&typeof(obj)==null) return false;
           for(var i=0;i<=count-1;i++)
           {
        	   if(num==i)
               {
                   obj.style.display="block";
               }
               else
               {
                   var index=""+i;
                   if(index.length==1) index="0"+index;
                   document.getElementById("firstSubject_ctl"+index+"_second").style.display="none";
               }
           }
           //是否打开默认Url
          resize(count);
           
           if(url!="" && url !=null)
           {
               OpenMenu(url);
           }
       }
       
       function OpenMenu(url)
       {
            var MainContent=parent.document.all?parent.document.all.main_content:parent.document.getElementById("main_content");
	        if(url.indexOf("http:\/\/")>=0)
	        {
		        MainContent.src=url;
	        }
	        else
	        {
		        if(url.indexOf("?")>0)
		        {
			        MainContent.src = url;
		        }
		        else
		        {
			        MainContent.src = url;
		        }
	        }
	        }
	        
       function resize(count)
       {
           var bodyHeight=parseInt(parent.document.getElementById("leftFrame").scrollHeight);
           var bodyWidth=parent.document.getElementById("main_frm").cols.split(",")[0];

            if(bodyWidth<=100)
            {
                document.getElementById("tableShrink").style.display="";    
                document.getElementById("tableExpand").style.display="none";         
                openStatus=false;  
            }
            else
            {            
                document.getElementById("tableShrink").style.display="none";    
                document.getElementById("tableExpand").style.display=""; 
                openStatus=true;               
            }
           
         document.getElementById("divDaoHang").style.height=bodyHeight-(count*34+39); //  会出现参数不识别
         //alert(document.all.divDaoHang.style.height);
		var TableHeight = 0;
          
          for(var i=0;i<count;i++)
          {
              
               var index=""+i;
               if(index.length==1) index="0"+index;
               if(navigator.userAgent.indexOf("Firefox")>0)
               {
                   TableHeight=(bodyHeight-(count*34)-9)+4; 
                }
                else
                {
                   TableHeight=(bodyHeight-(count*34)-9); 
                }
               document.getElementById("firstSubject_ctl"+index+"_divExpend").style.height=TableHeight+"px";
             //  alert(TableHeight);
          }
       }
       
       function expend()
       {
            parent.expend();
            var openStatus=parent.openStatus;
            if(!openStatus)
            { 
                document.getElementById("tableShrink").style.display="";    
                document.getElementById("tableExpand").style.display="none";                
            }
            else
            {            
                document.getElementById("tableShrink").style.display="none";    
                document.getElementById("tableExpand").style.display="";
            }
       }
    </script>




<body  
	style="background-image: url('skin/skin1/images/pic_2_bg.jpg');overflow: hidden; background-repeat: repeat-y; background-position-x: left"
	onload="show('0','1','system/menu/menu!index.action');">
<div id="bodyDiv">
<table width="199" border="0" align="left" cellpadding="0"
	cellspacing="0" height="100%">
	<tr>
		<td width="7" align="center" valign="top"
			background="skin/skin1/images/pic_2_bg.jpg" bgcolor="#9AC8FF">
		<img src="skin/skin1/images/pic_2.gif" width="8" /></td>
		<td align="left" valign="top">
		<table width="190" height="100%" border="0" align="left"
			cellpadding="0" cellspacing="1" bgcolor="#88A3B7">
			<tr>
				<td width="100%" align="left" valign="top" bgcolor="#E8F1F8">
				<table id="tableShrink" style="display: none;" border="0"
					cellpadding="0" cellspacing="0" width="40">
					<tr>
						<td>
						<table width="100%" height="29" border="0" cellpadding="0"
							cellspacing="0"
							background="skin/skin1/images/left/left_button_l.jpg">
							<tr>
								<td width="11%" id="imgmenu13" style="cursor: pointer"
									onclick="expend();"
									onmouseover="this.style.background='#FFCC00'"
									onmouseout="this.style.background=''">&nbsp;&nbsp;&nbsp;<img
									src="skin/skin1/images/left/more.jpg" width="12"
									height="11" border="0" /></td>
							</tr>
						</table>
						</td>
					</tr>
					<tr>
						<td onmouseover="this.style.background='#ddCC00'"
							onmouseout="this.style.background=''" align="left"
							id="divDaoHang"><img
							src="skin/skin1/images/daohang.gif"></td>
					</tr>
					<tr>
						<td
							style="height: 10px; background-image: url('skin/skin1/images/left/left_hx1.jpg'); background-repeat: no-repeat;background-position-x: left">
						</td>
					</tr>

					
						<tr>
							<td>
							<table border="0" cellpadding="0" cellspacing="0" height="34"
								width="40">
								<tr>
									<td onclick="richContext(this,0);" align="right"
										background="skin/skin1/images/left/left_button.jpg"
										style="cursor: pointer" title="权限管理" valign="middle">
									<table border="0" cellpadding="0" cellspacing="0"
										style="width: 40px;" class="LeftMenuButton" height="29"
										width="95%">
										<tr>
											<td align="left" style="width: 40px;" valign="middle"><span
												class="STYLE1"><a href="#" target="_self"></a></span></td>
										</tr>
									</table>
									</td>
								</tr>
							</table>
							</td>
						</tr>
						<tr id="second" style="display: none;">
							<td id="divSpan0">
							<table width="164" border="0" align="left" cellpadding="0"
								cellspacing="0" class="table" id="submenu13">
								<tr>
									<td height="35" align="left" valign="top"
										background="skin/skin1/images/more_bg.jpg">
									<table width="164" align="center" height="100%"
										style="background-image: url('skin/skin1/images/left/wxp.gif');background-repeat: no-repeat; background-position: left bottom"
										border="0" cellpadding="0" cellspacing="0">
										
											<tr id="menuSpan0">
												<td height="32">
												<table height="22" border="0" cellpadding="0"
													cellspacing="0" class="more">
													<tr onmouseover="this.className='more1';"
														onmouseout="this.className=''">
														<td width="25">&nbsp;</td>
														<td align="left" valign="middle"><a href="system/menu/menu!index.action"
															onclick="parent.navigate(href);" target="_parent">功能管理 </a></td>
													</tr>
												</table>
												</td>
											</tr>
										
											<tr id="menuSpan1">
												<td height="32">
												<table height="22" border="0" cellpadding="0"
													cellspacing="0" class="more">
													<tr onmouseover="this.className='more1';"
														onmouseout="this.className=''">
														<td width="25">&nbsp;</td>
														<td align="left" valign="middle"><a href="system/user/user!index.action"
															onclick="parent.navigate(href);" target="_parent">用户管理 </a></td>
													</tr>
												</table>
												</td>
											</tr>
										
											<tr id="menuSpan2">
												<td height="32">
												<table height="22" border="0" cellpadding="0"
													cellspacing="0" class="more">
													<tr onmouseover="this.className='more1';"
														onmouseout="this.className=''">
														<td width="25">&nbsp;</td>
														<td align="left" valign="middle"><a href="system/dictionary/dictionary!index.action"
															onclick="parent.navigate(href);" target="_parent">字典管理 </a></td>
													</tr>
												</table>
												</td>
											</tr>
										
											<tr id="menuSpan3">
												<td height="32">
												<table height="22" border="0" cellpadding="0"
													cellspacing="0" class="more">
													<tr onmouseover="this.className='more1';"
														onmouseout="this.className=''">
														<td width="25">&nbsp;</td>
														<td align="left" valign="middle"><a href="role!index.action"
															onclick="parent.navigate(href);" target="_parent">角色管理 </a></td>
													</tr>
												</table>
												</td>
											</tr>
										
											<tr id="menuSpan4">
												<td height="32">
												<table height="22" border="0" cellpadding="0"
													cellspacing="0" class="more">
													<tr onmouseover="this.className='more1';"
														onmouseout="this.className=''">
														<td width="25">&nbsp;</td>
														<td align="left" valign="middle"><a href="system/log/log.action"
															onclick="parent.navigate(href);" target="_parent">日志管理 </a></td>
													</tr>
												</table>
												</td>
											</tr>
										
									</table>
									</td>
								</tr>
							</table>
							</td>
						</tr>
					

				</table>

				<table width="189" id="tableExpand" style="display: none;"
					border="0" cellspacing="0" cellpadding="0">
					
						<tr>
							<td>
								<table width="100%" height="34" border="0" cellpadding="0"
									cellspacing="0">
									<tr>
										<td id="tdShow" align="right" title="权限管理" valign="top"
											background="skin/skin1/images/left/left_button.jpg"
											style="cursor: pointer"
											onclick="show('0','1','')">
											<table width="100%" height="34" border="0" cellpadding="0"
												class="LeftMenuButton" style="padding: 0 0; margin: 0 0;"
												cellspacing="0">
												<tr>
													<td align="left" valign="middle" style="width: 160px"><span
														class="STYLE1">
														<a href="system/menu/menu!index.action"
														target="main_content">权限管理</a></span>
													</td>
													<td id="firstSubject_ctl00_tdTitle" align="center"
														onclick="expend();" valign="middle"><img
														src="skin/skin1/images/left/ico_shrink.gif"
														align="middle" />
													</td>
		
												</tr>
											</table>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr id="firstSubject_ctl00_second">
							<td id="firstSubject_ctl00_divExpend" >
								<table width="100%" height="100%" border="0" cellpadding="0"
									cellspacing="0" style="height: 100%">
									<tr height="100%">
										<td align="center" valign="top" height="0">
										<div style="overflow-y: auto; height: 100%;">
											
												<table width="90%" id="submenu1" border="0" cellpadding="0"
													cellspacing="0">
													<tr>
														<td height="30" align="left" valign="bottom">
														<table width="98%" height="25" border="0" cellpadding="0"
															cellspacing="0">
															<tr>
																<td height="30" title="功能管理" align="left"
																	valign="bottom" class="menu_title"
																	style="cursor: pointer; width: 189px;">&nbsp; <img
																	src="skin/skin1/images/ico/ico_02.jpg" width="17"
																	height="18" /> <a
																	id='subCMS_InfoPublish_Publish_InfoManage' href="system/menu/menu!index.action"
																	target="main_content"> 功能管理 </a>
																</td>
															</tr>
														</table>
														</td>
													</tr>
												</table>
											
												<table width="90%" id="submenu1" border="0" cellpadding="0"
													cellspacing="0">
													<tr>
														<td height="30" align="left" valign="bottom">
														<table width="98%" height="25" border="0" cellpadding="0"
															cellspacing="0">
															<tr>
																<td height="30" title="用户管理" align="left"
																	valign="bottom" class="menu_title"
																	style="cursor: pointer; width: 189px;">&nbsp; <img
																	src="skin/skin1/images/ico/ico_02.jpg" width="17"
																	height="18" /> <a
																	id='subCMS_InfoPublish_Publish_InfoManage' href="system/user/user!index.action"
																	target="main_content"> 用户管理 </a>
																</td>
															</tr>
														</table>
														</td>
													</tr>
												</table>
											
												<table width="90%" id="submenu1" border="0" cellpadding="0"
													cellspacing="0">
													<tr>
														<td height="30" align="left" valign="bottom">
														<table width="98%" height="25" border="0" cellpadding="0"
															cellspacing="0">
															<tr>
																<td height="30" title="字典管理" align="left"
																	valign="bottom" class="menu_title"
																	style="cursor: pointer; width: 189px;">&nbsp; <img
																	src="skin/skin1/images/ico/ico_02.jpg" width="17"
																	height="18" /> <a
																	id='subCMS_InfoPublish_Publish_InfoManage' href="system/dictionary/dictionary!index.action"
																	target="main_content"> 字典管理 </a>
																</td>
															</tr>
														</table>
														</td>
													</tr>
												</table>
											
												<table width="90%" id="submenu1" border="0" cellpadding="0"
													cellspacing="0">
													<tr>
														<td height="30" align="left" valign="bottom">
														<table width="98%" height="25" border="0" cellpadding="0"
															cellspacing="0">
															<tr>
																<td height="30" title="角色管理" align="left"
																	valign="bottom" class="menu_title"
																	style="cursor: pointer; width: 189px;">&nbsp; <img
																	src="skin/skin1/images/ico/ico_02.jpg" width="17"
																	height="18" /> <a
																	id='subCMS_InfoPublish_Publish_InfoManage' href="role/role!index.action"
																	target="main_content"> 角色管理 </a>
																</td>
															</tr>
														</table>
														</td>
													</tr>
												</table>
											
										</div>
										</td>
									</tr>
									<tr>
										<td
											style="height: 10px; background-image: url('skin/skin1/images/left/left_hx.jpg'); background-repeat: no-repeat;
	                                                                background-position-x: bottom">
										</td>
									</tr>
								</table>
							</td>
						</tr>
					
				</table>
				</td>
			</tr>


		</table>
		</td>
	</tr>
</table>
</div>
</body>
</html>