


function fnSelectSJ(sjchk)
{
/*
        dW = 300;
        dH = 350;
        //pageUrl = "PublishSJ.jsp";//ѡ����Ŀ
        pageUrl = "PublishSJFrame.jsp";//ѡ����Ŀ
        var args = new Object();
        args["AuthorityCheck"] = document.formData.authoIds.value;	//Ȩ�޵Ĳ���
        args["AuthorityName"] = document.formData.authoNames.value;		//��Ȩ�޵���Ŀ����
        args["NowSelectId"] = document.formData.sjId.value; //���ڱ�ѡ�е�id

    args["NowSelectValue"] = ","+document.formData.sjName.value; //���ڱ�ѡ�е�id
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
        //pageUrl = "PublishSJ.jsp";//ѡ����Ŀ
        pageUrl = "PublishSJFrame11.jsp?bootid=" + bootid;//ѡ����Ŀ
        var args = new Object();
        args["AuthorityCheck"] = document.formData.autho_Ids.value;	//Ȩ�޵Ĳ���
        args["AuthorityName"] = document.formData.autho_Names.value;		//��Ȩ�޵���Ŀ����
        args["NowSelectId"] = document.formData.sj_id.value; //���ڱ�ѡ�е�id

    args["NowSelectValue"] = ","+document.formData.sjName1.value; //���ڱ�ѡ�е�id
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
        //pageUrl = "PublishSJ.jsp";//ѡ����Ŀ
        pageUrl = "PublishSJFrame11.jsp?bootid=" + bootid;//ѡ����Ŀ
        var args = new Object();
        args["AuthorityCheck"] = document.formData.autho_Ids.value;	//Ȩ�޵Ĳ���
        args["AuthorityName"] = document.formData.autho_Names.value;		//��Ȩ�޵���Ŀ����
        args["NowSelectId"] = document.formData.sj_id.value; //���ڱ�ѡ�е�id

    args["NowSelectValue"] = ","+document.formData.sjName1.value; //���ڱ�ѡ�е�id
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

        1 -- ����

        */
        
			  formData.sjName.value=formData.Module.value;
			  formData.sjId.value=formData.ModuleDirIds.value;
        var form = document.formData ;
        form.CT_content.value=eWebEditor1.getHTML();
                
		//alert (typeof("eWebEditor1"));
        if(typeof("eWebEditor1")=="undefined")
        {
				ymPrompt.alert("�༭������δ������ȫ�����Ժ��ύ!");
				return false;
        }


        if(status=="3")
        {
                if(form.tcMemo.value=="")
                {
                        ymPrompt.alert("����д������!");
                        form.tcMemo.focus();
                        return false;
                }
        }


        if(form.ctTitle.value =="")
        {
                ymPrompt.alert("����д����!");
                form.ctTitle.focus();
                return false;
        }else if(form.ctTitle.value.replace(/\s/gi,"")=="")
        {
                ymPrompt.alert("����д����!");
                form.ctTitle.focus();
                return false;
        }
		   if(form.ctKeywords.value =="����/ƴ��"||form.ctKeywords.value =="")
        {
                ymPrompt.alert("����д�ؼ���!");
                form.ctKeywords.focus();
                return false;
        }
/*
        if(form.ctTitle.value.indexOf("\"")!=-1 || form.ctTitle.value.indexOf("'")!=-1 )
        {
                ymPrompt.alert("���ⲻ�ܰ����������!");
                form.ctTitle.focus();
                return false;
        }
        */
        if	 (form.ctCreateTime.value =="")
        {
                ymPrompt.alert("����д����ʱ��!");
                form.ctCreateTime.focus();
                return false;
        }

        if(form.sjName.value ==""||form.sjId.value =="")
        {
                ymPrompt.alert("��ѡ����Ŀ!");
                //form.sj_id.focus();
                return false;
        }
        
       
	  if (formData.sjName.value == "�ֶ�����," || formData.sjName.value == "�ֶ���̳,") {
	  	if (formData.ctEndTime.value == "") {
	  		ymPrompt.alert("��ѡ�����ʱ�䣡");
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
            ymPrompt.alert("����д��ȡ��!");
            form.IN_CATCHNUM.focus();
            return false;
          }
          if	 (form.IN_FILENUM.value =="")
          {
            ymPrompt.alert("����д�ļ����!");
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