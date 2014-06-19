////////////////////////////////////////////////////////////////////////////////
/*
 *--------------- 客户端表单通用验证checkForm(oForm) -----------------
 *	功能,如下：
 *	1.对非ie的支持
 *	2.增加了内置表达式和内置提示
 *  3.增加了显示方式（弹出式和页面显示式）
 *	4.增加了显示一条和显示全部
 *	5.进行了封装（CLASS_CHECK）
 *	6.支持外接函数或表达式（应用在密码一致）
 *	7.简化了调用方式，所有操作只需要<script language='javascript' src='checkform.js'>,
	  然后在HTML里定义各标签验证格式
 *	8.对IE增加了对键盘输入的限制（如：定义usage='int'时，输入框只能输入数字（非IE无效）
 *	9.增加了对disabled的不验证
 * 10.自定义报警方式（重写showMessageEx方法）
 * 11.能对多FORM验证,还有针对普通按钮(非submit)下的验证（不需要验证的按钮设置属性check="false"）

 *	简介：
			本程序只需要对需要验证的标签设置三个属性：usage,exp,tiperror

			    usage	        :	内置格式或表达式或函数
			    exp		        :	正则表达式（注意如果指定了usage 则忽略exp)
			    tiperror		:	出错提示（如果是内置格式可以不要此属性，如果没有指定的错误信息，将使用说明缺省提示）
			    tipmsg          :   空间获取焦点显示的信息（如果没有指定的错误信息，将使用说明缺省提示）
		（必须）divMessageId    :   显示错误的Div（层）的ID值
		        
		  ***   tiperror和tipmsg要么一起使用，要么都不要使用
		        
			
            
			调用时只需要引用<script language='javascript' src='checkform.js'>，然后为每个标记
			增加以上3个属性（不一定需要全部）

 *
 *--------------- 客户端表单通用验证checkForm(oForm) -----------------
 */
////////////////////////////////////////////////////////////////////////////////


function CLASS_CHECK() {
	this.pass		= true;		//是否通过验证
	this.showAll	= true;		//是否显示所有的验证错误
	this.alert		= false;	//报警方式（默认alert报警）
	this.message	= "";		//错误内容
	this.first		= null;		//在显示全部验证错误时的第一个错误控件（用于回到焦点）
	this.cancel		= false;	
	//定义内置格式
	var aUsage = {
		"int":"^([+-]?)\\d+$",											//整数
		"int+":"^([+]?)\\d+$",											//正整数
		"int-":"^-\\d+$",												//负整数
		"num":"^([+-]?)\\d*\\.?\\d+$",									//数字
		"num+":"^([+]?)\\d*\\.?\\d+$",									//正数
		"num-":"^-\\d*\\.?\\d+$",										//负数
		"float":"^([+-]?)\\d*\\.\\d+$",									//浮点数
		"float+":"^([+]?)\\d*\\.\\d+$",									//正浮点数
		"float-":"^-\\d*\\.\\d+$",										//负浮点数																		
		"email":"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",	//邮件
		"color":"^#[a-fA-F0-9]{6}",										//颜色
		"url":"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//链接
		"chinese":"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",				//仅中文
		"ascii":"^[\\x00-\\xFF]+$",										//仅ACSII字符
		"zipcode":"^\\d{6}$",											//邮编
		"mobile":"^0{0,1}13[0-9]{9}$",									//手机
		"ip4":"^\(([0-1]?\\d{0,2})|(2[0-5]{0,2}))\\.(([0-1]?\\d{0,2})|(2[0-5]{0,2}))\\.(([0-1]?\\d{0,2})|(2[0-5]{0,2}))\\.(([0-1]?\\d{0,2})|(2[0-5]{0,2}))$",				//ip地址
		"notempty":"^(.|\\n)+$",											//非空
		"picture":"(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//图片
		"rar":"(.*)\\.(rar|zip|7zip|tgz)$",								//压缩文件
		"date":"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$"								//日期
	};

	//缺省消息
	var aMessage =	{
		"int"	:"请输入整数",											//整数
		"int+"	:"请输入正整数",											//正整数
		"int-"	:"请输入负整数",											//负整数
		"num"	:"请输入数字",											//数字
		"num+"	:"请输入正数",											//正数
		"num-"	:"请输入负整数",											//负数
		"float"	:"请输入浮点数",											//浮点数
		"float+":"请输入正浮点数",										//正浮点数
		"float-":"请输入负浮点数",										//负浮点数
		"email"	:"请输入正确的邮箱地址",									//邮件
		"color"	:"请输入正确的颜色",										//颜色
		"url"	:"请输入正确的连接地址",									//联接
		"chinese":"请输入中文",											//中文
		"ascii"	:"请输入ascii字符",										//仅ACSII字符
		"zipcode":"请输入正确的邮政编码",									//邮编
		"mobile":"请输入正确的手机号码",									//手机
		"ip4"	:"请输入正确的IP地址",										//ip地址
		"notempty":"不能为空",											//非空
		"picture":"请选择图片",											//图片
		"rar"	:"请输入压缩文件",										//压缩文件
		"date"	:"请输入正确的日期"										//日期
	}

	var me = this;

	me.checkForm = function(oForm) {

	    me.pass = true;
	    me.message = "";
	    me.first = null;
	    me.TemPass = true;
	    if (me.cancel == true) {
	        return true;
	    }

	    var els = oForm.elements;
	    //遍历所有表元素
	    for (var i = 0; i < els.length; i++) {
	        //取得格式
	        var sUsage = els[i].getAttribute("Usage");
	        var sReg = "";

	        //关于替换特殊标签
	        var IsNeedHTML = els[i].getAttribute("IsNeedHTML");
	        if (typeof (IsNeedHTML) == "undefined" || IsNeedHTML == null || IsNeedHTML.toLowerCase() != "true") {
	            els[i].value = els[i].value.replace(/\'/g, "’");
	            els[i].value = els[i].value.replace(/</g, "＜").replace(/>/g, "＞");
	        }

	        //如果设置Usage，则使用内置正则表达式，忽略Exp
	        if (typeof (sUsage) != "undefined" && sUsage != null) {
	          
	            //如果Usage在表达室里找到，则使用内置表达式，无则认为是表达式；表达式可以是函数；
	            if (aUsage[sUsage] != null) {
	                sReg = aUsage[sUsage];
	            } else {
	                try {
	                    if (eval(sUsage) == false) {
	                        
	                        me.pass = false;
	                        if (me.first == null) {
	                            me.first = els[i];
	                        }

	                        addMessage(getMessage(els[i]));

	                        if (me.showAll == false) {
	                            setFocus(els[i]);
	                            continue;
	                        }
	                    }
	                } catch (e) {
	                    alert("表达式[" + sUsage + "]错误:" + e.description)
	                    return false;
	                }
	            }
	        } else {
	            sReg = els[i].getAttribute("Exp");
	        }

	        if (typeof (sReg) != "undefined" && sReg != null) {
	            //对于失效状态不验证
	            if (isDisabled(els[i]) == true) {
	                continue;
	            }

	            //取得表单的值,用通用取值函数
	            var sVal = getValue(els[i]);
	            //字符串->正则表达式,不区分大小写
	            me.TemPass = true;
	            var reg = new RegExp(sReg, "i");
	            if (!reg.test(sVal)) {
	                me.TemPass = false;
	                me.pass = false;
	                if (me.first == null) {
	                    me.first = els[i];
	                }

	                //alert(reg);
	                //验证不通过,弹出提示warning
	                var sTip = getMessage(els[i]);
	                if (sTip.length == 0 && typeof (sUsage) != "undefined" && sUsage != null && aMessage[sUsage] != null) {
	                    sTip = aMessage[sUsage];
	                }
	                addMessage(sTip);

	                if (me.showAll == false) {
	                    //该表单元素取得焦点,用通用返回函数
	                    setFocus(els[i]);
	                    break;
	                }
	            }
	            if (me.TemPass == false) {
	                showMessage(els[i]);
	            }

	        }
	    }

	    if (me.pass == false) {

	        if (me.first != null && me.showAll == true) {
	            setFocus(me.first);
	        }
	    }

	    return me.pass;
	}

    
	/*
	 *	控件失去检点
	 */
	me.checkFormSign = function(oForm){
		me.pass		= true;
		me.message	= "";
		me.first	= null;
		
		if(me.cancel==true){
			return true;
		}
		
		var els =document.getElementById(oForm.id);
			//取得格式
			var sUsage	= els.getAttribute("Usage");	
			var sReg	= "";
			
			//如果设置Usage，则使用内置正则表达式，忽略Exp
			if(typeof(sUsage)!="undefined"&&sUsage!=null){
				//如果Usage在表达室里找到，则使用内置表达式，无则认为是表达式；表达式可以是函数；
				if(aUsage[sUsage]!=null){			
					sReg = aUsage[sUsage];
				} else {
					try {
						if(eval(sUsage)==false){	
							me.pass		= false;
							if(me.first==null){
								me.first	= els;
							}

							addMessage(getMessage(els));							

							if(me.showAll==false){
								setFocus(els);
							}
						}
					} catch(e){ 
						alert("表达式[" + sUsage +"]错误:" + e.description)
						return false;
					}
				}
			} else {			
				sReg = els.getAttribute("Exp");
			}

			if(typeof(sReg)!="undefined"&&sReg!=null){
				//对于失效状态不验证
				if(isDisabled(els)==true){
				}

				//取得表单的值,用通用取值函数
				var sVal = getValue(els);
				//字符串->正则表达式,不区分大小写
				var reg = new RegExp(sReg,"i");
				if(!reg.test(sVal)){
				
					me.pass		= false;
					if(me.first==null){
						me.first	= els;
					}

					//alert(reg);
					//验证不通过,弹出提示warning
					var sTip = getMessage(els);
					if(sTip.length==0&&typeof(sUsage)!="undefined"&&sUsage!=null&&aMessage[sUsage]!=null){
						sTip = aMessage[sUsage];
					}
					addMessage(sTip);

					if(me.showAll==false){
						//该表单元素取得焦点,用通用返回函数
						setFocus(els);
					}
				}
			}        


		if(me.pass==false){
			showMessage(oForm);

			if(me.first!=null&&me.showAll==true&&false){
				setFocus(me.first);
			}
		}
		else
	    {
	        showTipMessage(oForm,"ok");
	    }

		return me.pass;
	}


	/*
	 *	控件获得检点
	 */
	me.OnfocusFormSign = function(oForm){
	    showTipMessage(oForm,"tipmsg");
	}



	/*
	 *	添加错误信息
	 */
	function addMessage(msg){
		if(me.alert==true){
			me.message = msg ;
		} else {
			me.message = msg ;
		}
	}

	/*
	 *	获取错误信息
	 */
	function getMessage(els){
		var sTip = els.getAttribute("tiperror");
		var sMsg = els.getAttribute("divMessageId");
		//显示指定的错误信息（tiperror属性存在）
		if(typeof(sTip)!="undefined"&&sTip!=null){
			return sTip;
		}
		//没有指定错误信息（tiperror属性不存在），默认显示说明文字（DivMessage的文本值）
		else if(typeof(sMsg)!="undefined"&&sMsg!=null){
	        var sMsgValue;
			if(window.attachEvent)
			{
				sMsgValue=document.getElementById(sMsg).innerText;
			}
			else
			{
				var sMsgValue=document.getElementById(sMsg).textContent;
			}
			return sMsgValue;
		}else
		{
		    return "";
		}
	}


	/*
	 *	显示错误
	 */
	function showMessage(ChkForm){
		//外接显示错误函数
		if(typeof(me.showMessageEx)=="function"){
			return me.showMessageEx(me.message);
		}

		if(me.alert==true){
		    //alert(me.message);
		    popHint($E('txtAddress'), 'Yahoo中有不合法字符...', 'blur');
		} else {
			var divTip;
                divTip  = (document.getElementById(ChkForm.id)).getAttribute("divMessageId");
			try	{
			    if (typeof (divTip) == "undefined" || divTip == null) {
			        popHint($E('txtAddress'), 'Yahoo中有不合法字符...', 'blur');
                        //alert(me.message);
				}
                else
                {
				    document.getElementById(divTip).innerHTML = me.message;
				    document.getElementById(divTip).className= "ErrorMsg";
				    
				}
			}catch(e){}
		}
	}
	
	
	
     /*
	 *	添加提示信息
	 */
	function addTipMessage(msg){
		if(me.alert==true){
			me.message = msg ;
		} else {
			me.message = msg ;
		}
	}

	/*
	 *	显示提示信息
	 */
	function getTipMessage(els){
		var sTip = els.getAttribute("tipmsg");
		var sMsg = els.getAttribute("divMessageId");
		//显示指定的错误信息（tipmsg属性存在）
		if(typeof(sTip)!="undefined"&&sTip!=null){
			return sTip;
		}
		//没有指定错误信息（tipmsg属性不存在），默认显示说明文字（DivMessage的文本值）
		else if(typeof(sMsg)!="undefined"&&sMsg!=null){
			var sMsgValue;
			if(document.getElementById(sMsg)!=null)
				{
				if(window.attachEvent)
				{
					sMsgValue=document.getElementById(sMsg).innerText;
				}
				else
				{
					var sMsgValue=document.getElementById(sMsg).textContent;
				}
				return sMsgValue;
			}
			
		}else
		{
		    return "";
		}
	}
	
	/*
	 *	显示提示
	 */
	function showTipMessage(ChkForm,ChkMsg){
	   	addTipMessage(getTipMessage(ChkForm));
		var divTip;
            divTip  = (document.getElementById(ChkForm.id)).getAttribute("divMessageId"); 
		try	{
			    if(typeof(divTip)=="undefined"||divTip==null){
			    }
            else
            {
                if(ChkMsg=="ok")
                {

                    document.getElementById(divTip).innerHTML = me.message+"";
                    document.getElementById(divTip).className= "ValidateOK";
                }
                else
                {
			        document.getElementById(divTip).innerHTML = me.message;
			        document.getElementById(divTip).className= "WarningMsg";
			    }
			}
		}catch(e){}
		
	}

	/*
	 *	获得元素是否失效（失效的元素不做判断）
	 */
	function isDisabled(el){
		//对于radio,checkbox元素，只要其中有一个非失效元素就验证
		if(el.type=="radio"||el.type=="checkbox"){
			//取得第一个元素的name,搜索这个元素组
			var tmpels = document.getElementsByName(el.name);
			for(var i=0;i<tmpels.length;i++){
				if(tmpels[i].disabled==false){
					return false;
				}
			}
			return true;
		}else{
			return el.disabled;
		}
	}


	/*
	 *	取得对象的值（对于单选多选框把其选择的个数作为需要验证的值）
	 */
	function getValue(el){
		//取得表单元素的类型
		var sType = el.type;
		switch(sType){
			//文本输入框,直接取值el.value
			case "text":
			case "hidden":
			case "password":
			case "file":
			case "textarea": return el.value;
			//单多下拉菜单,遍历所有选项取得被选中的个数返回结果"0"表示选中一个，"00"表示选中两个
			case "checkbox":
			case "radio": return getRadioValue(el);
			case "select-one":
			case "select-multiple": return getSelectValue(el);
		}
		//取得radio,checkbox的选中数,用"0"来表示选中的个数,我们写正则的时候就可以通过0{1,}来表示选中个数
		function getRadioValue(el){
			var sValue = "";
			//取得第一个元素的name,搜索这个元素组
			var tmpels = document.getElementsByName(el.name);
			for(var i=0;i<tmpels.length;i++){
				if(tmpels[i].checked){
					sValue += "0";
				}
			}
			return sValue;
		}
		//取得select的选中数,用"0"来表示选中的个数,我们写正则的时候就可以通过0{1,}来表示选中个数
		function getSelectValue(el){
			var sValue = "";
			for(var i=0;i<el.options.length;i++){
				//单选下拉框提示选项设置为value=""
				if(el.options[i].selected && el.options[i].value!=""){
					sValue += "0";
				}
			}
			return sValue;
		}
	}

	/*
	 *	对没有通过验证的元素设置焦点
	 */
	function setFocus(el){
		//取得表单元素的类型
		var sType = el.type;
		switch(sType){
			//文本输入框,光标定位在文本输入框的末尾
			case "text":
			case "hidden":
			case "password":
			case "file":
			case "textarea": 
				try{el.focus();var rng = el.createTextRange(); rng.collapse(false); rng.select();}catch(e){};
				break;
			
			//单多选,第一选项非失效控件取得焦点
			case "checkbox":
			case "radio": 
				var els = document.getElementsByName(el.name);
				for(var i=0;i<els.length;i++){
					if(els[i].disabled == false){
						els[i].focus();
						break;
					}
				}
				break;
			case "select-one":
			case "select-multiple":
				el.focus();
				break;
		}
	}


	//避免内存漏洞的addEvent方法
	function addEvent(obj, type, fn){
		if (obj.addEventListener){
			obj.addEventListener(type, fn, false);
		}
		else if (obj.attachEvent){
			obj['e'+ type + fn] = fn;
			obj.detachEvent('on'+ type, obj['e'+ type + fn]);
			obj.attachEvent('on'+ type, obj['e'+ type + fn]);
		}
	}

	function removeEvent(obj, type, fn){
		if (obj.removeEventListener){
			obj.removeEventListener(type, fn, false);
		}
		else if (obj.detachEvent){
			obj.detachEvent('on'+ type, obj['e'+ type + fn]);
			obj['e'+ type + fn] = null;
		}
	}
	
	//自动绑定到所有form的onsubmit事件
	if(window.attachEvent){
		window.attachEvent("onload",function()
									{
										for(var i=0;i<document.forms.length;i++){
											var theFrom = document.forms[i]; 
												function mapping(f){
													var fn = function(){return me.checkForm(f);}
													addEvent(f,"submit",fn);
													addEvent(window,"unload",function(){removeEvent(f,"submit",fn);});
												} 

												if(theFrom){													
													mapping(theFrom); 
													var _ie_form_click =		function(){
																								var o = event.srcElement;
																								if(typeof(o.type)!="undefined"){
																									var check = o.getAttribute("check");
																									if(typeof(check)!="undefined"&&check!=null&&check.toLowerCase()=="false"){
																										me.cancel = true;
																									}																									
																								}
																							}

													addEvent(theFrom,"click",_ie_form_click); 													
													addEvent(window,"unload",function(){removeEvent(theFrom,"click",_ie_form_click);});
													
												}
										}
									}
							);

	}
	else
	{
	
		window.onsubmit = function(e){var theFrom = e.target;if(theFrom){return me.checkForm(theFrom);}}
		var _ff_form_click = function(e){	var o = e.target;
								if(typeof(o.type)!="undefined"){
									var check = o.getAttribute("check");
									if(typeof(check)!="undefined"&&check!=null&&check.toLowerCase()=="false"){me.cancel = true;}																									
									}
								}
		addEvent(window,"click",_ff_form_click);
		addEvent(window,"unload",function(){removeEvent(window,"click",_ff_form_click);});

		
	}


	this.keyCheck = function() {

	    addEvent(window, "load", function(e) { for (var i = 0; i < document.forms.length; i++) { var theFrom = document.forms[i]; if (theFrom) { myKeyCheck(theFrom); } } });

	    function myKeyCheck(oForm) {
	        var els = oForm.elements;
	        //遍历所有表元素
	        for (var i = 0; i < els.length; i++) {
	            //取得格式
	            
	            var sUsage = els[i].getAttribute("Usage");
	            var sExp = els[i].getAttribute("exp");
	            var sdivMessageId = els[i].getAttribute("divMessageId");
	            //如果设置sdivMessageId，则绑定“失去焦点”和“点击控件”事件
	            if ((typeof (sdivMessageId) != "undefined" && sdivMessageId != null)) {


	                var theFrom = els[i];
	                function mapping(f) {
	                    var fn = function() { return me.checkFormSign(f); }
	                    var fnshow = function() { return me.OnfocusFormSign(f); }

	                    addEvent(f, "blur", fn);
	                    addEvent(window, "unload", function() { removeEvent(f, "blur", fn); });


	                    addEvent(f, "click", fnshow);
	                    addEvent(window, "unload", function() { removeEvent(f, "click", fnshow); });
	                }

	                if (theFrom) {
	                    mapping(theFrom);
	                }
	             
	                if (typeof (sUsage) != "undefined" && sUsage != null) {
	                    switch (sUsage.toLowerCase()) {
	                        case "zipcode":
	                        case "int":
	                            els[i].onkeypress = function(e) { var chr; if (e) chr = e.charCode; else chr = window.event.keyCode; if (chr == 0) return true; else return /\d/.test(String.fromCharCode(chr)) || (this.value.indexOf('+') < 0 ? String.fromCharCode(chr) == "+" : false) || (this.value.indexOf('-') < 0 ? String.fromCharCode(chr) == "-" : false); }
	                            els[i].onpaste = function(e) { if (e == null) return !clipboardData.getData('text').match(/\D/); else return false; }
	                            els[i].ondragenter = function(e) { return false; }
	                            els[i].style.imeMode = "disabled";
	                            break;
	                        case "mobile":
	                        case "int+":
	                            els[i].onkeypress = function(e) { var chr; if (e) chr = e.charCode; else chr = window.event.keyCode; if (chr == 0) return true; else return /\d/.test(String.fromCharCode(chr)) || (this.value.indexOf('+') < 0 ? String.fromCharCode(chr) == "+" : false); }
	                            els[i].onpaste = function(e) { if (e == null) if (e == null) return !clipboardData.getData('text').match(/\D/); else return false; else return false; }
	                            els[i].ondragenter = function(e) { return false; }
	                            els[i].style.imeMode = "disabled";
	                            break;
	                        case "int-":
	                            els[i].onkeypress = function(e) { var chr; if (e) chr = e.charCode; else chr = window.event.keyCode; if (chr == 0) return true; else return /\d/.test(String.fromCharCode(chr)) || (this.value.indexOf('-') < 0 ? String.fromCharCode(chr) == "-" : false); }
	                            els[i].onpaste = function(e) { if (e == null) return !clipboardData.getData('text').match(/\D/); else return false; }
	                            els[i].ondragenter = function(e) { return false; }
	                            els[i].style.imeMode = "disabled";
	                            break;
	                        case "float":
	                        case "num":
	                            els[i].onkeypress = function(e) { var chr; if (e) chr = e.charCode; else chr = window.event.keyCode; if (chr == 0) return true; else return /[\+\-\.]|\d/.test(String.fromCharCode(chr)); }
	                            els[i].onpaste = function(e) { if (e == null) return !clipboardData.getData('text').match(/\D/); else return false; }
	                            els[i].ondragenter = function(e) { return false; }
	                            els[i].style.imeMode = "disabled";
	                            break;
	                        case "float+":
	                        case "num+":
	                            els[i].onkeypress = function(e) { var chr; if (e) chr = e.charCode; else chr = window.event.keyCode; if (chr == 0) return true; else return /[\+\.]|\d/.test(String.fromCharCode(chr)); }
	                            els[i].onpaste = function(e) { if (e == null) return !clipboardData.getData('text').match(/\D/); else return false; }
	                            els[i].ondragenter = function(e) { return false; }
	                            els[i].style.imeMode = "disabled";
	                            break;
	                        case "float-":
	                        case "num-":
	                            els[i].onkeypress = function(e) { var chr; if (e) chr = e.charCode; else chr = window.event.keyCode; if (chr == 0) return true; else return /[\-\.]|\d/.test(String.fromCharCode(chr)); }
	                            els[i].onpaste = function(e) { if (e == null) return !clipboardData.getData('text').match(/\D/); else return false; }
	                            els[i].ondragenter = function(e) { return false; }
	                            els[i].style.imeMode = "disabled";
	                            break;
	                        case "ascii":
	                            els[i].style.imeMode = "disabled";
	                            break;
	                        case "ip4":
	                            els[i].onkeypress = function(e) { var chr; if (e) chr = e.charCode; else chr = window.event.keyCode; if (chr == 0) return true; else return /[\.]|\d/.test(String.fromCharCode(chr)); }
	                            els[i].onpaste = function(e) { if (e == null) return !clipboardData.getData('text').match(/\D/); else return false; }
	                            els[i].ondragenter = function(e) { return false; }
	                            els[i].style.imeMode = "disabled";
	                            els[i].maxLength = 15;
	                            break;
	                        case "color":
	                            els[i].onkeypress = function(e) { var chr; if (e) chr = e.charCode; else chr = window.event.keyCode; if (chr == 0) return true; else return /[a-fA-Z]|\d/.test(String.fromCharCode(chr)) || (this.value.indexOf('#') < 0 ? String.fromCharCode(chr) == "#" : false); }
	                            els[i].onpaste = function(e) { if (e == null) return !clipboardData.getData('text').match(/\D/); else return false; }
	                            els[i].ondragenter = function(e) { return false; }
	                            els[i].maxLength = 7;
	                            els[i].style.imeMode = "disabled";
	                            break;
	                        case "date":
	                            els[i].onkeypress = function(e) { var chr; if (e) chr = e.charCode; else chr = window.event.keyCode; if (chr == 0) return true; else return /[\/\-\.]|\d/.test(String.fromCharCode(chr)); }
	                            els[i].onpaste = function(e) { if (e == null) return !clipboardData.getData('text').match(/\D/); else return false; }
	                            els[i].ondragenter = function(e) { return false; }
	                            els[i].style.imeMode = "disabled";
	                            break;
	                    }
	                }
	            }
	        }

	    }
	}
}

//初始化
var g_check = new CLASS_CHECK();
	g_check.keyCheck();
