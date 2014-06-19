var i = false;
function inputDiv(id, apphtml) {
	var inp = document.getElementById(id);

	if (i == false) {
		var mDiv =document.getElementById("myDiv");
		mDiv.innerHTML = apphtml; 
		insertAfter(mDiv, inp);
		//mDiv.onclick = function() {
			//inp.value = this.innerHTML;
			//this.style.display = "none"; 
			//i = false;
		//}
		//
		i = true;
		//inp.value = "";
		mDiv.innerHTML += "<input style='float:right' type='button' value='关闭' onclick=\"i=false;$('#myDiv').hide();\"/>"; 
	}

}
function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if (parent.lastChild == targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}