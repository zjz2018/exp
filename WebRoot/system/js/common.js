


function fnSelectSJ(sjchk)
{
/*
        dW = 300;
        dH = 350;
        //pageUrl = "PublishSJ.jsp";//选择栏目
        pageUrl = "PublishSJFrame.jsp";//选择栏目
        var args = new Object();
        args["AuthorityCheck"] = document.formData.authoIds.value;	//权限的参数
        args["AuthorityName"] = document.formData.authoNames.value;		//有权限的栏目名称
        args["NowSelectId"] = document.formData.sjId.value; //现在被选中的id

    args["NowSelectValue"] = ","+document.formData.sjName.value; //现在被选中的id
        returnSet = showModalDialog(pageUrl, args ,"dialogWidth: "+dW+"px; dialogHeight: "+dH+"px; help=no; status=no; scroll=yes; resizable=no; ") ;
        if (typeof(returnSet) == "undefined" || returnSet == "")
        {
                return ;
        }else{
                sValue = returnSet.split(";");
                if(sjchk)
        {

                        var trueor02 = 0
                        sj_idvalue02=sValue[0].split(",")
                        sj_idvalue03=(sValue[1].substring(1,sValue[1].length)).split(",")
                        var sj_id=document.formData.sj_id.value;
                        sj_idvalue=sj_id.split(",")
                        var trueor=1
                        for(i=0;i<sj_idvalue02.length;i++)
                        {

                                for(j=0;j<sj_idvalue.length;j++)
                                {
                                        if(sj_idvalue02[i]==sj_idvalue[j])
                                        {
                                                trueor =0;
                                        }
                                }
                                if(trueor!=0)
                                {
                  var div_obj02=document.createElement("DIV")
                                        div_obj02.id="div"+sj_idvalue02[i]
                                        document.all.TdInfo02.appendChild(div_obj02);
                  div_obj02.innerHTML="<input type='checkbox' value='1' name='ch" + sj_idvalue02[i] + "' id='ch" + sj_idvalue02[i] + "' onclick='javascript:clickall()'>"+sj_idvalue03[i];
                                }
                                trueor =1
        }
                for(i=0;i<sj_idvalue.length;i++)
                                {
                                        var div_obj=document.getElementById("div"+sj_idvalue[i]);
                                        trueor02=0;
                                        for(j=0;j<sj_idvalue02.length;j++)
                                        {
                                                if(sj_idvalue[i]==sj_idvalue02[j])
                                                {
                                                      trueor02=1;
                                                }
                                        }
                                        if(trueor02!=1)
                                        {
                                                if(div_obj!=null)
                                                {
                                                        div_obj.removeNode(true);
                                                }
                                        }
                }
     }
        document.formData.sjName.value = sValue[1].substring(1,sValue[1].length);
        document.formData.sjId.value = sValue[0];

    }*/
}




function fnSelectSJ2(sjchk,bootid)
{

        dW = 300;
        dH = 350;
        //pageUrl = "PublishSJ.jsp";//选择栏目
        pageUrl = "PublishSJFrame11.jsp?bootid=" + bootid;//选择栏目
        var args = new Object();
        args["AuthorityCheck"] = document.formData.autho_Ids.value;	//权限的参数
        args["AuthorityName"] = document.formData.autho_Names.value;		//有权限的栏目名称
        args["NowSelectId"] = document.formData.sj_id.value; //现在被选中的id

    args["NowSelectValue"] = ","+document.formData.sjName1.value; //现在被选中的id
        returnSet = showModalDialog(pageUrl, args ,"dialogWidth: "+dW+"px; dialogHeight: "+dH+"px; help=no; status=no; scroll=yes; resizable=no; ") ;
        //alert(returnSet);
        if (typeof(returnSet) == "undefined" || returnSet == "")
        {
                return ;
        }else{
                sValue = returnSet.split(";");
                if(sjchk)
        {

                        var trueor02 = 0
                        sj_idvalue02=sValue[0].split(",")
                        sj_idvalue03=(sValue[1].substring(1,sValue[1].length)).split(",")
                        var sj_id=document.formData.sj_id.value;
                        sj_idvalue=sj_id.split(",")
                        var trueor=1
                        for(i=0;i<sj_idvalue02.length;i++)
                        {

                                for(j=0;j<sj_idvalue.length;j++)
                                {
                                        if(sj_idvalue02[i]==sj_idvalue[j])
                                        {
                                                trueor =0;
                                        }
                                }
                                if(trueor!=0)
                                {
                  var div_obj02=document.createElement("DIV")
                                        div_obj02.id="div"+sj_idvalue02[i]
                                        document.all.TdInfo02.appendChild(div_obj02);
                  div_obj02.innerHTML="<input type='checkbox' value='1' name='ch" + sj_idvalue02[i] + "' id='ch" + sj_idvalue02[i] + "' onclick='javascript:clickall()'>"+sj_idvalue03[i];
                                }
                                trueor =1
        }
                for(i=0;i<sj_idvalue.length;i++)
                                {
                                        var div_obj=document.getElementById("div"+sj_idvalue[i]);
                                        trueor02=0;
                                        for(j=0;j<sj_idvalue02.length;j++)
                                        {
                                                if(sj_idvalue[i]==sj_idvalue02[j])
                                                {
                                                        trueor02=1;
                                                }
                                        }
                                        if(trueor02!=1)
                                        {
                                                if(div_obj!=null)
                                                {
                                                        div_obj.removeNode(true);
                                                }
                                        }
                }
     }

        document.formData.sjName1.value = sValue[1];
        document.formData.sj_id.value = sValue[0];
        document.formData.submit();

    }
}

function fnSelectSJ1(sjchk,bootid)
{

        dW = 300;
        dH = 350;
        //pageUrl = "PublishSJ.jsp";//选择栏目
        pageUrl = "PublishSJFrame11.jsp?bootid=" + bootid;//选择栏目
        var args = new Object();
        args["AuthorityCheck"] = document.formData.autho_Ids.value;	//权限的参数
        args["AuthorityName"] = document.formData.autho_Names.value;		//有权限的栏目名称
        args["NowSelectId"] = document.formData.sj_id.value; //现在被选中的id

    args["NowSelectValue"] = ","+document.formData.sjName1.value; //现在被选中的id
        returnSet = showModalDialog(pageUrl, args ,"dialogWidth: "+dW+"px; dialogHeight: "+dH+"px; help=no; status=no; scroll=yes; resizable=no; ") ;
        //alert(returnSet);
        if (typeof(returnSet) == "undefined" || returnSet == "")
        {
                return ;
        }else{
                sValue = returnSet.split(";");
                if(sjchk)
        {

                        var trueor02 = 0
                        sj_idvalue02=sValue[0].split(",")
                        sj_idvalue03=(sValue[1].substring(1,sValue[1].length)).split(",")
                        var sj_id=document.formData.sj_id.value;
                        sj_idvalue=sj_id.split(",")
                        var trueor=1
                        for(i=0;i<sj_idvalue02.length;i++)
                        {

                                for(j=0;j<sj_idvalue.length;j++)
                                {
                                        if(sj_idvalue02[i]==sj_idvalue[j])
                                        {
                                                trueor =0;
                                        }
                                }
                                if(trueor!=0)
                                {
                  var div_obj02=document.createElement("DIV")
                                        div_obj02.id="div"+sj_idvalue02[i]
                                        document.all.TdInfo02.appendChild(div_obj02);
                  div_obj02.innerHTML="<input type='checkbox' value='1' name='ch" + sj_idvalue02[i] + "' id='ch" + sj_idvalue02[i] + "' onclick='javascript:clickall()'>"+sj_idvalue03[i];
                                }
                                trueor =1
        }
                for(i=0;i<sj_idvalue.length;i++)
                                {
                                        var div_obj=document.getElementById("div"+sj_idvalue[i]);
                                        trueor02=0;
                                        for(j=0;j<sj_idvalue02.length;j++)
                                        {
                                                if(sj_idvalue[i]==sj_idvalue02[j])
                                                {
                                                        trueor02=1;
                                                }
                                        }
                                        if(trueor02!=1)
                                        {
                                                if(div_obj!=null)
                                                {
                                                        div_obj.removeNode(true);
                                                }
                                        }
                }
     }

        document.formData.sjName1.value = sValue[1];
        document.formData.sj_id.value = sValue[0];
        //document.formData.submit();

    }
}







function checkform(status)
{
        /**
        status:

        1 -- 新增

        */
        
			  formData.sjName.value=formData.Module.value;
			  formData.sjId.value=formData.ModuleDirIds.value;
        var form = document.formData ;
        form.CT_content.value=eWebEditor1.getHTML();
                
		//alert (typeof("eWebEditor1"));
        if(typeof("eWebEditor1")=="undefined")
        {
				ymPrompt.alert("编辑框内容未载入完全，请稍后提交!");
				return false;
        }


        if(status=="3")
        {
                if(form.tcMemo.value=="")
                {
                        ymPrompt.alert("请填写审核意见!");
                        form.tcMemo.focus();
                        return false;
                }
        }


        if(form.ctTitle.value =="")
        {
                ymPrompt.alert("请填写主题!");
                form.ctTitle.focus();
                return false;
        }else if(form.ctTitle.value.replace(/\s/gi,"")=="")
        {
                ymPrompt.alert("请填写主题!");
                form.ctTitle.focus();
                return false;
        }
		   if(form.ctKeywords.value =="中文/拼音"||form.ctKeywords.value =="")
        {
                ymPrompt.alert("请填写关键字!");
                form.ctKeywords.focus();
                return false;
        }
/*
        if(form.ctTitle.value.indexOf("\"")!=-1 || form.ctTitle.value.indexOf("'")!=-1 )
        {
                ymPrompt.alert("主题不能包含特殊符号!");
                form.ctTitle.focus();
                return false;
        }
        */
        if	 (form.ctCreateTime.value =="")
        {
                ymPrompt.alert("请填写发布时间!");
                form.ctCreateTime.focus();
                return false;
        }

        if(form.sjName.value ==""||form.sjId.value =="")
        {
                ymPrompt.alert("请选择栏目!");
                //form.sj_id.focus();
                return false;
        }
        
       
	  if (formData.sjName.value == "浦东开发," || formData.sjName.value == "浦东论坛,") {
	  	if (formData.ctEndTime.value == "") {
	  		ymPrompt.alert("请选择结束时间！");
	  		formData.ctEndTime.focus();
	  		return;
	  	}
	    formData.ctKeywords.value = formData.ctEndTime.value;
	  }
  

        form.infoStatus.value=status;
        if(form.ct_contentflag2.checked)
        {
          if	 (form.IN_CATCHNUM.value =="")
          {
            ymPrompt.alert("请填写索取号!");
            form.IN_CATCHNUM.focus();
            return false;
          }
          if	 (form.IN_FILENUM.value =="")
          {
            ymPrompt.alert("请填写文件编号!");
            form.IN_FILENUM.focus();
            return false;
          }
        }
        //GetDatademo();
  //form.action = "publishResult.jsp";
  //form.target = "_self";
  form.submit();
  
}

function showCal(obj)
{
        if (!obj) var obj = event.srcElement;
        var obDate;
        if ( obj.value == "" ) {
                obDate = new Date();
        } else {
                var obList = obj.value.split( "-" );
                obDate = new Date( obList[0], obList[1]-1, obList[2] );
        }

        var retVal = showModalDialog( "/system/common/calendar/calendar.htm", obDate,
                "dialogWidth=206px; dialogHeight=206px; help=no; scroll=no; status=no; " );

        if ( typeof(retVal) != "undefined" ) {
                var year = retVal.getFullYear();
                var month = retVal.getMonth()+1;
				if (month<10)
				{
					month = "0" + month;
				}
                var day = retVal.getDate();
				if (day<10)
				{
					day = "0" + day;
				}
                obj.value =year + "-" + month + "-" + day;
        }
}