function $get(id) {
    return document.getElementById(id);
}
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '');
}
String.prototype.isDateTime = function() {
    return this.match(/^\d{4}-\d{1,2}-\d{1,2}$/g) != null;
}
String.prototype.isInt = function() {
    return this.match(/^-?\d+$/g) != null;
}
String.prototype.isFloat = function() {
    return this.match(/^-?[0-9]+.?[0-9]*$/) != null;
}


function ChooseAll(objCheck, gridID) {

    var gird = document.getElementById(gridID);

    var inputs=gird.getElementsByTagName("INPUT");
    
    for (var i = 0,ii=inputs.length; i < ii; i++) // 遍历相应
    {
        if (inputs[i].type == "checkbox" ) {
            inputs[i].checked = objCheck.checked;
        }
    }
   
}

//键盘只能输入数字键
function onlyInt(obj) {
    var e = window.event || arguments[0];
    var fKey = '8,9,13,37,39,46'.split(',');
    for (var i = 0; i < fKey.length; i++) {
        if (e.keyCode == fKey[i]) return;
    }
    if (e.keyCode < 48 || (e.keyCode > 57 && e.keyCode < 96) || e.keyCode > 105) {
        e.returnValue = false; ;
        if (e.preventDefault) {
            e.preventDefault();
        } 
    } 
}
 