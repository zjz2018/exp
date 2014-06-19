<%@ page contentType="text/html;charset=UTF-8" %>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>内容管理系统</title>
<script>
    var y = 100;
    var openStatus = true;
    var openRightStatus = true;

    function expend() {
        var MainFarm = document.all ? document.all.main_frm : document.getElementById("main_frm");
        var rightCol = MainFarm.cols.split(",")[2];
        openStatus = !openStatus;
        if (openStatus) {

            MainFarm.cols = "199,*," + rightCol;
        }
        else {
            MainFarm.cols = "40,*," + rightCol;
        }
    }

    function expendRight() {
        var MainFarm = document.all ? document.all.main_frm : document.getElementById("main_frm");
        var leftCol = MainFarm.cols.split(",")[0];
        if (openRightStatus) {
            MainFarm.cols = leftCol + ",*,205";
        }
        else {
            MainFarm.cols = leftCol + ",*,40";
        }
        openRightStatus = !openRightStatus;
    }

    function close() {
        var MainFarm = document.all ? document.all.main_frm : document.getElementById("main_frm");
        MainFarm.cols = "20,*,205";
    }

    function goUp() {
        y = y - 100;
        if (y <= 0) y = 0;
        for (var I = y; I >= 0; I--) {
            window.nav.scroll(1, I);
        }
    }
    function goDown() {
        y = y + 100;
        for (var I = 1; I <= y; I++) {
            window.nav.scroll(1, I);
        }
    }

    function resizeRight() {
        try {
            document.frames["mainFrame"].resize();
        } catch (e) { }
    }
    function resizeMain() {
        try {
            document.frames["main_content"].resize();
        } catch (e) { }
    }
    function resizeLeft() {
        try {
            document.frames["leftFrame"].resize();
        } catch (e) { }
    }
    function resizeTopLeft() {
        try {
            document.frames["TopleftFrame"].resize();
        } catch (e) { }
    }		
</script>
<%
boolean bDisplayRightBar = false;
%>
</head>
<frameset rows="96,*,15" cols="*" frameborder="no" border="1" framespacing="0">
  <frame src="top.jsp" name="topFrame" scrolling="no" noresize="noresize" id="topFrame" title="topFrame" />
  <frameset rows="761" name="main_frm" id="main_frm" cols='199,*,40' framespacing="1" frameborder="no" border="1">
    <frame id="leftFrame" name="leftFrame" noresize="noresize" onresize="resizeLeft()" scrolling="no" src='left.jsp' style="height:100%" title="leftFrame" />
    <frame id="main_content"  name="main_content" onresize="resizeMain()" scrolling="Auto" src="#" title="main_content" />
	<frame src="#" onresize="resizeRight()" name="mainFrame" scrolling="No" id="mainFrame" title="mainFrame" />
  </frameset>
  <frame src="foot.html" name="footFrame" scrolling="No" noresize="noresize" id="footFrame" title="footFrame" />
</frameset>
</html>