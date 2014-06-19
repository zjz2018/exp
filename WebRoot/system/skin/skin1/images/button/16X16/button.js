function GetOuterHTML(element) {
    return document.createElement("DIV").appendChild(element.cloneNode(true)).parentNode.innerHTML;
}
function getStrActualLen(sChars) {
    return sChars.replace(".","x").replace(/[^\x00-\xff]/g, "xx").length;
}
var btn = {
    init: function() {

        //处理输入框的Disabled状态

        var inputObj = [];
        inputObj.push(document.getElementsByTagName('INPUT'));
        inputObj.push(document.getElementsByTagName('TEXTAREA'));
        for (i = 0; i < inputObj.length; i++) {
            for (j = 0, jj = inputObj[i].length; j < jj; j++) {
                if (inputObj[i][j].disabled == true) {
                    inputObj[i][j].style.backgroundImage ="url()";// "url(../../../../Core/skin/skin2/images/button/16X16/textareaDisabledBg.png)";
                    inputObj[i][j].style.border="0px #000000";
                }
            }
        }

        if (!document.getElementById || !document.createElement || !document.appendChild) return false;

        var as = btn.getElementsByTagName('INPUT');

        for (i = 0; i < as.length; i++) {
            var button = as[i];

            if (button.type.toLowerCase() == "checkbox" || button.type.toLowerCase() == "radio") {
                btn.processRadioAndCheckbox(button); //处理单选框和复选框的外观样式
            }
            else {

                btn.processButton(button); //处理按钮外观样式，包括普通按钮和顶部的工具条按钮
            }
        }

    },
    findForm: function(f) {
        while (f.tagName != "FORM") {
            f = f.parentNode;
        }
        return f;
    },
    addEvent: function(obj, type, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(type, fn, false);
        }
        else if (obj.attachEvent) {
            obj["e" + type + fn] = fn;
            obj[type + fn] = function() { obj["e" + type + fn](window.event); }
            obj.attachEvent("on" + type, obj[type + fn]);
        }
    },
    getElementsByClassName: function(className, tag, elm) { //通过样式表获取元素集合
        var testClass = new RegExp("(^|\s)" + className + "(\s|$)");
        var tag = tag || "*";
        var elm = elm || document;
        var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
        var returnElements = [];
        var current;
        var length = elements.length;
        for (var i = 0; i < length; i++) {
            current = elements[i];
            if (testClass.test(current.className)) {
                returnElements.push(current);
            }
        }
        return returnElements;
    },
    getElementsByTagName: function(tag, elm) { //通过标签获取元素集合
        var tag = tag || "*";
        var elm = elm || document;

        var elements = elm.getElementsByTagName(tag);
        var returnElements = [];
        var current;
        var length = elements.length;

        for (var i = 0; i < length; i++) {
            current = elements[i];
            if ((
                    current.type.toLowerCase() == "checkbox"
                    ||
                    current.type.toLowerCase() == "radio"
                    ||
                    current.type.toLowerCase() == "submit"
                    ||
                    current.type.toLowerCase() == "reset"
                    ||
                    current.type.toLowerCase() == "button"
                    ||
                    (current.type.toLowerCase() == "image" && (current.className.search(/BtnStyle/ig) != -1 || current.className.search(/ToolStyle/ig) != -1))
                )
                &&
                    GetOuterHTML(current).search(/field_name/ig) == -1
            ) {

                returnElements.push(current);
            }
        }

        return returnElements;
    },
    processRadioAndCheckbox: function(button) {
        button.style.display = "none";
        var img = document.createElement("img");
        img.src = "../../skin/skin1/images/button/16X16/" + ((button.checked) ? "" : "un") + ((button.type.toLowerCase() == "checkbox") ? "checked" : "radio") + ".png";
        img.className = "CheckBoxStyle";
        button.parentNode.insertBefore(img, button);

        if (button.nextSibling) {
            if (button.nextSibling.tagName == "LABEL") {
                if (navigator.userAgent.indexOf("IE") < 0) {
                    button.nextSibling.removeAttribute("for");
                }
                button.nextSibling.className = "CheckBoxLabelStyle";
                if (GetOuterHTML(button.nextSibling).search(/全选/ig) == -1) button.nextSibling.style.width = "50px";

                btn.addEvent(button.nextSibling, 'click', function(e) {
                    if (this.previousSibling) {
                        this.previousSibling.click();
                        if (navigator.userAgent.indexOf("IE") < 0) { btn.fireAllChangeEvent(); }
                    }
                });
            }
        }

        if (navigator.userAgent.indexOf("IE") >= 0) {
            btn.addEvent(button, 'propertychange', function(e) {
                var button1 = e.srcElement;
                if (this.previousSibling) {
                    var img1 = this.previousSibling;
                    img1.src = "../../skin/skin1/images/button/16X16/" + ((button1.checked) ? "" : "un") + ((button1.type.toLowerCase() == "checkbox") ? "checked" : "radio") + ".png";
                }
            });
        }
        else {
            button.setAttribute("onchange", "btn.fireChangeEvent(this);");
        }

        btn.addEvent(img, 'click', function(e) {
             if (this.nextSibling) {
                this.nextSibling.click();
                if (navigator.userAgent.indexOf("IE") < 0) { btn.fireAllChangeEvent(); }
            }
        });

    },
    processRadioAndCheckboxs: function(ul) {
        var as = ul.find('INPUT');
        for (i = 0; i < as.length; i++) {
            var button = as[i];
            if (button.type.toLowerCase() == "checkbox" || button.type.toLowerCase() == "radio")//处理单选框和复选框的外观样式
            {
                btn.processRadioAndCheckbox(button);
            }
        }
    },
    fireAllChangeEvent: function() {
        var findBoxes = btn.getElementsByTagName('INPUT');
        for (i = 0; i < findBoxes.length; i++) {
            var Box = findBoxes[i];
            if (Box.type.toLowerCase() == "checkbox" || Box.type.toLowerCase() == "radio") {
                Box.onchange(); //处理单选框和复选框的外观样式
            }
        }
    },
    fireChangeEvent: function(button) {
        if (button.previousSibling) {
            var img1 = button.previousSibling;
            img1.src = "../../skin/skin1/images/button/16X16/" + ((button.checked) ? "" : "un") + ((button.type.toLowerCase() == "checkbox") ? "checked" : "radio") + ".png";
        }
    },
    processButton: function(button) {
        var btnTxt = (button.type.toLowerCase() == "image") ? button.alt : button.value;
        var a1 = document.createElement("a");
        var a2 = document.createElement("b");
        var a3 = document.createElement("span");
        var a4 = document.createElement("div");
        var control = "document.all." + button.id;
        if (button.className.search(/BtnStyle/ig) == -1 && button.className.search(/ToolStyle/ig) == -1) button.className = "BtnStyle";
        var btnStyle = button.className.replace(/  /ig, " ") + "  ";
        var bgStyle = btnStyle.split(" ")[0];
        var iconStyle = btnStyle.split(" ")[1];
        a1.style.display = button.style.display;
        a1.style.width = "auto";
        a1.style.height = "auto";
        button.style.display = "none";

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

        if (navigator.userAgent.indexOf("IE") <= 0 && button.className.search(/BtnStyle/ig) != -1) {

            var textLength = getStrActualLen(btnTxt);
            a4.style.width = textLength * 9 + "px";
        }

        button.parentNode.insertBefore(a1, button);

        a1.className = bgStyle;

        button = a1;
        button.style.cursor = "pointer";

        btn.addEvent(a1, 'click', function(e) {
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

btn.addEvent(window, 'load', function() { btn.init(); });