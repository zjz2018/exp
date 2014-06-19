//<reference path="jquery-1.3.2-vsdoc2.js" />
var BeyondbitUIBaseClass=function()
{  
    this.Buttons=$("input[type='button'],input[type='submit'],input[type='reset'],input[type='image'][class^='ToolStyle']");
    this.Selects=$("select");
    this.CheckBoxAndRadioBox=$("input[type='checkbox'],input[type='radio']");
    this.TextBox=$("input[type='text'],textarea");
}

BeyondbitUIBaseClass.prototype =
{
    GetToolButtons: function() { return this.Buttons.filter("[class^='ToolStyle']"); },
    GetStyleButtons: function() { return this.Buttons.filter("[class^='BtnStyle']"); },
    GetNeedStyleButtons: function() { return this.Buttons.not("input[field_name],input[class*='go']"); } //button的过滤条件
}

var BeyondbitUIBase = null;
$(document).ready(function(){
BeyondbitUIBase = new BeyondbitUIBaseClass();
});


var BeyondbitStyleClass = function() {
    
}
BeyondbitStyleClass.prototype = {
    Init: function() {
        if ($("body").attr("EnableStyle") == "false") return;
        //处理disabled的输入框
        BeyondbitUIBase.TextBox.each(
        function() {

            if ($(this).attr("disabled") == true) {
                $(this).removeAttr("disabled");
                $(this).attr("readOnly", "true");
                $(this).css({ "background-color": "Transparent", "color": "#000", "background-image": "url()", "border": "0px" });
                if ($(this).is("textarea")) {
                    $(this).css("overflow-y", "hidden");
                }
                $(this).focus(function() { this.blur(); });
            }

        }
        );
        var app = this;
        BeyondbitUIBase.CheckBoxAndRadioBox.each(
        function() { app.processRadioAndCheckbox($(this)); });

        BeyondbitUIBase.GetNeedStyleButtons().each(
        function() { app.processButton($(this)); }
        );

        BeyondbitUIBase.Selects.each(
        function() { app.processSelect($(this)); }
        );
    },

    processSelect: function(select) {
        if (select.attr("disabled") == true) {
            select.css("display", "none");
            var span = document.createElement("span");
            span.innerText = select.find("option:selected").text();
            select.before(span);
        }
    },

    processRadioAndCheckbox: function(button) {
        button.css("display", "none");
        var img = document.createElement("img");
        img.src = "../../skin/skin1/images/button/16X16/" + ((button.attr("checked")) ? "" : "un") + ((button.attr("type").toLowerCase() == "checkbox") ? "checked" : "radio") + ".png";
        img.className = "CheckBoxStyle";
        button.before(img);
        if (button.next("label").get(0) != null) {
            var ele = button.next("label:first")
            if (ele.text().search(/全选/ig) == -1) {
                ele.css({ "width": "50px", "display": "inline-block" });
            }
            ele.css("cursor", "pointer");
            ele.bind("click", function(e) {
                if (this.previousSibling) {
                    this.previousSibling.click();
                    if (navigator.userAgent.indexOf("IE") < 0) { BeyondbitStyle.fireAllChangeEvent(); }
                }
            });
        }

        $(img).bind("click", function(e) {
            if (this.nextSibling) {
                this.nextSibling.click();
                if (navigator.userAgent.indexOf("IE") < 0) { BeyondbitStyle.fireAllChangeEvent(); }
            }
        });

        if ($.browser.msie) {
            button.bind('propertychange', function(e) {
                var button1 = e.srcElement;
                if (this.previousSibling) {
                    var img1 = this.previousSibling;
                    img1.src = "../../skin/skin1/images/button/16X16/" + ((button1.checked) ? "" : "un") + ((button1.type.toLowerCase() == "checkbox") ? "checked" : "radio") + ".png";
                }
            });
        }
        else {
            //button.attr("onchange", "BeyondbitStyle.fireChangeEvent(this);");
            button.get(0).setAttribute("onchange", "BeyondbitStyle.fireChangeEvent(this);");
        }

    },
    fireAllChangeEvent: function() {
        BeyondbitUIBase.CheckBoxAndRadioBox.change();

    },
    fireChangeEvent: function(button) {
        if (button.previousSibling) {
            var img1 = button.previousSibling;
            img1.src = "../../skin/skin1/images/button/16X16/" + ((button.checked) ? "" : "un") + ((button.type.toLowerCase() == "checkbox") ? "checked" : "radio") + ".png";
        }
    },
    processButton: function(button) {

        var btnTxt = (button.attr("type").toLowerCase() == "image") ? button.attr("alt") : button.val();

        var a1 = document.createElement("a");
        var a2 = document.createElement("b");
        var a3 = document.createElement("span");
        var a4 = document.createElement("div");

        if (button.attr("class").search(/BtnStyle/ig) == -1 && button.attr("class").search(/ToolStyle/ig) == -1) button.attr("class", "BtnStyle");
        var btnStyle = button.attr("class").replace(/  /ig, " ") + "  ";

        var bgStyle = btnStyle.split(" ")[0];
        var iconStyle = btnStyle.split(" ")[1];
        a1.style.display = button.css("display");

        a1.style.width = "auto";
        a1.style.height = "auto";
        //button.style.display = "none";
        button.css("display", "none");

        //自动识别按钮图标
        if (iconStyle == "") {
            if (btnTxt.indexOf("消") != -1 || btnTxt.indexOf("停") != -1) iconStyle = "cancel";
            if (btnTxt.indexOf("回") != -1) iconStyle = "return";
            if (btnTxt.indexOf("设") != -1 || btnTxt.indexOf("管") != -1) iconStyle = "config";
            if (btnTxt.indexOf("印") != -1) iconStyle = "print";
            if (btnTxt.indexOf("统") != -1) iconStyle = "statistic";
            if (btnTxt.indexOf("空") != -1) iconStyle = "empty";
            if (btnTxt.indexOf("序") != -1) iconStyle = "sequence";
            if (btnTxt.indexOf("选") != -1) iconStyle = "select";
            if (btnTxt.indexOf("预") != -1) iconStyle = "preview";
            if (btnTxt.indexOf("发") != -1) iconStyle = "publish";
            if (btnTxt.indexOf("入") != -1) iconStyle = "import";
            if (btnTxt.indexOf("出") != -1) iconStyle = "export";
            if (btnTxt.indexOf("下") != -1) iconStyle = "next";
            if (btnTxt.indexOf("前") != -1 || btnTxt.indexOf("上") != -1) iconStyle = "previous";
            if (btnTxt.indexOf("编") != -1 || btnTxt.indexOf("改") != -1) iconStyle = "edit";
            if (btnTxt.indexOf("增") != -1 || btnTxt.indexOf("新") != -1 || btnTxt.indexOf("加") != -1) iconStyle = "add";
            if (btnTxt.indexOf("删") != -1) iconStyle = "delete";
            if (btnTxt.indexOf("查") != -1) iconStyle = "query";
            if (btnTxt.indexOf("确") != -1 || btnTxt.indexOf("存") != -1 || btnTxt.indexOf("提") != -1) iconStyle = "save";
            if (iconStyle == "") iconStyle = "default";
        }
        a4.appendChild(document.createTextNode(btnTxt));
        a2.className = iconStyle;
        a1.appendChild(a2);
        a1.appendChild(a4);

        if (navigator.userAgent.indexOf("IE") <= 0 && button.attr("class").search(/BtnStyle/ig) != -1) {

            var textLength = getStrActualLen(btnTxt);
            a4.style.width = textLength * 9 + "px";
        }

        button.before(a1);
        a1.className = bgStyle;
        button = a1;

        button.style.cursor = "pointer";

        $(a1).bind("click", function(e) {
            if (this.nextSibling)
                this.nextSibling.click();
        });

        //添加圆角效果
        var i1 = document.createElement('i');
        var i2 = document.createElement('i');
        var s1 = document.createElement('span');
        var s2 = document.createElement('span');
        s1.appendChild(i1);
        s1.appendChild(s2);
        while (button.firstChild) {
            s1.appendChild(button.firstChild);
        }
        button.appendChild(s1);
        button.insertBefore(i2, s1);
    }
}

var BeyondbitStyle = new BeyondbitStyleClass();
$(document).ready(function() {
BeyondbitStyle.Init();
});

/*表单控件验证*/
var BeyondbitCheckFormClass = function() {
    this.pass = true; 	//是否通过验证
    this.showAll = true; 	//是否显示所有的验证错误
    this.alert = false; //报警方式（默认alert报警）
    this.message = new Array(); 	//错误内容
    this.first = null; 	//在显示全部验证错误时的第一个错误控件（用于回到焦点）
    this.cancel = false;
    this.ShowProcess = true;
    this.TempValue = "";
    this.LastTempValue = null;
    this.DialogWidth = 300;
    this.DialogHeight = 250;
    //定义内置格式
    this.aUsage = {
        "int": "^([+-]?)\\d+$", 										//整数
        "int+": "^([+]?)\\d+$", 										//正整数
        "int-": "^-\\d+$", 											//负整数
        "num": "^([+-]?)\\d*\\.?\\d+$", 								//数字
        "num+": "^([+]?)\\d*\\.?\\d+$", 								//正数
        "num-": "^-\\d*\\.?\\d+$", 									//负数
        "float": "^([+-]?)\\d*\\.\\d+$", 								//浮点数
        "float+": "^([+]?)\\d*\\.\\d+$", 								//正浮点数
        "float-": "^-\\d*\\.\\d+$", 									//负浮点数																		
        "email": "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
        "color": "^#[a-fA-F0-9]{6}", 									//颜色
        "url": "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //链接
        "chinese": "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$", 			//仅中文
        "ascii": "^[\\x00-\\xFF]+$", 									//仅ACSII字符
        "phone": "^(0?[0-9]{0,10}-?)?[0-9]{1,8}-?[0-9]{0,}|0{0,1}1[0-9]{10}$",
        "zipcode": "^\\d{6}$", 										//邮编
        "mobile": "^0{0,1}1[0-9]{10}$", 								//手机
        "ip4": "^\(([0-1]?\\d{0,2})|(2[0-5]{0,2}))\\.(([0-1]?\\d{0,2})|(2[0-5]{0,2}))\\.(([0-1]?\\d{0,2})|(2[0-5]{0,2}))\\.(([0-1]?\\d{0,2})|(2[0-5]{0,2}))$", 			//ip地址
        "notempty": "^(.|\\n)+$", 										//非空
        "picture": "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", //图片
        "rar": "(.*)\\.(rar|zip|7zip|tgz)$", 							//压缩文件
        "date": "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$"								//日期
    };

    this.ReplaceUsage = {
        "int": "^(([+-]?)\\d){0,}$", 										//整数
        "int+": "^(([+]?)\\d){0,}$", 										//正整数
        "int-": "^(-\\d){0,}$", 											//负整数
        "num": "^([+-]?)\\d*\\.?\\d+$", 								//数字
        "num+": "^([+]?)\\d*\\.?\\d+$", 								//正数
        "num-": "^-\\d*\\.?\\d+$", 									//负数
        "float": "^([+-]?)\\d*\\.\\d+$", 								//浮点数
        "float+": "^([+]?)\\d*\\.\\d+$", 								//正浮点数
        "float-": "^-\\d*\\.\\d+$", 									//负浮点数																		
        "email": "^([A-Za-z0-9]|@|\\.){0,}$", //邮件
        "color": "^(#|[a-fA-F0-9]){0,6}", 									//颜色
        "url": "^([A-Za-z0-9|:|\\.){0,}$", //链接
        "chinese": "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]{0,}$", 			//仅中文
        "ascii": "^[\\x00-\\xFF]{0,}$", 									//仅ACSII字符
        "phone": "^([0-9]|-){0,}$",
        "zipcode": "^\\d{0,6}$", 										//邮编
        "mobile": "^0{0,1}1[0-9]{0,10}$", 								//手机
        "ip4": "([0-9]|\\.){0,}$", 			//ip地址
        "notempty": "^(.|\\n)+$", 										//非空
        "picture": "^(.){0,}$", //图片
        "rar": "^(.){0,}$", 							//压缩文件
        "date": "^([0-9]|-){0,}$"								//日期
    }

    //缺省消息
    this.aMessage = {
        "int": "请输入整数", 										//整数
        "int+": "请输入正整数", 										//正整数
        "int-": "请输入负整数", 										//负整数
        "num": "请输入数字", 										//数字
        "num+": "请输入正数", 										//正数
        "num-": "请输入负整数", 										//负数
        "float": "请输入浮点数", 										//浮点数
        "float+": "请输入正浮点数", 									//正浮点数
        "float-": "请输入负浮点数", 									//负浮点数
        "email": "请输入正确的邮箱地址", 								//邮件
        "color": "请输入正确的颜色", 									//颜色
        "url": "请输入正确的连接地址", 								//联接
        "chinese": "请输入中文", 										//中文
        "ascii": "请输入ascii字符", 									//仅ACSII字符
        "zipcode": "请输入正确的邮政编码", 								//邮编
        "mobile": "请输入正确的手机号码", 								//手机
        "ip4": "请输入正确的IP地址", 									//ip地址
        "notempty": "不能为空", 										//非空
        "picture": "请选择图片", 										//图片
        "rar": "请输入压缩文件", 									//压缩文件
        "date": "请输入正确的日期"										//日期
    }
}

BeyondbitCheckFormClass.prototype = {
    Init: function() {
        var app = this;

        var Forms = $("form");

        Forms.each(
            function() {
                app.ProcessForm($(this));
                $(this).find("input[type='text'],textarea").each(
                                                                  function() { app.ProcessTextBox($(this)); }
                                                                 );
            }
        );
    },

    CheckAllForm: function() {
        var Forms = $("form");
        var app = this;

        Forms.each(
            function() { app.CheckForm($(this)); }
        );
        return this.pass;
    },

    CheckForm: function(form) {
        var TextBos = form.find("input[type='text'],textarea");
        if (this.cancel) {
            TextBos.each(function() {
                //HTML标签替换
                var element = $(this);
                var allowHTML = element.attr("AllowHTML");
                if (allowHTML == undefined || allowHTML != "true") {
                    element.val(element.val().replace(/\'/g, "’").replace(/</g, "＜").replace(/>/g, "＞"));
                }
            });
            return true; 
        }
        this.message = new Array();
        this.pass = true;
        var eles = form.find("[CheckFormat],[AllowEmpty],[Expression]");
        var app = this;
        if (eles.length > 0) {
            eles.each(function() { app.ControlToCheck($(this)); });
        }

        if (!this.pass) {

            this.first.focus();
            var HTML = "<ul>";
            for (var i = 0, ii = this.message.length; i < ii; i++) {
                HTML += "<li>" + this.message[i] + "</li>"
            }
            HTML += "</ul>"
            BeyondbitDialog.Show("页面数据输入有误", HTML, "error", 300, this.message.length * 22 + 30);
        }
        else {
            if (this.ShowProcess) {
            	showDialog = true;
                var HTML = "<br /><div width=\"100%\" height=\"100%\" style=\" vertical-align:middle;text-align:center;\"><img src=\"../../skin/skin1/images/button/16X16/loading.gif\" /></div>";
                //body的showDialog属性为false时，不显示提示框
                if($("body").attr("showDialog") == "false"){
                	showDialog = false;
                }
                /*
                if(showDialog){
                	BeyondbitDialog.Show("页面正在处理", HTML, "default", 200, 100);
                }*/
            }
        }
        
        TextBos.each(function() {
            //HTML标签替换
            var element = $(this);
            var allowHTML = element.attr("AllowHTML");
            if (allowHTML == undefined || allowHTML != "true") {
                element.val(element.val().replace(/\'/g, "’").replace(/</g, "＜").replace(/>/g, "＞"));
            }
        });
        return this.pass;
    },

    ControlToCheck: function(element) {
        var app = this;
        //空验证
        if (app.EmptyCheck(element) == true && $.trim(element.val()) != "") {
            app.FormatCheck(element); //有效性验证
        }
    },

    EmptyCheck: function(element) {
        var allowEmpty = true;
        if (element.attr("AllowEmpty") == "false") {
            var Value = element.is("input") || element.is("textarea") ? element.attr("value") : element.find("input:first").attr("value");
            if ($.trim(Value) == "") {
                this.message.push(element.attr("EmptyErrorMsg"));
                allowEmpty = false;
                this.pass = allowEmpty;
                if (this.first == null) {
                    this.first = element;
                }
            }
            else {

            }
        }
        return allowEmpty;
    },

    FormatCheck: function(element) {
        var checkType = element.attr("CheckFormat");
        var expression = element.attr("Expression");
        if (checkType != undefined || expression != undefined) {
            var sReg = "";
            if (element.attr("CheckFormat") != undefined) {
                //预定义格式验证
                if (this.aUsage[checkType] != null) {
                    sReg = this.aUsage[checkType];
                }
                else {
                    var MethodResult = eval(checkType);
                    if (MethodResult != "true") {
                        this.pass = false;
                        this.message.push(MethodResult);
                        if (this.first == null) {
                            this.first = element;
                            return;
                        }
                    }
                }
            }
            else {
                //正则验证
                sReg = expression;
            }
            var reg = new RegExp(sReg, "i");
            var Value = element.is("input") ? element.attr("value") : element.find("input:first").attr("value");

            if (!reg.test(Value)) {
                this.pass = false;
                this.message.push(element.attr("FormatErrorMsg"));
                if (this.first == null) {
                    this.first = element;
                }
                return;
            }
        }
    },

    ProcessForm: function(form) {
        form.bind("submit", function() {
            return BeyondbitCheckForm.CheckForm(form);
        });
        form.bind("click", function(e) {
            var element = e.target ? e.target : event.srcElement;
            var check = $(element).attr("EnableValidate");
            if (check == "false") { BeyondbitCheckForm.cancel = true; }
        });
    },

    ProcessTextBox: function(textBox) {
        textBox.bind(
            "keydown", function() {
                var me = $(this);
                var checkFormat = me.attr("CheckFormat");
                var expression = me.attr("Expression");
                var sReg = "";
                if (checkFormat != undefined) {
                    if (checkFormat != undefined)
                        sReg = BeyondbitCheckForm.ReplaceUsage[checkFormat];

                    if (sReg != null) {
                        var reg = new RegExp(sReg, "i");
                        if (reg.test(me.val())) {
                            BeyondbitCheckForm.TempValue = $(this).val();
                        }
                        else {
                            return false;
                        }
                    }
                }
            }
            );
        textBox.bind("keyup", function() {
            var me = $(this);
            var checkFormat = me.attr("CheckFormat");
            var sReg = "";
            if (checkFormat != undefined) {
                if (checkFormat != undefined) sReg = BeyondbitCheckForm.ReplaceUsage[checkFormat];
                if (sReg != null) {
                    var reg = new RegExp(sReg, "i");
                    if (!reg.test(me.val())) { me.val(BeyondbitCheckForm.TempValue); }
                }
            }
        }
        );
    }

}

var BeyondbitDialogClass = function(width, height,title, message) {
    this.DialogWidth = 300;
    this.DialogHeight = 200;
    this.Title = title ? title : "";    
    this.Message = message ? message : "";
    //this.initialize();
}

BeyondbitDialogClass.prototype = {
    initialize: function() {
        if ($("#BeyondbitBackgroundMask").size() == 0) {
            var html = " <div class=\"BeyondbitDialogToolBar\"><span  class=\"BeyondbitDialogCaption\" id=\"BeyondbitDialogCaption\">" + this.Title + "</span> <span  class=\"BeyondbitDialogCloseButton\" id=\"BeyondbitDialogCloseButton\" onclick=\"$('#BeyondbitBackgroundMask').hide();$('#BeyondbitDialog').hide()\"></span></div><div  class=\"BeyondbitDialogContent\" id=\"BeyondbitDialogContent\" style=\"height:" + (this.DialogHeight - 26) + "px\" >" + this.Message + "</div>";

            var eBeyondbitDialog = document.createElement("span");
            eBeyondbitDialog.id = "BeyondbitDialog";
            eBeyondbitDialog.style.width = this.DialogWidth;
            eBeyondbitDialog.style.height = this.DialogHeight;

            eBeyondbitDialog.className = "BeyondbitDialog";

            eBeyondbitDialog.innerHTML = html;
            eBeyondbitDialog.style.display = "none";
            $(document.body).prepend(eBeyondbitDialog);

            var div = document.createElement("span");
            div.id = "BeyondbitBackgroundMask";
            div.className = "BeyondbitDialogBackgroundMask";
            div.style.width = $(document).width() - 2 + "px";
            div.style.height = $(document).height() - 2 + "px";
            div.style.display = "none";
            $(document.body).prepend(div);
        }
    },

    Show: function(title, innerHTML, titleImage, width, height) {
        var Caption = $("#BeyondbitDialogCaption");
        Caption.html(title);
        Caption.addClass(titleImage);
        $("#BeyondbitDialogContent").css("height", height ? (height - 26) + "px" : (this.DialogHeight - 26)+"px");
        $("#BeyondbitDialogContent").html(innerHTML);
        $("#BeyondbitDialog").show();

        var Top = $(document).scrollTop() + (document.documentElement.clientHeight - (height ? height : this.DialogHeight)) / 2;
        var Left = (document.documentElement.clientWidth - (width ? width : this.DialogWidth)) / 2;
        $("#BeyondbitDialog").css("top", Top + "px");
        $("#BeyondbitDialog").css("left", Left + "px");
        $("#BeyondbitDialog").css("height", height ? height + "px" : this.DialogHeight + "px");
        $("#BeyondbitDialog").css("width", width ? width + "px" : this.DialogWidth + "px");
        $("#BeyondbitBackgroundMask").show();
    },

    Hidden: function() {
        $("#BeyondbitBackgroundMask").hide();
        $("#BeyondbitDialog").hide();
    },
    ShowProcess: function() {
        var HTML = "<br /><div width=\"100%\" height=\"100%\" style=\" vertical-align:middle;text-align:center;\"><img src=\"../../skin/skin1/images/button/16X16/loading.gif\" /></div>";
       // this.Show("页面正在处理", HTML, "default",200,100);
    }
}

var BeyondbitDialog = new BeyondbitDialogClass();
$(document).ready(function() {
BeyondbitDialog.initialize();
});

var BeyondbitCheckForm = new BeyondbitCheckFormClass();
$(document).ready(function() {
BeyondbitCheckForm.Init();
});

/*公共方法*/
function getStrActualLen(sChars) {
    return sChars.replace(".", "x").replace(/[^\x00-\xff]/g, "xx").length;
}

function jumpPage(pageNo) {
	$("#pageNo").val(pageNo);
	$("#mainForm").submit();
}
