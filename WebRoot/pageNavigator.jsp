<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<s:hidden name="pageNavigator.currentPage" />
<s:hidden name="pageNavigator.recordNumber" />
<s:hidden name="pageNavigator.navigateAction" id="Vaction" value=""/>
<div style="text-align: right; font-size:13">
	共
	<s:property value="pageNavigator.recordNumber" />
	条记录，第
	<s:property value="pageNavigator.currentPage" />
	页/共
	<s:property value="pageNavigator.pageNumber" />
	页 &nbsp;
	<a
		href="javascript:navigateAction('<s:property value="@com.base.util.PageNavigator@FIRST_PAGE" />');">第一页</a>&nbsp;|
	<s:if test="! pageNavigator.first">&nbsp;<a
			href="javascript:navigateAction('<s:property value="@com.base.util.PageNavigator@PRECEDE_PAGE" />')">上一页</a>&nbsp;|</s:if>
	<s:if test="! pageNavigator.last">&nbsp;<a
			href="javascript:navigateAction('<s:property value="@com.base.util.PageNavigator@NEXT_PAGE" />')">下一页</a>&nbsp;|</s:if>
	&nbsp;
	<a
		href="javascript:navigateAction('<s:property value="@com.base.util.PageNavigator@LAST_PAGE" />');">最后一页</a>&nbsp;
	&nbsp;
	<s:textfield name="pageNavigator.toPage" id="page" theme="simple"
		size="2" />
	&nbsp;
	<button style="width: 35px;" onclick="navigateActionToPage();">
		转到
	</button>
</div>

<script language="javascript">
function navigateAction(action) {
	document.getElementById("Vaction").value = action;
	document.forms[0].submit();
	document.getElementById("Vaction").value="";
}
function navigateActionToPage() {
	var flag = true;
	document.getElementById('Vaction').value = '<s:property value="@com.base.util.PageNavigator@TO_PAGE" />';
	var page = document.getElementById('page').value;
	if(!is_double(page)){
		alert('请输入数值!');
		flag = false;
	}
	if(flag)
		document.forms[0].submit();
}

function is_double(js_value) {
		var re = /^\s*$/;
		var re1 = /^[0-9]{1,}\.{0,1}[0-9]{0,4}0*$/;

		if (js_value.match(re)) {
			return true;
		}
		if (js_value.match(re1))
			return true;
		return false;
	}
</script>
