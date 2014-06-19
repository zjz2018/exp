/// <reference path="jquery-1.3.2-vsdoc2.js" />

var CONTROL_STATE = "__CONTROLSTATE";
var FORM_ENCTYPE_MULTIPART = "multipart/form-data";
var UNIQUE_REQUEST_UPLOAD_IDENTITY = "uid";

/* EventArgs */
EventArgs = function(source) {
    this.m_source = source;
}

EventArgs.prototype = {
    get_source: function() { return this.m_source; },
    set_source: function(value) { this.m_source = value; }
}

/* CancelEventArgs */
CancelEventArgs = function(source) {
    this.initializeBase(this, new EventArgs(source));
    this.m_cancel = false;
}

CancelEventArgs.prototype = {
    get_cancel: function() { return this.m_cancel; },
    set_cancel: function(value) { this.m_cancel = value; },

    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    }
}

/* SelectionChangedEventArgs */
SelectionChangedEventArgs = function(source, selectedIndex) {
    this.initializeBase(this, new EventArgs(source));
    this.m_selectedIndex = selectedIndex;
}

SelectionChangedEventArgs.prototype = {
    get_selectedIndex: function() { return this.m_selectedIndex; },
    set_selectedIndex: function(value) { this.m_selectedInex = value; },

    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    }
}

/* ProgressUpdatingEventArgs */
ProgressUpdatingEventArgs = function(source, progressData) {
    this.initializeBase(this, new EventArgs(source));
    this.m_progressData = progressData;
}

ProgressUpdatingEventArgs.prototype = {
    get_progressData: function() { return this.m_progressData; },
    set_progressData: function(value) { this.m_progressData = value; },

    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    }
}

/* TreeNodeEventArgs */
TreeNodeEventArgs = function(source, node) {
    this.initializeBase(this, new EventArgs(source));
    this.m_node = node;
}

TreeNodeEventArgs.prototype = {
    get_node: function() { return this.m_node; },
    set_node: function(value) { this.m_node = value; },

    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    }
}

/* HttpUtility */
HttpUtility = function() { }

HttpUtility.prototype = {
    urlEncode: function(url) { return encodeURIComponent(url); },

    urlDecode: function(url) { return decodeURIComponent(url); },

    getUrlParameters: function(url) {
        var strArray = url.split("?");
        var params = new Array();
        var str2 = "";

        if (strArray.length > 1)
            str2 = strArray[1];
        if (str2.length > 0) {
            var strArray2 = str2.split("&");

            for (var i = 0, len = strArray2.length; i < len; ++i) {
                var strArray3 = strArray2[i].split("=");
                if (strArray3.length > 0)
                    params[strArray3[0]] = (strArray3.length > 1 ? strArray3[1] : null);
            }
        }

        return params;
    },

    addUrlParameter: function(url, name, value) {
        if (!name || !value || name.length == 0 || value.length == 0)
            return url;
        var str = name + "=" + escape(value);
        var strArray = url.split("?");
        var strArray2 = null;
        var str2 = strArray[0];
        var str3 = "";
        if (strArray.length > 1)
            str3 = strArray[1];
        if (str3.length > 0) {
            if (str3.indexOf(name) == -1)
                return (url + "&" + str);
            strArray2 = str3.split("&");
        }
        else
            return (url + "?" + str);
        var i = 0;
        var buffer = "";
        while (true) {
            if (i >= strArray2.length) {
                buffer += str;
                return (str2 + "?" + buffer);
            }
            var str4 = strArray2[i];
            if (str4.indexOf(name + "=") != 0 && (str4.length != 0))
                buffer += (str4 + "&");
            ++i;
        }
    },

    removeUrlParameter: function(url, name) {
        var str1 = url.split("?");
        var str2 = str1[0];
        var str3 = "";
        if (str1.length > 1)
            str3 = str1[1];
        if (str3.indexOf(name) != -1) {
            var str4 = str3.split("&");
            var i = 0;
            var buffer = "";
            while (true) {
                if (i >= str4.length)
                    return str2 + "?" + buffer.substring(0, buffer.length - 1);
                var str5 = str4[i].replace("\r\n", ""); ;
                if (str5.indexOf(name + "=") != 0 && (str5.length != 0))
                    buffer += (str5 + "&");
                ++i;
            }
        } else
            return url;
    }
}

/* EventHandlerList */
EventHandlerList = function() {
    this.m_handlerMapping = new Array();
}

EventHandlerList.prototype = {
    contains: function(key) { return !(typeof (this.m_handlerMapping[key]) == "undefined"); },

    get_handlerList: function(key) { return this.m_handlerMapping[key]; },

    add_handler: function(key, value) {
        if (!this.contains(key))
            this.m_handlerMapping[key] = new Array();
        this.m_handlerMapping[key].push(value);
    },

    remove_handler: function(key, value) {
        if (this.contains(key)) {
            var handlerList = this.get_handlerList(key);
            for (var i = 0; i < handlerList.length; ++i) {
                if (handlerList[i] == value)
                    handlerList.splice(i, 1);
            }
        }
    },

    remove_handlerList: function(key) {
        if (this.contains(key))
            delete this.m_handlerMapping[key];
    },

    invoke: function(key, args) {
        if (this.contains(key)) {
            var handlerList = this.get_handlerList(key);
            var params = new Array();
            if (typeof (arguments) != "undefined") {
                for (var i = 1; i < arguments.length; ++i)
                    params.push(arguments[i]);
            }
            for (var i = 0; i < handlerList.length; ++i) {
                if (typeof (handlerList[i]) == "function")
                    handlerList[i].apply(this, params);
            }
        }
    }
}

/* RadioButtonList */
RadioButtonList = function(rawData) {
    this.m_rawData = JSON.parse(rawData);
    this.initializeBase(this, this.m_rawData);
    this.m_element = document.getElementById(this.ClientID);
    this.m_stateElement = document.getElementById(this.ClientID + CONTROL_STATE);
    this.m_radios = $("input[type=radio]", this.get_element());
    this.initialize();
}

RadioButtonList.prototype = {
    get_element: function() { return this.m_element; },

    get_rawData: function() { return this.m_rawData; },

    get_stateElement: function() { return this.m_stateElement; },

    get_stateObject: function() { return JSON.parse(this.m_stateElement.value); },

    set_stateByObject: function(obj) { this.m_stateElement.value = JSON.stringify(obj); },

    get_stateValue: function() { return this.m_stateElement.value; },

    get_clientID: function() { return this.ClientID; },

    get_onClientClick: function() { return this.OnClientClick; },

    get_radios: function() { return this.m_radios; },

    get_selectedIndex: function() {
        var selectedIndex = -1;
        this.get_radios().each(function() {
            ++selectedIndex;
            if (this.checked)
                return false;
        });
        return selectedIndex;
    },

    get_selectedValue: function() {
        var value = null;
        this.get_radios().each(function() { if (this.checked) return (value = this.nextSibling.innerText); });
        return value;
    },

    set_stateSelectedIndex: function(selectedIndex) {
        var state = this.get_stateObject();
        state.SelectedIndex = selectedIndex;
        this.set_stateByObject(state);
    },

    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    },

    initialize: function() {
        var rbl = this;
        this.get_radios().bind("click", function() { rbl.onSelectedIndexChanged(this); });
        this.set_stateByObject(this.get_rawData());
    },

    doSelection: function(selectedIndex) {
        var find = false;
        this.get_radios().each(function(i) { find |= (this.checked = (i == selectedIndex)); });
        if (find) this.set_stateSelectedIndex(selectedIndex);
    },

    raiseOnClick: function(e) {
        var handler = this.OnClientClick ? eval(this.OnClientClick) : null;
        if (handler) handler(this, e);
    },

    onSelectedIndexChanged: function(sender) {
        var selectedIndex = this.get_selectedIndex();
        var e = new SelectionChangedEventArgs(sender, selectedIndex);
        this.trackSelectedIndexChanged(e);
        this.raiseOnClick(e);
    },

    trackSelectedIndexChanged: function(e) {
        var selectedIndex = e.get_selectedIndex();
        this.set_stateSelectedIndex(selectedIndex);
    },

    registerLinkageHandler: function(target) {
        var rbl = this;
        var initiatorChange = target.OnClientInitiatorChange ? eval(target.OnClientInitiatorChange) : null;
        var radios = this.get_radios().bind("click", function() {
            if (initiatorChange) initiatorChange(this);
            if (target.IsAsyncEnabled)
                target.onInitiatorSelectedIndexChanged(this);
        });
    }
}

/* CheckBoxList */
CheckBoxList = function(rawData) {
    this.m_rawData = JSON.parse(rawData);
    this.initializeBase(this, this.m_rawData);
    this.m_element = document.getElementById(this.ClientID);
    this.m_checkBoxes = $("input[type=checkbox]", this.get_element());
    this.initialize();
}

CheckBoxList.prototype = {
    get_element: function() { return this.m_element; },

    get_rawData: function() { return this.m_rawData; },

    get_clientID: function() { return this.ClientID; },

    get_onClientClick: function() { return this.OnClientClick; },

    get_checkBoxes: function() { return this.m_checkBoxes },

    get_selectedIndexs: function() {
        var arr = new Array();
        this.get_checkBoxes().each(function(i) { if (this.checked) arr.push(i); });
        return arr;
    },

    get_selectedValues: function() {
        var arr = new Array();
        this.get_checkBoxes().each(function() { if (this.checked) arr.push(this.nextSibling.innerText); });
        return arr;
    },

    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    },

    initialize: function() {
        var cbl = this;
        this.get_checkBoxes().bind("click", function() { cbl.onSelectedIndexChanged(this); });
    },

    raiseOnClick: function(e) {
        var handler = this.OnClientClick ? eval(this.OnClientClick) : null;
        if (handler) handler(this, e);
    },

    onSelectedIndexChanged: function(sender) {
        var e = new EventArgs(sender);
        this.raiseOnClick(e);
    },

    checkedAll: function(checked) {
        this.get_checkBoxes().each(function() { this.checked = checked; });
    }
}

/* LinkageDropDownList */
LinkageDropDownList = function(rawData) {
    this.m_rawData = JSON.parse(rawData);
    this.initializeBase(this, this.m_rawData);
    this.m_element = document.getElementById(this.ClientID);
    this.m_stateElement = document.getElementById(this.ClientID + CONTROL_STATE);
    this.m_initiator = null;
    this.initialize();
}

LinkageDropDownList.prototype = {
    get_element: function() { return this.m_element; },

    get_rawData: function() { return this.m_rawData; },

    get_stateElement: function() { return this.m_stateElement; },

    get_stateObject: function() { return JSON.parse(this.m_stateElement.value); },

    set_stateByObject: function(obj) { this.m_stateElement.value = JSON.stringify(obj); },

    get_stateValue: function() { return this.m_stateElement.value; },

    get_clientID: function() { return this.ClientID; },

    get_items: function() { return this.Items; },

    get_initiatorID: function() { return this.InitiatorID; },

    get_onClientChange: function() { return this.OnClientChange; },

    get_onClientInitiatorChange: function() { return this.OnClientInitiatorChange; },

    get_onClientInitiatorChangeCallback: function() { return this.OnClientInitiatorChangeCallback; },

    get_initiator: function() { return this.m_initiator; },

    get_selectedIndex: function() { return this.get_element().selectedIndex; },

    set_selectedIndex: function(value) { this.get_element().selectedIndex = value; },

    set_stateSelectedIndex: function(selectedIndex) {
        var state = this.get_stateObject();
        state.SelectedIndex = selectedIndex;
        this.set_stateByObject(state);
    },

    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    },

    initialize: function() {
        this.m_initiator = this.get_initiatorID() ? eval(this.get_initiatorID()) : null;
        this.registerSelectedIndexChanged();
        this.registerInitiatorSelectedIndexChanged();
        this.set_stateByObject(this.get_rawData());
    },

    registerSelectedIndexChanged: function() {
        var ddl = this;
        $(this.m_element).bind("change", function() { ddl.onSelectedIndexChanged(this); });
    },

    raiseOnChange: function(e) {
        var handler = this.OnClientChange ? eval(this.OnClientChange) : null;
        if (handler) handler(this, e);
    },

    registerLinkageHandler: function(target) {
        $(this.m_element).bind("change", function() { target.onInitiatorSelectedIndexChanged(this); });
    },

    registerInitiatorSelectedIndexChanged: function() {
        if (this.get_initiator())
            this.get_initiator().registerLinkageHandler(this);
    },

    raiseOnInitiatorChange: function(e) {
        var handler = this.OnClientInitiatorChange ? eval(this.OnClientInitiatorChange) : null;
        if (handler) handler(this, e);
    },

    triggerSelectedIndexChanged: function() {
        $(this.get_element()).trigger("change");
    },

    onSelectedIndexChanged: function(sender) {
        var selectedIndex = this.get_selectedIndex();
        var e = new SelectionChangedEventArgs(sender, selectedIndex);
        this.raiseOnChange(e);
        this.trackSelectedIndexChanged(e);
    },

    trackSelectedIndexChanged: function(e) {
        this.set_stateSelectedIndex(e.get_selectedIndex());
    },

    onInitiatorSelectedIndexChanged: function() {
        var initiator = this.get_initiator();
        var e = new SelectionChangedEventArgs(initiator.get_element(), initiator.get_selectedIndex());
        initiator.trackSelectedIndexChanged(e);
        this.raiseOnInitiatorChange(e);
        if (!WebForm_DoCallback)
            throw "无法完成异步回调！";
        var ddl = this;
        WebForm_DoCallback(this.get_clientID(), initiator.get_stateValue(), function(data) { ddl.onInitiatorSelectedIndexChangedAsyncCallback(data); }, null, null, true);
    },

    onInitiatorSelectedIndexChangedAsyncCallback: function(e) {
        try {
            var state = JSON.parse(e);
            var e = new SelectionChangedEventArgs(this, state.SelectedIndex);
            this.set_stateByObject(state);
            this.render(state);
            this.raiseInitiatorSelectedIndexChangedAsyncCallback(e);
            this.triggerSelectedIndexChanged();
        } catch (ex) {
            window.alert(ex);
        }
    },

    raiseInitiatorSelectedIndexChangedAsyncCallback: function(e) {
        var handler = this.OnClientInitiatorChangeCallback ? eval(this.OnClientInitiatorChangeCallback) : null;
        if (handler) handler(this, e);
    },

    render: function(state) {
        this.clear();
        var options = state.Items;
        var bound = options.length;
        for (var i = 0; i < bound; ++i)
            this.addItem(options[i].Key, options[i].Value);
        this.set_selectedIndex(state.SelectedIndex);
    },

    addItem: function(txt, value) {
        $(this.get_element()).append("<option value=\"" + value + "\">" + txt + "</option>");
    },

    clear: function() {
        $(this.get_element()).empty();
    }
}

/* ProgressBar */
ProgressBar = function(rawData) {
    this.m_rawData = JSON.parse(rawData);
    this.initializeBase(this, this.m_rawData);
    this.m_element = document.getElementById(this.ClientID);
    this.initialize();
}

ProgressBar.prototype = {
    get_element: function() { return this.m_element; },

    get_rawData: function() { return this.m_rawData; },

    get_clientID: function() { return this.ClientID; },

    get_containerID: function() { return this.ContainerID; },

    get_onClientProgressUpdating: function() { return this.OnClientProgressUpdating; },

    get_primaryProgressBarElement: function() { return this.m_primaryProgressBarElement; },

    get_primaryTotalElement: function() { return this.m_primaryTotalElement; },

    get_primaryValueElement: function() { return this.m_primaryValueElement; },

    get_primaryPercentElement: function() { return this.m_primaryPercentElement; },

    get_secondaryProgressBarElement: function() { return this.m_secondaryProgressBarElement; },

    get_secondaryTotalElement: function() { return this.m_secondaryTotalElement; },

    get_secondaryValueElement: function() { return this.m_secondaryValueElement; },

    get_secondaryPercentElement: function() { return this.secondaryPercentElement; },

    get_currentOperationElement: function() { return this.m_currentOperationElement; },

    get_timeElapsedElement: function() { return this.m_timeElapsedElement; },

    get_timeEstimatedElement: function() { return this.m_timeEstimatedElement; },

    get_speedElement: function() { return this.m_speedElement; },

    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    },

    initialize: function() {
        if (!ProgressManager)
            throw "没有找到ProgressManager";
        this.initializeControls();
    },

    initializeControls: function() {
        this.m_primaryProgressBarElement = this.findElement("PrimaryProgressBarInnerDiv");
        this.m_primaryTotalElement = this.findElement("PrimaryTotal");
        this.m_primaryValueElement = this.findElement("PrimaryValue");
        this.m_primaryPercentElement = this.findElement("PrimaryPercent");
        this.m_secondaryProgressBarElement = this.findElement("SecondaryProgressBarInnerDiv");
        this.m_secondaryTotalElement = this.findElement("SecondaryTotal");
        this.m_secondaryValueElement = this.findElement("SecondaryValue");
        this.m_secondaryPercentElement = this.findElement("SecondaryPercent");
        this.m_currentOperationElement = this.findElement("CurrentOperation");
        this.m_timeElapsedElement = this.findElement("TimeElapsed");
        this.m_timeEstimatedElement = this.findElement("TimeEstimated");
        this.m_speedElement = this.findElement("Speed");
        this.updateHorizontalProgressBar(this.m_primaryProgressBarElement, 0);
        this.updateHorizontalProgressBar(this.m_secondaryProgressBarElement, 0);
    },

    findElement: function(suffix) {
        return document.getElementById(this.ClientID + "_" + this.ContainerID + "_" + suffix);
    },

    reset: function() {
        this.updateHorizontalProgressBar(this.m_primaryProgressBarElement, 0);
        this.updateHorizontalProgressBar(this.m_secondaryProgressBarElement, 0);
        this.updateTextIndicator(this.m_primaryTotalElement, "");
        this.updateTextIndicator(this.m_primaryValueElement, "");
        this.updateTextIndicator(this.m_primaryPercentElement, "");
        this.updateTextIndicator(this.m_secondaryTotalElement, "");
        this.updateTextIndicator(this.m_secondaryValueElement, "");
        this.updateTextIndicator(this.m_secondaryPercentElement, "");
        this.updateTextIndicator(this.m_currentOperationElement, "");
        this.updateTextIndicator(this.m_timeElapsedElement, "");
        this.updateTextIndicator(this.m_timeEstimatedElement, "");
        this.updateTextIndicator(this.m_speedElement, "");
    },

    hide: function() { $(this.get_element()).css("display", "none"); },

    show: function() { $(this.get_element()).css("display", ""); },

    updateLayout: function(progressData) {
        if (progressData) {
            this.raiseOnProgressUpdating(progressData);
            this.show();
            this.updateHorizontalProgressBar(this.m_primaryProgressBarElement, progressData.PrimaryPercent);
            this.updateHorizontalProgressBar(this.m_secondaryProgressBarElement, progressData.SecondaryPercent);
            this.updateTextIndicator(this.m_primaryTotalElement, progressData.PrimaryTotal);
            this.updateTextIndicator(this.m_primaryValueElement, progressData.PrimaryValue);
            this.updateTextIndicator(this.m_primaryPercentElement, progressData.PrimaryPercent);
            this.updateTextIndicator(this.m_secondaryTotalElement, progressData.SecondaryTotal);
            this.updateTextIndicator(this.m_secondaryValueElement, progressData.SecondaryValue);
            this.updateTextIndicator(this.m_secondaryPercentElement, progressData.SecondaryPercent);
            this.updateTextIndicator(this.m_currentOperationElement, progressData.CurrentOperationText);
            this.updateTextIndicator(this.m_timeElapsedElement, progressData.TimeElapsed);
            this.updateTextIndicator(this.m_timeEstimatedElement, progressData.TimeEstimated);
            this.updateTextIndicator(this.m_speedElement, progressData.Speed);
        }
    },

    raiseOnProgressUpdating: function(progressData) {
        var handler = this.get_onClientProgressUpdating() ? eval(this.get_onClientProgressUpdating()) : null;
        if (handler) handler(this, progressData);
    },

    updateTextIndicator: function(element, text) {
        if (!element || typeof (text) == "undefined")
            return;
        if (typeof (element.value) == "string")
            $(element).val(text);
        else if (typeof (element.innerHTML) == "string")
            $(element).html(text);
    },

    updateHorizontalProgressBar: function(element, percent) {
        if (element && typeof (percent) != "undefined")
            $(element).css("width", percent + "%");
    },

    updateVerticalProgressBar: function(element, percent) {
        if (element && typeof (percent) != "undefined")
            $(element).css("height", percent + "%");
    }
}

/* Upload */
Upload = function(rawData) {
    this.m_rawData = JSON.parse(rawData);
    this.initializeBase(this, this.m_rawData);
    this.initializeBase(this, new HttpUtility());
    this.m_element = document.getElementById(this.ClientID);
    this.m_lastSequence = 0;
    this.initialize();
}

Upload.prototype = {
    get_element: function() { return this.m_element; },

    get_rawData: function() { return this.m_rawData; },

    get_clientID: function() { return this.ClientID; },

    get_allowedFileExtensions: function() { return this.AllowedFileExtensions; },

    get_displayInputTitle: function() { return this.DisplayInputTitle; },

    get_fileInputSize: function() { return this.FileInputSize; },

    get_maxFileInputsCount: function() { return this.MaxFileInputsCount; },

    get_maxTitleLength: function() { return this.MaxTitleLength; },

    get_initialFileInputsCount: function() { return this.InitialFileInputsCount; },

    get_titleInputSize: function() { return this.TitleInputSize; },

    get_onClientSubmitting: function() { return this.OnClientSubmitting; },

    get_supportImagePreview: function() { return this.SupportImagePreview; },

    get_imagePreviewWidthScale: function() { return this.ImagePreviewWidthScale; },

    get_imagePreviewHeightScale: function() { return this.ImagePreviewHeightScale; },

    get_fileInputs: function() { return $("input[type=file]", this.get_element()); },

    get_fileInputSeed: function() { return this.m_fileInputSeed; },

    get_lastSequence: function() { return this.m_lastSequence; },

    set_lastSequence: function(value) { this.m_lastSequence = value; },

    get_callbackUrl: function() {
        return this.addUrlParameter(window.location.href, "__timestamp", new Date().getTime());
    },

    get_form: function() {
        if (this.m_form)
            return this.m_form;
        var form = this.get_element();
        while (form && form.tagName && form.tagName.toLowerCase() != "form")
            form = form.parentNode;
        if (form && (!form.tagName || form.tagName.toLowerCase() != "form"))
            form = null;
        return this.m_form = form;
    },

    increaseFileInputSeed: function() { ++this.m_fileInputSeed; },

    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    },

    initialize: function() {
        var form = this.get_form();
        if (!form)
            throw "当前页面没有form标签";
        var upload = this;
        $(form).bind("submit", function() { upload.onFormSubmit(this); });
        this.m_fileInputSeed = this.get_initialFileInputsCount();
    },

    raiseOnSubmitting: function(e) {
        var handler = this.get_onClientSubmitting() ? eval(this.get_onClientSubmitting()) : null;
        if (handler) handler(this, e);
    },

    onFormSubmit: function(sender) {
        var e = new EventArgs(sender);
        this.raiseOnSubmitting(e);
    },

    isValidExtension: function(file) {
        if (!file || !file.value || file.value.length < 1)
            return true;
        var extensions = this.get_allowedFileExtensions();
        var bound = extensions.length;
        var fileName = file.value;
        for (var i = 0; i < bound; ++i) {
            var ext = extensions[i];
            if (fileName.substring(fileName.length - ext.length) == ext)
                return true;
        }
        return false;
    },

    insertRow: function() {
        var container = $("#" + this.get_clientID() + "UploadRows");
        var rows = container.children("li");
        if (rows.length >= this.get_maxFileInputsCount())
            return;
        container.append(this.createUploadRow());
    },

    createFileInputRow: function() {
        var id = this.get_clientID() + "FileInputRow" + this.get_fileInputSeed();
        var row = $("<div id=\"" + id + "\" class=\"bccwuFileInputRow\">附件路径: </div>");
        row.append(this.createFileInput());
        if (this.get_maxFileInputsCount() > 1)
            row.append(this.createDeleteFileInputButton());
        return row;
    },

    createTitleInputRow: function() {
        var id = this.get_clientID() + "TitleInputRow" + this.get_fileInputSeed();
        var row = $("<div id=\"" + id + "\" class=\"bccwuTitleInputRow\">附件名称: </div>");
        row.append(this.createTitleInput());
        return row;
    },

    createTitleInput: function() {
        var id = this.get_clientID() + "TitleInput" + this.get_fileInputSeed();
        var element = $("<input type=\"text\" id=\"" + id + "\" name=\"" + id + "\" size=\"" + this.get_titleInputSize() + "\" maxlength=\"" + this.get_maxTitleLength() + "\" class=\"bccwuTitleInput\" />");
        return element;
    },

    createFileInput: function() {
        var id = this.get_clientID() + "FileInput" + this.get_fileInputSeed();
        var element = $("<input type=\"file\" id=\"" + id + "\" name=\"" + id + "\" size=\"" + this.get_fileInputSize() + "\" class=\"bccwuFileInput\" />");
        return element;
    },

    createRowSplitLine: function() {
        var div = $("<div class=\"bccwuUploadRowSplit\"></div>");
        return div;
    },

    createDeleteFileInputButton: function() {
        var element = $("<a class=\"bccwuFileInputDelete\" title=\"删除\" onclick=\"" + this.get_clientID() + ".removeRow(this);\"></a>");
        return element;
    },

    createUploadRow: function() {
        var id = this.get_clientID() + "UploadRow" + this.get_fileInputSeed();
        var row = $("<li id=\"" + id + "\" class=\"bccwuUploadRow\" />");
        row.append(this.createFileInputRow());
        if (this.get_displayInputTitle())
            row.append(this.createTitleInputRow());
        row.append(this.createRowSplitLine());
        this.increaseFileInputSeed();
        return row;
    },

    removeRow: function(sender) {
        $(sender).closest("li").remove();
    },

    removeUplodedRow: function(sender, id) {
        if (confirm("是否确认删除该附件？")) {
            var row = $(sender).closest("li");
            var upload = this;
            $.get(this.get_callbackUrl(), { "ID": id, "UploadCallbackCommand": "DeleteAttachment" }, function(result) { upload.removeUploadedRowCallback(result, row); });
        }
    },

    removeUploadedRowCallback: function(result, row) {
        try {
            var state = JSON.parse(result);
            if (state.HasError)
                throw state.ErrorMessage;
            row.remove();
        } catch (ex) {
            window.alert(ex);
        }
    },

    trackUploadedRowSequence: function(sender) {
        if (typeof (sender.value) != "undefined")
            this.set_lastSequence(sender.value);
    },

    updateUploadedRowSequence: function(sender, id) {
        var newValue = parseInt(sender.value, 10);
        if (isNaN(newValue))
            sender.value = this.get_lastSequence();
        else {
            var row = $(sender).closest("li");
            var upload = this;
            $.get(this.get_callbackUrl(), { "ID": id, "UploadCallbackCommand": "ChangeSequence", "Sequence": newValue },
                function(result) { upload.updateRowSequenceCallback(result, row, newValue); });
        }
    },

    updateRowSequenceCallback: function(result, row, newValue) {
        try {
            var state = JSON.parse(result);
            if (state.HasError)
                throw state.ErrorMessage;
            this.updateRowLayoutBySequence(row, newValue);
        } catch (ex) {
            window.alert(ex);
        }
    },

    updateRowLayoutBySequence: function(row, newValue) {
        var panel = row.closest("ul");
        var rows = panel.find("li");
        var isEnd = true;
        for (var i = 0; i < rows.length; ++i) {
            var sequence = parseInt($(rows[i]).find(".bccwuUploadedRowSequence")[0].value);
            if (newValue < sequence) {
                panel[0].insertBefore(row[0], rows[i]);
                isEnd = false;
                break;
            }
        }
        if (isEnd) {
            panel[0].removeChild(row[0]);
            panel[0].appendChild(row[0]);
        }
    }
}

/* ProgressManager */
/*
Server Properties:
ClientID
AjaxUrl
Interval
UploadID
OnClientSubmitting
OnClientProgressStarted
*/
ProgressManager = function(rawData) {
    this.m_rawData = JSON.parse(rawData);
    this.initializeBase(this, this.m_rawData);
    this.initializeBase(this, new HttpUtility());
    this.initializeBase(this, new EventHandlerList());
    this.m_element = document.getElementById(this.ClientID);
    this.m_progressBars = null;
    this.m_uploads = $(".bccwUpload");
    this.m_startTime = null;
    this.m_timeFormat = "%HOURS%:%MINUTES%:%SECONDS%s";
    this.m_postedFilesCount = 0;
    this.initialize();
}

ProgressManager.prototype = {
    get_element: function() { return this.m_element; },

    get_rawData: function() { return this.m_rawData; },

    get_clientID: function() { return this.ClientID; },

    get_ajaxUrl: function() { return this.AjaxUrl; },

    get_interval: function() { return this.Interval; },

    get_uploadID: function() { return this.UploadID; },

    get_progressBars: function() { return this.m_progressBars; },

    get_uploads: function() { return this.m_uploads; },

    get_onClientSubmitting: function() { return this.OnClientSubmitting; },

    get_onClientProgressStarted: function() { return this.OnClientProgressStarted; },

    get_onClientProgressUpdating: function() { return this.OnClientProgressUpdating; },

    get_form: function() {
        if (this.m_form)
            return this.m_form;
        var form = this.get_element();
        while (form && form.tagName && form.tagName.toLowerCase() != "form")
            form = form.parentNode;
        if (form && (!form.tagName || form.tagName.toLowerCase() != "form"))
            form = null;
        return this.m_form = form;
    },

    get_postedFilesCount: function() { return this.m_postedFilesCount; },

    set_postedFilesCount: function(value) { this.m_postedFilesCount = value; },

    get_startTime: function() { return this.m_startTime; },

    set_startTime: function(value) { this.m_startTime = value; },

    get_timeFormat: function() { return this.m_timeFormat; },

    get_callbackUrl: function() { return this.addUrlParameter(this.get_ajaxUrl(), "__timestamp", new Date().getTime()); },

    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    },

    initialize: function() {
        this.initializeForm();
        this.initializeProgressBars();
    },

    initializeProgressBars: function() {
        this.m_progressBars = $(".bccwProgressBar");
        this.hideProgressBars();
    },

    initializeForm: function() {
        var form = this.get_form();
        if (!form)
            throw "当前页面没有form标签";
        form.action = this.addUrlParameter(form.action, UNIQUE_REQUEST_UPLOAD_IDENTITY, this.get_uploadID());
        form.encoding = form.enctype = FORM_ENCTYPE_MULTIPART;
        var sender = this;
        $(form).bind("submit", function() { sender.onFormSubmit(); });
    },

    hideProgressBars: function() { this.get_progressBars().css("display", "none"); },

    showProgressBars: function() { this.get_progressBars().css("display", ""); },

    raiseOnSubmitting: function() {
        var handler = this.get_onClientSubmitting() ? eval(this.get_onClientSubmitting()) : null;
        var e = new EventArgs(this);
        if (handler) handler(this, e);
        this.invoke("Submitting", this, e);
    },

    raiseOnProgressStarted: function() {
        var handler = this.get_onClientProgressStarted() ? eval(this.get_onClientProgressStarted()) : null;
        var e = new EventArgs(this);
        if (handler) handler(this, e);
        this.invoke("ProgressStarted", this, e);
    },

    raiseOnProgressUpdating: function(rawProgressData) {
        var handler = this.get_onClientProgressUpdating() ? eval(this.get_onClientProgressUpdating()) : null;
        var e = new ProgressUpdatingEventArgs(this, rawProgressData);
        if (handler) handler(this, e);
        this.invoke("ProgressUpdating", this, e);
    },

    updatePostedFilesCount: function() {
        var count = 0;
        var fileInputs = document.getElementsByTagName("input");
        for (var i = 0; i < fileInputs.length; ++i) {
            var fileInput = fileInputs[i];
            if (fileInput.type == "file" && fileInput.value != "")
                ++count;
        }
        this.set_postedFilesCount(count);
    },

    onFormSubmit: function(e) {
        var form = this.get_form();
        var formWrap = $(form);
        formWrap.unbind("submit", this.onBeginRequest);
        // 确保最后绑定
        formWrap.bind("submit", this.onBeginRequest);
    },

    onBeginRequest: function(e) {
        ProgressManager.updatePostedFilesCount();
        ProgressManager.raiseOnSubmitting();
        if (ProgressManager.isBeginProgressEnabled()) {
            ProgressManager.showProgressBars();
            ProgressManager.beginProgressUpdating();
            ProgressManager.raiseOnProgressStarted();
        }
    },

    isBeginProgressEnabled: function() {
        return ((this.get_progressBars().length > 0 || this.get_onClientProgressUpdating() != null)
            && this.get_uploads().length > 0 && this.get_postedFilesCount() > 0);
    },

    beginProgressUpdating: function() {
        var date = new Date();
        ProgressManager.set_startTime(date);
        $.get(ProgressManager.get_callbackUrl(), null, function(result) { ProgressManager.onProgressUpdatingCallback(result); }, null);
    },

    onProgressUpdatingCallback: function(result) {
        try {
            eval(result);
        } catch (ex) {
            window.alert(ex);
            return;
        }
        if (rawProgressData) {
            if (rawProgressData.InProgress) {
                this.fixedRawProgressData(rawProgressData);
                var bars = this.get_progressBars();
                for (var i = 0; i < bars.length; ++i)
                    eval(bars[i].id).updateLayout(rawProgressData);
                this.raiseOnProgressUpdating(rawProgressData);
                if (rawProgressData.OperationComplete && rawProgressData.OperationComplete.toLowerCase() == "true")
                    return;
            }
        }
        window.setTimeout(this.beginProgressUpdating, this.get_interval());
    },

    //修正进度数据
    fixedRawProgressData: function(rawProgressData) {
        var elapsedMilliseconds = new Date() - this.m_startTime;
        //花费时间
        if (typeof (rawProgressData.TimeElapsed) == "undefined")
            rawProgressData.TimeElapsed = this.getFormattedTime(this.toSeconds(elapsedMilliseconds));
        else
            rawProgressData.TimeElapsed = this.getFormattedTime(this.toSeconds(rawProgressData.TimeElapsed));
        //总文件数
        if (typeof (rawProgressData.SecondaryTotal) == "undefined")
            rawProgressData.SecondaryTotal = this.m_postedFilesCount;
        if (typeof (rawProgressData.SecondaryPercent) == "undefined")
            rawProgressData.SecondaryPercent = Math.round(100 * rawProgressData.SecondaryValue / this.m_postedFilesCount);
        if (typeof (rawProgressData.TimeEstimated) == "undefined" && typeof (rawProgressData.PrimaryPercent) == "number") {
            if (rawProgressData.PrimaryPercent == 0)
                rawProgressData.TimeEstimated = this.getFormattedTime(this.toSeconds(999999));
            else
                rawProgressData.TimeEstimated = this.getFormattedTime(this.toSeconds(elapsedMilliseconds * (100 / rawProgressData.PrimaryPercent - 1)));
        }
        else if (parseInt(rawProgressData.TimeEstimated).toString() == rawProgressData.TimeEstimated)
            rawProgressData.TimeEstimated = this.getFormattedTime(this.toSeconds(rawProgressData.TimeEstimated));
    },

    toSeconds: function(milliseconds) {
        return Math.round(milliseconds / 1000);
    },

    formatBytes: function(bytes) {
        var kiloBytes = bytes / 1024;
        var megaBytes = kiloBytes / 1024;
        if (megaBytes > 0.8)
            return "" + Math.round(megaBytes * 100) / 100 + "MB";
        if (kiloBytes > 0.8)
            return "" + Math.round(kiloBytes * 100) / 100 + "kB";
        return "" + bytes + " bytes";
    },

    getFormattedTime: function(seconds) {
        var period = this.normalizeTime(seconds);
        return this.m_timeFormat.replace(/%HOURS%/, period.Hours).replace(/%MINUTES%/, period.Minutes).replace(/%SECONDS%/, period.Seconds);
    },

    normalizeTime: function(totalSeconds) {
        var seconds = this.formatTimePart(totalSeconds % 60);
        var totalMinutes = Math.floor(totalSeconds / 60);
        var minutes = this.formatTimePart(totalMinutes % 60);
        var hours = this.formatTimePart(Math.floor(totalMinutes / 60));
        return { Hours: hours, Minutes: minutes, Seconds: seconds }
    },

    formatTimePart: function(timePart) {
        if (timePart.toString().length > 1)
            return timePart.toString();
        return "0" + timePart.toString();
    }
}

/* TreeView */
/*
<div class="bccwTreeView">
<ul class="rtUL">
<li class="rtLI">
<div class="rtTop">
<span class="rtSp" />
<span class="rtPlus" />
<input type="checkbox" class="rtChk" />
<img class="rtImg" />
<span class="rtText" />
</div>
<ul class="rtUL">
<li />  
</ul>
</li>
</ul>
</div>
    
所有数据通过元素定义的css类名称查找
CheckedValues = PathIndex + "\0x1" + Value + "\0x2"
CheckedTexts = PathIndex + "\0x2" + Text + "\0x2"
ClientState =  CheckedTexts + "\0x3" + CheckedValues
*/
TreeView = function(rawData) {
    this.m_rawData = JSON.parse(rawData);
    this.initializeBase(this, this.m_rawData);
    this.initializeBase(this, new HttpUtility());
    this.initializeBase(this, new EventHandlerList());
    this.m_element = document.getElementById(this.ClientID);
    this.initialize();
}

TreeView.prototype = {
    get_element: function() { return this.m_element; },

    get_rawData: function() { return this.m_rawData; },

    get_clientID: function() { return this.ClientID; },

    get_disabledImageUrl: function() { return this.DisabledImageUrl; },

    get_expandedImageUrl: function() { return this.ExpandedImageUrl; },

    get_imageUrl: function() { return this.ImageUrl; },

    get_onClientNodeChecked: function() { return this.OnClientNodeChecked; },

    get_onClientNodeChecking: function() { return this.OnClientNodeChecking; },

    get_onClientNodeClicked: function() { return this.OnClientNodeClicked; },

    get_onClientNodeClicking: function() { return this.OnClientNodeClicking; },

    get_onClientNodeCollapsed: function() { return this.OnClientNodeCollapsed; },

    get_onClientNodeCollapsing: function() { return this.OnClientNodeCollapsing; },

    get_onClientNodeExpanded: function() { return this.OnClientNodeExpanded; },

    get_onClientNodeExpanding: function() { return this.OnClientNodeExpanding; },

    get_showLineImages: function() { return this.ShowLineImages; },

    get_checkBoxes: function() { return this.CheckBoxes; },

    get_autoCheckDescendants: function() { return this.AutoCheckDescendants; },

    get_autoCheckAncestor: function() { return this.AutoCheckAncestor; },

    get_multipleSelect: function() { return this.MultipleSelect; },

    get_singleSelectShowRadio: function() { return this.SingleSelectShowRadio; },

    get_loadingMessage: function() { return this.LoadingMessage; },

    get_isCallbackOnNodeCheck: function() { return this.IsCallbackOnNodeCheck; },

    get_isCallbackOnNodeClick: function() { return this.IsCallbackOnNodeClick; },

    get_isCallbackOnNodeCollapse: function() { return this.IsCallbackOnNodeCollapse; },

    get_checkedValues: function() { return this.CheckedValues; },

    set_checkedValues: function(value) { this.CheckedValues = value; },

    get_callbackUrl: function() { return this.addUrlParameter(window.location.href, "__timestamp", new Date().getTime()); },

    get_formatCheckedValue: function(sperator) { return this.get_formatSpecifiedString(this.get_checkedValues(), sperator); },

    get_formatSpecifiedString: function(text, sperator) {
        var str = "";
        var array = text.split("\x02");
        for (var i = 0; i < array.length; ++i) {
            if (array[i].length > 0)
                str += array[i].split("\x01")[1] + sperator;
        }
        return str;
    },

    get_childNodes: function() {
        var ul = $(this.get_element()).children("ul");
        var nodes = new Array();
        if (ul.length == 0)
            return nodes;
        var children = ul.get(0).childNodes;
        for (var i = 0; i < children.length; ++i)
            nodes.push(new TreeNode(children[i], this));
        return nodes;
    },

    get_checkedValuesEx: function(sperator) {
        var inputs = this.get_element().getElementsByTagName("input");
        var str = "";
        for (var i = 0; i < inputs.length; ++i) {
            var chk = inputs[i];
            if (chk.type && (chk.type == "checkbox" || chk.type == "radio") && chk.checked) {
                var hiddenData = document.getElementById(chk.id.replace("TreeNodeChk_", "TreeNodeData_"));
                if (hiddenData && hiddenData.value && hiddenData.value.length > 0) {
                    var state = JSON.parse(hiddenData.value);
                    str += state.Value + sperator;
                }
            }
        }
        return str;
    },

    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    },

    initialize: function() {
        var treeView = this;
        $(document.forms[0]).bind("submit", function() { treeView.trackClientState(); });
        this.registerNodesEventHandler(this.get_element());
    },

    checkAll: function(checked) {
        this.set_checkedValues("");
        $("input[type=checkbox]", this.get_element()).attr("checked", checked).each(function() { BeyondbitStyle.fireChangeEvent($(this).get(0)); });
        this.trackClientState();
    },

    trackClientState: function() {
        var element = document.getElementById(this.ClientID + CONTROL_STATE);
        this.set_checkedValues(element.value = this.get_checkedValuesEx("\x01"));
    },

    registerNodesEventHandler: function(context) {
        var treeView = this;
        var selector = ".rtMinus,.rtPlus,input[type=checkbox],.rtText" + (this.get_singleSelectShowRadio() ? ",input[type=radio]" : "");
        $(selector, context).each(function() {
            var wrap = $(this);
            switch (this.className) {
                case "rtPlus":
                case "rtMinus":
                    wrap.bind("click", function() { treeView.toggle(this) });
                    break;
                case "rtText":
                    wrap.bind("click", function() { treeView.onTreeNodeTextClick(this); });
                    /*wrap.bind("click", function() {
                    var chb = $(this).siblings("input[type=checkbox]");
                    chb.attr("checked", !chb.attr("checked"));
                    treeView.onTreeNodeCheckClick(chb[0]);
                    });*/
                    break;
                default:
                    wrap.bind("click", function() { treeView.onTreeNodeCheckClick(this); });
                    break;
            }
        });
    },

    onTreeNodeTextClick: function(sender) {
        var li = $(sender).closest("li").get(0);
        var node = new TreeNode(li, this);
        var e = new TreeNodeEventArgs(sender, node);
        this.raiseOnTreeNodeClicking(e);
        if (this.get_isCallbackOnNodeClick())
            this.notifyServerOnNodeClick(e);
        else
            this.raiseOnTreeNodeClicked(e);
    },

    raiseOnTreeNodeClicking: function(e) {
        var handler = this.get_onClientNodeChecking() ? eval(this.get_onClientNodeChecking()) : null;
        if (handler) handler(this, e);
        this.invoke("NodeClicking", this, e);
    },

    notifyServerOnNodeClick: function(e) {
        var data = { "TreeViewCallbackCommand": "NodeClick", "State": JSON.stringify(new LightTreeNode(e.get_node())) };
        var treeView = this;
        $.post(this.get_callbackUrl(), data, function(result) { treeView.notifyServerOnNodeClickCallback(result, e); });
    },

    notifyServerOnNodeClickCallback: function(result, e) {
        try {
            var data = JSON.parse(result);
            if (data.HasError)
                throw data.ErrorMessage;
            var rawState = data.RawState;
            this.raiseOnTreeNodeClicked(e);
        } catch (ex) {
            window.alert(ex.message);
        }
    },

    raiseOnTreeNodeClicked: function(e) {
        var handler = this.get_onClientNodeClicked() ? eval(this.get_onClientNodeClicked()) : null;
        if (handler) handler(this, e);
        this.invoke("NodeClicked", this, e);
    },

    toggle: function(sender) {
        var li = $(sender).closest("li").get(0);
        var node = new TreeNode(li, this);
        if (node.Expanded)
            node.collapseChildNodes();
        else
            node.expandChildNodes();
    },

    //触发节点CheckBox Click事件
    onTreeNodeCheckClick: function(sender) {
        var li = $(sender).closest("li").get(0);
        var node = new TreeNode(li, this);
        var e = new TreeNodeEventArgs(sender, node);
        this.raiseOnTreeNodeChecking(e);
        if (this.get_isCallbackOnNodeCheck())
            this.notifyServerOnNodeCheck(e);
        else {
            this.onNodeCheck(e);
            this.raiseOnTreeNodeChecked(e);
        }
    },

    //触发节点CheckBox Checking事件
    raiseOnTreeNodeChecking: function(e) {
        var handler = this.get_onClientNodeChecking() ? eval(this.get_onClientNodeChecking()) : null;
        if (handler) handler(this, e);
        this.invoke("NodeChecking", this, e);
    },

    //触发节点CheckBox Checked事件
    raiseOnTreeNodeChecked: function(e) {
        var handler = this.get_onClientNodeChecked() ? eval(this.get_onClientNodeChecked()) : null;
        if (handler) handler(this, e);
        this.invoke("NodeChecked", this, e);
    },

    //通知服务器端节点CheckBox Check事件
    notifyServerOnNodeCheck: function(e) {
        var data = { "TreeViewCallbackCommand": "NodeCheck", "State": JSON.stringify(new LightTreeNode(e.get_node())) };
        var treeView = this;
        $.post(this.get_callbackUrl(), data, function(result) { treeView.notifyServerOnNodeCheckCallback(result, e); });
    },

    //通知服务器端节点CheckBox Check回调事件
    notifyServerOnNodeCheckCallback: function(result, e) {
        try {
            var data = JSON.parse(result);
            if (data.HasError)
                throw data.ErrorMessage;
            var newNode = data.RawState;
            this.onNodeCheck(e);
            this.raiseOnTreeNodeChecked(e);
        } catch (ex) {
            window.alert(ex);
        }
    },

    onNodeCheck: function(e) {
        if (this.MultipleSelect)
            this.onMultiCheck(e);
        else
            this.onSingleCheck(e);
    },

    onSingleCheck: function(e) {
        var sender = e.get_source();
        var node = e.get_node();
        var checkdValues = this.get_checkedValues();
        if (sender.checked && checkdValues.length > 0) {
            var pathIndex = checkdValues.split("\x01")[0];
            document.getElementById(this.get_clientID() + "TreeNodeChk_" + pathIndex).checked = false;
            if (this.get_autoCheckAncestor() && !this.get_singleSelectShowRadio())
                this.fastCheckedAncestor(pathIndex, false);
        }
        checkdValues = "";
        if (sender.checked)
            checkdValues = node.toValueString();
        if (this.get_autoCheckAncestor() && !this.get_singleSelectShowRadio())
            this.fastCheckedAncestor(node.get_pathIndex(), sender.checked);
        if (this.get_autoCheckDescendants() && !this.get_singleSelectShowRadio())
            this.checkedChildCheckBoxes(node.get_childContainer(), sender.checked);
        this.set_checkedValues(checkdValues);
    },

    onMultiCheck: function(e) {
        var sender = e.get_source();
        var node = e.get_node();
        var checkdValues = this.get_checkedValues();
        if (sender.checked) {
            if (this.get_autoCheckAncestor())
                this.fastCheckedAncestor(node.get_pathIndex(), true);
            checkdValues += node.toValueString();
        } else {
            if (this.get_autoCheckAncestor())
                this.uncheckedAncestor(sender, node);
            checkdValues = checkdValues.replace(node.toValueString(), "");
        }
        if (this.get_autoCheckDescendants())
            this.checkedChildCheckBoxes(node.get_childContainer(), sender.checked);
        this.set_checkedValues(checkdValues);
    },

    fastCheckedAncestor: function(pathIndex, checked) {
        var strPathIndex = pathIndex + "_";
        var index = -1;
        var chkPrefix = this.get_clientID() + "TreeNodeChk_";
        while ((index = strPathIndex.lastIndexOf("_")) > 0) {
            strPathIndex = strPathIndex.substring(0, index);
            var chk = document.getElementById(chkPrefix + strPathIndex);
            if (chk) chk.checked = checked;
        }
    },

    checkedChildCheckBoxes: function(container, checked) {
        if (!container)
            return;
        var childChks = container.getElementsByTagName("input");
        for (var i = 0; i < childChks.length; ++i) {
            var chk = childChks[i];
            if (chk.type && chk.type == "checkbox") {
                var li = document.getElementById(chk.id.replace("Chk", ""));
                var ul = li.childNodes.length > 1 ? li.childNodes[1] : null;
                this.checkedChildCheckBoxes(ul, chk.checked = checked);
            }
        }
    },

    uncheckedAncestor: function(chk, node) {
        var childChks = node.get_element().getElementsByTagName("input");
        //查找子节点是否存在选中
        for (var i = 0; i < childChks.length; ++i) {
            if (childChks[i].type && childChks[i].type == "checkbox" && childChks[i].checked) {
                chk.checked = true;
                break;
            }
        }
        if (!chk.checked) {
            //同层节点和上层节点是否存在选中
            var nodePrefix = this.get_clientID() + "TreeNode_";
            var chkPrefix = this.get_clientID() + "TreeNodeChk_";
            var strPathIndex = node.get_pathIndex() + "_";
            var index = -1;
            var pathIndexPos = this.get_clientID().length + 9;
            while ((index = strPathIndex.lastIndexOf("_")) > 0) {
                strPathIndex = strPathIndex.substring(0, index);
                //子节点容器ul
                var container = document.getElementById(nodePrefix + strPathIndex).parentNode;
                //父节点checkbox
                var parentChk = document.getElementById(chkPrefix + container.parentNode.id.substring(pathIndexPos));
                var childNodes = container.childNodes;
                var siblingChecked = false;
                for (var i = 0; i < childNodes.length; ++i) {
                    var siblingChk = document.getElementById(chkPrefix + childNodes[i].id.substring(pathIndexPos));
                    if (!siblingChk)
                        continue;
                    //如果兄弟节点有被选中则退出当前循环
                    if (siblingChecked |= siblingChk.checked)
                        break;
                }
                if (!siblingChecked && parentChk)
                    parentChk.checked = false;
            }
        }
    }
}

/* LightTreeNode */
LightTreeNode = function(rawData) {
    this.initializeBase(this, rawData);
    this.initiallize();
}

LightTreeNode.prototype = {
    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    },

    initiallize: function() {
        delete this.m_line;
        delete this.m_treeView;
        delete this.m_wrap;
        delete this.m_element;
    }
}

/* TreeNode */
TreeNode = function(element, treeView) {
    this.m_element = element;
    this.m_wrap = $(element);
    this.m_treeView = treeView;
    this.m_line = $(element.children[0]);
    this.initialize();
}

TreeNode.prototype = {
    get_element: function() { return this.m_element; },

    get_clientID: function() { return this.ClientID; },

    get_pathIndex: function() { return this.PathIndex; },

    get_text: function() { return this.Text; },

    set_text: function(value) { this.Text = value; },

    get_value: function() { return this.Value; },

    set_value: function(value) { this.Value = value; },

    get_navigateUrl: function() { return this.NavigateUrl; },

    get_hasChildren: function() { return this.HasChildren; },

    set_hasChildren: function(value) { this.HasChidlren = value; },

    get_checked: function() { return this.Checked; },

    get_checkable: function() { return this.Checkable; },

    get_expandedImageUrl: function() { return this.ExpandedImageUrl; },

    get_imageUrl: function() { return this.ImageUrl; },

    get_expanded: function() { return this.Expanded; },

    set_expanded: function(value) { this.Expanded = value; },

    get_enabled: function() { return this.Enabled; },

    set_enabled: function(value) { this.Enabled = value; },

    get_category: function() { return this.Category; },

    get_treeView: function() { return this.m_treeView; },

    get_loaded: function() { return this.m_loaded; },

    get_childContainer: function() { return this.get_element().childNodes.length > 1 ? this.get_element().childNodes[1] : null; },

    get_childNodes: function() {
        var ul = this.m_wrap.children("ul");
        var nodes = new Array();
        if (ul.length == 0)
            return nodes;
        var children = ul.get(0).childNodes;
        for (var i = 0; i < children.length; ++i)
            nodes.push(new TreeNode(children[i], this.get_treeView()));
        return nodes;
    },

    get_parentNode: function() {
        var li = $(this.get_element().parentNode, this.get_treeView().get_element()).closest("li");
        return li.length > 0 ? new TreeNode(li.get(0), this.get_treeView()) : null;
    },

    initialize: function() {
        this.generate();
    },

    generate: function() {
        this.ClientID = this.m_element.id;
        this.PathIndex = this.m_element.id.substring(this.get_treeView().get_clientID().length + 9);
        var line = this.m_line;
        var hasMinus = line.children(".rtMinus").length > 0;
        var hasPlus = line.children(".rtPlus").length > 0;
        this.parseHiddenData(line.children(".rtData").get(0).value);
        this.Text = $(".rtText", line).text();
        this.Expanded = hasMinus > 0;
        var childCount = (this.m_wrap.children("ul").children("li").length > 0);
        this.HasChildren = hasPlus || this.Expanded || childCount > 0;
        this.Enabled = this.m_wrap.children("div[class*='rtDisabled']").length == 0;
        this.NavigateUrl = line.children("a").attr("href");
        this.m_loaded = childCount > 0 || (!hasMinus && !hasPlus);
        if (this.m_treeView.CheckBoxes) {
            var chk = line.children(".rtChk");
            this.Checkable = chk.length > 0;
            this.Checked = this.Checkable ? line.children(".rtChk").get(0).checked : false;
        }
    },

    parseHiddenData: function(data) {
        var state = JSON.parse(data);
        this.set_value(state.Value);
        if (state.ImageUrl)
            this.ImageUrl = state.ImageUrl;
        if (state.ExpandedImageUrl)
            this.ExpandedImageUrl = state.ExpandedImageUrl;
        if (state.Category)
            this.Category = state.Category;
    },

    toTextString: function() {
        return this.get_pathIndex() + "\x01" + this.get_text() + "\x02";
    },

    toValueString: function() {
        return this.get_pathIndex() + "\x01" + this.get_value() + "\x02";
    },

    collapseChildNodes: function() {
        if (this.get_expanded()) {
            this.set_expanded(false);
            var e = new TreeNodeEventArgs(this.get_element(), this);
            this.raiseOnCollapsing(e);
            if (this.get_treeView().get_isCallbackOnNodeCollapse())
                this.notifyServerOnCollapse(e);
            else {
                this.onCollapse(e);
                this.raiseOnCollapsed(e);
            }
        }
    },

    raiseOnCollapsing: function(e) {
        var handler = this.get_treeView().get_onClientNodeCollapsing() ? eval(this.get_treeView().get_onClientNodeCollapsing()) : null;
        if (handler) handler(this, e);
        this.get_treeView().invoke("NodeCollapsing", this, e);
    },

    raiseOnCollapsed: function(e) {
        var handler = this.get_treeView().get_onClientNodeCollapsed() ? eval(this.get_treeView().get_onClientNodeCollapsed()) : null;
        if (handler) handler(this, e);
        this.get_treeView().invoke("NodeCollapsed", this, e);
    },

    notifyServerOnCollapse: function(e) {
        var node = e.get_node();
        var data = { "TreeViewCallbackCommand": "NodeCollapse", "State": JSON.stringify(new LightTreeNode(node)) };
        $.post(this.get_treeView().get_callbackUrl(), data, function(result) { node.notifyServerOnCollapseCallback(result, e); });
    },

    notifyServerOnCollapseCallback: function(result, e) {
        try {
            var data = JSON.parse(result);
            if (data.HasError)
                throw data.ErrorMessage;
            var newNode = data.RawState;
            this.onCollapse(e);
            this.raiseOnCollapsed(e);
        } catch (ex) {
            window.alert(ex);
        }
    },

    onCollapse: function(e) {
        this.m_wrap.children("ul").css("display", "none");
        var line = this.m_line;
        line.children(".rtMinus").attr({ "class": "rtPlus", "title": "展开" });
        var imgUrl = this.get_imageUrl() ? this.get_imageUrl() : this.m_treeView.get_imageUrl();
        if (imgUrl && imgUrl.length > 0)
            line.children(".rtImg").attr("src", imgUrl);
    },

    expandChildNodes: function() {
        if (!this.get_expanded()) {
            this.set_expanded(true);
            this.showLoadingStatus();
            var e = new TreeNodeEventArgs(this.get_element(), this);
            this.raiseOnExpanding(e);
            if (this.get_loaded()) {
                this.onExpand(null, null);
                this.raiseOnExpanded(e);
            } else
                this.notifyServerOnExpand(e);
        }
    },

    onExpand: function(line, html) {
        line = !line ? this.m_line : line;
        var ul = this.m_wrap.children("ul");
        if (html && html.length > 0) {
            ul.html(html);
            // 处理单选和复选框
            try {
                ul.find("input[type=radio],input[type=checkbox]").each(function() { BeyondbitStyle.processRadioAndCheckbox($(this)); });

            } catch (e) { }
            try {
                btn.processRadioAndCheckboxs(ul);
            } catch (e) { }
        }
        ul.css("display", "");
        line.children(".rtPlus").attr({ "class": "rtMinus", "title": "收起" });
        var expandImageUrl = this.get_expandedImageUrl() ? this.get_expandedImageUrl() : this.m_treeView.get_expandedImageUrl();
        if (expandImageUrl && expandImageUrl.length > 0)
            line.children(".rtImg").attr("src", expandImageUrl);
    },

    raiseOnExpanding: function(e) {
        var handler = this.get_treeView().get_onClientNodeExpanding() ? eval(this.get_treeView().get_onClientNodeExpanding()) : null;
        if (handler) handler(this, e);
        this.get_treeView().invoke("NodeExpanding", this, e);
    },

    raiseOnExpanded: function(e) {
        this.hideLoadingStatus();
        var handler = this.get_treeView().get_onClientNodeExpanded() ? eval(this.get_treeView().get_onClientNodeExpanded()) : null;
        if (handler) handler(this, e);
        this.get_treeView().invoke("NodeExpanded", this, e);
    },

    notifyServerOnExpand: function(e) {
        var node = e.get_node();
        var data = { "TreeViewCallbackCommand": "NodeExpand", "State": JSON.stringify(new LightTreeNode(node)) };
        $.post(this.get_treeView().get_callbackUrl(), data, function(result) { node.notifyServerOnExpandCallback(result, e); });
    },

    notifyServerOnExpandCallback: function(result, e) {
        var line = this.m_line;
        if (result.length == 0) {
            this.set_hasChildren(false);
            line.children(".rtPlus,.rtMinus").removeClass();
        } else {
            this.onExpand(line, result);
            var node = this;
            //延迟订阅事件
            window.setTimeout(function() { node.m_treeView.registerNodesEventHandler(node.m_wrap.children("ul").get(0)); }, result.length / 400);
        }
        this.raiseOnExpanded(e);
    },

    showLoadingStatus: function() {
        var span = document.createElement("span");
        span.className = "rtLoadingAfter";
        if (this.m_treeView.LoadingMessage) {
            span.className = "rtLoadingMessage";
            span.innerHTML = this.m_treeView.LoadingMessage;
        }
        this.m_line.append(span);
    },

    hideLoadingStatus: function() {
        this.m_line.children(".rtLoadingAfter,.rtLoadingMessage").remove();
    }
}


/* OpenDialogBox */
OpenDialogBox = function(rawData) {
    this.m_rawData = JSON.parse(rawData);
    this.initializeBase(this, this.m_rawData);
    this.initializeBase(this, new HttpUtility());
    this.initializeBase(this, new EventHandlerList());
    this.m_element = document.getElementById(this.ClientID);
    this.m_stateElement = document.getElementById(this.ClientID + CONTROL_STATE);
    this.m_dialogElement = document.getElementById(this.ClientID + "Dialog");
    this.m_form = null;
    this.m_opened = false;
    this.initialize();
}

OpenDialogBox.prototype = {
    get_element: function() { return this.m_element; },

    get_dialogElement: function() { return this.m_dialogElement; },

    get_rawData: function() { return this.m_rawData; },

    get_clientID: function() { return this.ClientID; },

    get_stateElement: function() { return this.m_stateElement; },

    get_stateValue: function() { return this.m_stateElement.value; },

    set_stateValue: function(value) { this.m_stateElement.value = value; },

    get_dialogType: function() { return this.DialogType; },

    get_textBox: function() { return this.m_textBox; },

    get_button: function() { return this.m_button; },

    get_selectedValue: function() { return this.m_selectedValue; },

    set_selectedValue: function(value) {
        this.m_selectedValue = value;
        this.trackClientState();
    },

    get_selectedText: function() { return this.m_selectedText; },

    set_selectedText: function(value) {
        this.m_selectedText = value;
        if (this.get_textBox()) {
            // 去除符号',' 
            if ((value.length > 0) && (value.charCodeAt(value.length - 1) == 44))
                value = value.substring(0, value.length - 1);
            this.get_textBox().value = value;
        }
        this.trackClientState();
    },

    get_onClientDialogOpening: function() { return this.OnClientDialogOpening; },

    get_onClientDialogOpened: function() { return this.OnClientDialogOpened },

    get_onClientDialogClosing: function() { return this.OnClientDialogClosing; },

    get_onClientDialogClosed: function() { return this.OnClientDialogClosed; },

    get_dialogTitle: function() { return this.DialogTitle; },

    get_dialogUrl: function() {
        var dialogUrl = this.urlDecode(this.DialogUrl);
        dialogUrl = this.removeUrlParameter(dialogUrl, "SelectedValue");
        return this.addUrlParameter(dialogUrl, "SelectedValue", this.get_selectedValue());
    },

    set_dialogUrl: function(value) {
        var dialogUrl = this.urlDecode(this.DialogUrl);
        if (dialogUrl.indexOf("?") == -1)
            this.DialogUrl = value;
        else {
            // 填充旧有的查询参数
            var oldParams = this.getUrlParameters(dialogUrl);
            var newDialogUrl = value;

            for (var k in oldParams)
                newDialogUrl = this.addUrlParameter(newDialogUrl, k, oldParams[k]);
            this.DialogUrl = this.urlEncode(newDialogUrl);
        }
    },

    get_dialogWidth: function() { return this.DialogWidth; },

    get_dialogHeight: function() { return this.DialogHeight; },

    get_dialogFeatures: function() { return this.DialogFeatures; },

    get_dialogOpened: function() { return this.m_dialogOpened; },

    set_dialogOpened: function(value) { this.m_dialogOpened = value; },

    get_backgroundMask: function() { return document.getElementById(this.get_clientID() + "BackgroundMask"); },

    get_dialgCaption: function() { return document.getElementById(this.get_clientID() + "DialogCaption"); },

    get_dialogClose: function() { return document.getElementById(this.get_clientID() + "DialogClose"); },

    get_dialogContent: function() { return document.getElementById(this.get_clientID() + "DialogContent"); },

    get_dialogContainer: function() {
        if (!this.m_dialogContainer)
            this.set_dialogContainer(self);
        return this.m_dialogContainer;
    },

    set_dialogContainer: function(value) {
        this.m_dialogContainer = value;
        var dialogBox = this;
        $(value).bind("scroll", function() { dialogBox.resize(); });
        $(value).bind("resize", function() { dialogBox.resize(); });
    },

    get_isShowModal: function() { return this.get_dialogType() == "Modal"; },

    get_clientWidth: function() {
        var container = this.get_dialogContainer();
        if (container.innerWidth != undefined)
            return container.innerWidth;
        if (container.document.compatMode == "CSS1Compat")
            return container.document.documentElement.clientWidth;
        if (container.document.body)
            return container.document.body.clientWidth;
        return "undefined";
    },

    get_clientHeight: function() {
        var container = this.get_dialogContainer();
        if (container.innerHeight != undefined)
            return container.innerHeight;
        if (container.document.compatMode == "CSS1Compat")
            return container.document.documentElement.clientHeight;
        if (container.document.body)
            return container.document.body.clientHeight;
        return "undefined";
    },

    get_clientTop: function() {
        var container = this.get_dialogContainer();
        var doc = (container.document.compatMode && container.document.compatMode != "BackCompat") ? container.document.documentElement : container.document.body;
        return container.document.all ? doc.scrollTop : container.pageYOffset;
    },

    get_clientLeft: function() {
        var container = this.get_dialogContainer();
        var doc = (container.document.compatMode && container.document.compatMode != "BackCompat") ? container.document.documentElement : container.document.body;
        return container.document.all ? doc.scrollLeft : container.pageXOffset;
    },

    get_form: function() {
        if (this.m_form)
            return this.m_form;
        var form = this.get_element();
        while (form && form.tagName && form.tagName.toLowerCase() != "form")
            form = form.parentNode;
        if (form && (!form.tagName || form.tagName.toLowerCase() != "form"))
            form = null;
        return this.m_form = form;
    },

    set_dialogBoxAlignCenter: function(element) {
        var clientWidth = this.get_clientWidth() - 2;
        var clientHeight = this.get_clientHeight() - 2;
        var clientTop = this.get_clientTop();
        var clientLeft = this.get_clientLeft();
        var wrap = $(element);
        var width = wrap.width();
        var height = wrap.height();
        var top = clientHeight < height ? "0px" : (clientTop + clientHeight / 2 - height / 2) + "px";
        var left = clientWidth < width ? "0px" : (clientLeft + clientWidth / 2 - width / 2) + "px";
        wrap.css({ "top": top, "left": left });
    },

    arrangeMask: function(mask) {
        var clientWidth = $(document).width() - 2;
        var clientHeight = $(document).height() - 2;
        var clientTop = this.get_clientTop();
        var clientLeft = this.get_clientLeft();
        var width = this.get_dialogWidth() + 5;
        var height = this.get_dialogHeight() + 5;
        var elementWidth = ((width && width > clientWidth) ? width : clientWidth);
        var elementHeight = ((height && height > clientHeight) ? height : clientHeight);

        $(mask).css({ "top": clientTop, "left": clientLeft, "width": elementWidth + "px", "height": elementHeight + "px" });
    },

    raiseOnDialogOpening: function(e) {
        var handler = this.get_onClientDialogOpening() ? eval(this.get_onClientDialogOpening()) : null;
        if (handler) handler(this, e);
        this.invoke("DialogOpening", this, e);
    },

    raiseOnDialogOpened: function(e) {
        var handler = this.get_onClientDialogOpened() ? eval(this.get_onClientDialogOpened()) : null;
        if (handler) handler(this, e);
        this.invoke("DialogOpened", this, e);
    },

    raiseOnDialogClosing: function(e) {
        var handler = this.get_onClientDialogClosing() ? eval(this.get_onClientDialogClosing()) : null;
        if (handler) handler(this, e);
        this.invoke("DialogClosing", this, e);
    },

    raiseOnDialogClosed: function(e) {
        var handler = this.get_onClientDialogClosed() ? eval(this.get_onClientDialogClosed()) : null;
        if (handler) handler(this, e);
        this.invoke("DialogClosed", this, e);
    },

    dispalySelect: function(val) {
        var visibility = ["hidden", "visible"];
        $("select").css("visibility", visibility[val]);
    },

    createMask: function() {
        var div = document.createElement("div");
        $(div).attr({ "id": this.get_clientID() + "BackgroundMask", "class": "bccwDialogBackgroundMask" });
        this.arrangeMask(div);
        return div;
    },

    createFrame: function() {
        var frame = document.createElement("iframe");
        $(frame).attr({ "frameborder": "0", "width": "100%", "height": "100%", "scrolling": "no",
            "src": this.get_dialogUrl(), "name": this.get_clientID(), "id": this.get_clientID() + "frame"
        });
        return frame;
    },

    createInlineDialog: function() {
        var opener = this;
        var dialog = this.get_dialogElement();

        if (this.get_dialgCaption() && this.get_dialogTitle())
            $(this.get_dialgCaption()).html(this.get_dialogTitle());
        if (this.get_dialogClose())
            $(this.get_dialogClose()).bind("click", function() { opener.closeDialog(); });
        if (!this.get_dialogContent())
            throw "无法加载对话框内容";

        return dialog;
    },

    arrangeContentSize: function() {
        var dialog = this.get_dialogElement();
        if (dialog.childNodes) {
            var primaryChildren = $(dialog).children();
            var children = (primaryChildren.length != 1 ? primaryChildren : $(primaryChildren[0]).children());
            if (children.length == 1)
                $(dialog).children().css({ "height": this.get_dialogHeight() + "px" });
            else {
                var content = this.get_dialogContent();
                var accmuHeight = 2;
                for (var i = 0; i < children.length; ++i) {
                    if (children[i] != content)
                        accmuHeight += $(children[i]).height();
                }
                $(content).css({ "height": (this.get_dialogHeight() - accmuHeight) + "px" });
            }
        }
    },

    beginOpenInlineDialogAnimation: function(dialog, scaleX, scaleY) {
        var dialogBox = this;
        if (scaleX > 1 || scaleY > 1) {
            this.arrangeContentSize();
            this.get_dialogContent().appendChild(this.createFrame());
            // fix ie
            self.frames[self.frames.length - 1].name = this.get_clientID();
            return;
        }
        $(dialog).css({ "display": "", "width": this.get_dialogWidth() * scaleX + "px", "height": this.get_dialogHeight() * scaleY + "px" });
        this.set_dialogBoxAlignCenter(dialog);
        window.setTimeout(function() { dialogBox.beginOpenInlineDialogAnimation(dialog, parseFloat(scaleX + 0.1), parseFloat(scaleY + 0.1)); }, 15);
    },

    resize: function() {
        if (this.get_dialogOpened()) {
            this.set_dialogBoxAlignCenter(this.get_dialogElement());
            this.arrangeMask(this.get_backgroundMask());
        }
    },

    showInlineDialog: function() {
        this.dispalySelect(0);
        $(document.body).prepend(this.createMask()).prepend(this.createInlineDialog());
        this.beginOpenInlineDialogAnimation(this.get_dialogElement(), 0, 0);
    },

    showModalDialog: function() {
        var dialogBox = this;
        var features = "dialogWidth=" + this.get_dialogWidth() + "px;dialogHeight=" + this.get_dialogHeight() + "px" + (this.get_dialogFeatures() ? (";" + this.get_dialogFeatures()) : "");
        var returnValue = window.showModalDialog(this.get_dialogUrl(), dialogBox, features);
        if (returnValue && returnValue.length > 0) {
            var strArray = returnValue.split("\x02");
            this.set_selectedText(strArray[0]);
            this.set_selectedValue(strArray[1]);
        }
    },

    showDialog: function() {
        if (!this.get_isShowModal() && this.get_dialogOpened())
            return;
        var e = new CancelEventArgs(this.get_button());
        this.raiseOnDialogOpening(e);
        if (!e.get_cancel()) {
            if (this.get_dialogType() == "Inline")
                this.showInlineDialog();
            else
                this.showModalDialog();
            this.set_dialogOpened(true);
            this.raiseOnDialogOpened(new EventArgs(this.get_button()));
        }
    },

    closeInlineDialog: function() {
        $(this.get_dialogElement()).css({ "display": "none", "top": "0px", "left": "0px" });
        $(this.get_dialogContent()).height(0);
        $(this.get_dialogContent().childNodes).remove();
        this.get_element().appendChild(this.get_dialogElement());
        document.body.removeChild(this.get_backgroundMask());
    },

    closeDialog: function() {
        var e = new CancelEventArgs(this.get_dialogClose());
        if (this.get_dialogOpened()) {
            this.raiseOnDialogClosing(e);
            if (!e.get_cancel() && !this.get_isShowModal())
                this.closeInlineDialog();
            this.set_dialogOpened(false);
            this.dispalySelect(1);
            this.raiseOnDialogClosed(new EventArgs(this.get_dialogClose()));
        }
    },

    initializeBase: function(derive, base) {
        for (var memberName in base)
            derive[memberName] = base[memberName];
    },

    initializeControl: function() {
        this.m_textBox = document.getElementById(this.get_clientID() + "TextBox");
        this.m_button = document.getElementById(this.get_clientID() + "Button");
        this.m_selectedText = this.m_textBox != null ? this.m_textBox.value : "";
        this.m_selectedValue = this.get_stateValue();
        var dialogBox = this;
        if (this.m_button)
            $(this.m_button).bind("click", function() { dialogBox.showDialog(); });
    },

    initialize: function() {
        this.initializeControl();
        var dialogBox = this;
        $(this.get_form()).bind("submit", function() { dialogBox.trackClientState(); });
        this.set_selectedText(this.fixedLastChar(this.get_selectedText(), ','));
        this.set_selectedValue(this.fixedLastChar(this.get_selectedValue(), ','));
    },

    fixedSurplusLastChar: function(str, ch) {
        if (!str || typeof (str) != "string" || str.length == 0)
            return "";
        return str.charAt(str.length - 1) == ch ? str.substring(0, str.length - 1) : str;
    },

    fixedLastChar: function(str, ch) {
        if (!str || typeof (str) != "string" || str.length == 0)
            return "";
        return str.charAt(str.length - 1) != ch ? str + ch : str;
    },

    trackClientState: function() {
        var selectedText = this.get_selectedText();
        var selectedValue = this.get_selectedValue();
        this.set_stateValue(this.fixedSurplusLastChar(selectedText, ',') + "\x03" + this.fixedSurplusLastChar(selectedValue, ','));
    },

    clear: function() {
        this.set_selectedText("");
        this.set_selectedValue("");
    }
}