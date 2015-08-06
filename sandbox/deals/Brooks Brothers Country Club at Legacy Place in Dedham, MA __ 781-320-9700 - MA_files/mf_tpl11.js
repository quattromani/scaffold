if (typeof console == "undefined") {
	var console = { log: function() {} , clear: function() {} };
}
// checks all checkboxes in a form that have the same name.

function jqCheckAll2( id, name )
{
	//alert("jqCheckAll2: " + id + ", name: " + name);
	$("INPUT[@name^=" + name + "][type='checkbox']").attr('checked', $('#' + id).is(':checked'));
	// $("INPUT[type='checkbox']").attr('checked', true);
}

function jqCheckAllLink( name )
{
	//alert("jqCheckAllLink name: " + name);
	// $("INPUT[@name^=" + name + "][type='checkbox']").attr('checked', true));
	$("INPUT[@name=" + name + "][type='checkbox']").attr('checked', true);
}
function jqCheckNoneLink(name )
{
	//alert("jqCheckNoneLink: name: " + name);
	//$("INPUT[@name^=" + name + "][type='checkbox']").attr('unchecked'));
	$("INPUT[type='checkbox']").attr('checked', false);
}


function mf_tpl_show_hidden_section() {
	if (arguments.length === 0) { $displayStyle = 'block'; } else { $displayStyle = arguments[0]; }
	document.getElementById('mf_tpl_hidden_section').style.display = $displayStyle;
}

///keep
function swapProductImage(index) {
	document.getElementById('largeImage').src = '/mcache/250x250/nab_originals/' + imageFileNames[index];
	document.getElementById('largeImage').width = 250;
	document.getElementById('largeImage').height = 250;
	var radioList = document.forms["copy_mf_listItem"]["listItemImageFileName"];

	//alert(radioList);

	//alert("oh yays!");
	if(radioList.length) {
		radio = radioList[index];
	} else {
		radio = radioList;
	}
	radio.checked = true;

	//document.getElementById('imageOption' + index).checked = true;
}


///dead?
function changeImageSelection(index) {
	//alert (index);
	document.getElementById('listItemImage').src = imagePreviews[index].url;
	document.getElementById('listItemImage').width = imagePreviews[index].largeWidth;
	document.getElementById('listItemImage').height = imagePreviews[index].largeHeight;
}

function editText(fieldName, index) {
	//alert("edit " + fieldName + " index No. " + index);
	blurOtherText(fieldName);
	//blur others, select proper radio butt, change innerHTML to textbox/area with onkeyup for update to top display, radio value.
	var radioList = document.forms["copy_mf_listItem"][fieldName];

	//alert(radioList);

	//alert("oh yays!");
	if(radioList.length) {
		radio = radioList[index];
	} else {
		radio = radioList;
	}
	radio.checked = true;
	updateField(fieldName,index,radio.value); //sets top display to new value

	/*for (var i = 0; i < radioList.length; i++) {
	if(radioList[i].checked == true) {
	document.getElementById(fieldName).innerHTML = radioList[i].value;
	}
	}*/
	eval("tempValue = " + fieldName + "[" + index + "]");
	//var tempValue = radioList[index].text;
	//alert(fieldName + " | " + tempValue);
	if(fieldName == 'listItemDescription') {
		document.getElementById(fieldName + "_" + index).innerHTML = "<textarea id=\"edit" + fieldName + "_" + index + "\" cols=80 rows=3 maxlength=2000 onkeyup=\"updateField('" + fieldName + "', " + index + ", this.value);\"  >" + tempValue + "</textarea>";
	} else {
		document.getElementById(fieldName + "_" + index).innerHTML = "<input type=text id=\"edit" + fieldName + "_" + index + "\" value=\"" + tempValue + "\" size=80 maxlength=255 onkeyup=\"updateField('" + fieldName + "', " + index + ", this.value);\" >";
	}
	document.getElementById('edit' + fieldName + "_" + index).focus();
}
//onBlur=\"blurText('" + fieldName + "', " + index + ", this.value);\"

function updateField(fieldName,index,value) {
	//alert (fieldName + "_" + index + "update" + value + "\n\nfieldName: " + fieldName);
	document.getElementById(fieldName).innerHTML = value;
	//document.getElementById(fieldName + "_" + index).innerHTML = value; //kills textbox
	//eval(fieldName + "[" + index + "].text = value;"); //updates array
	document.getElementById("radio_"+ fieldName + "_" + index).value = value; //sets value of radio button
}


function blurOtherText(fieldName) {
	///loop thru each radio: deselect radio butt, change the innerHTML to radio value
	//alert("blur all " + fieldName);
	var radioList = document.forms["copy_mf_listItem"][fieldName];
	//alert("radiolist len: " + radioList.length);
	for (var i = 0; i < radioList.length; i++) {
		//if(radioList[i].checked == true) {
		//document.getElementById(fieldName).innerHTML = radioList[i].value;
		document.getElementById(fieldName + "_" + i).innerHTML = "<span onClick=\"editText('" + fieldName + "', " + i + ");\" >" + radioList[i].value + "</span>"; //kills textbox
		//}
		radioList[i].checked = false;
	}
	//document.getElementById(fieldName).innerHTML = value;
	//document.getElementById(fieldName + "_" + index).innerHTML = value;
	//eval(fieldName + "[" + index + "].text = value;");
	//document.getElementById("radio_"+ fieldName + "_" + index).value = value;
}


//dwead?
function blurText(fieldName, index, value) {
	//alert (name + "_" + index);
	//alert(value);
	document.getElementById(fieldName).innerHTML = value;
	document.getElementById(fieldName + "_" + index).innerHTML = value;
	eval(fieldName + "[" + index + "].text = value;");
	document.getElementById("radio_"+ fieldName + "_" + index).value = value;
}

var pattern = new RegExp("^http:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_%;&\?\$\/\.=]+$");

function tryAltUrl(altUrl) {
	//var radios = document.new_mf_listItem.listItemImage;
	//var newRadio = document.createElement('input');
	//newRadio.setAttribute('name', 'listItemImage');
	//newRadio.setAttribute('value', altUrl);
	//newRadio.setAttribute('type', "radio");
	//newRadio.setAttribute('onclick', "changeImageSelection(99);");
	//radios.appendChild(newRadio);
	//alert(altUrl);
	//a variable that will hold the index number of the selected radio button
	//var checkedIndex;
	//  for (i = 0; i<document.new_mf_listItem.listItemImage.length; i++) {
	//    if (document.new_mf_listItem.listItemImage[i].checked==true) {
	//      checkedIndex=i;
	//      break // target aacquired. move on
	//    }
	//  }
	//alert(checkedIndex);
	//altUrl.replace(/^\s*|\s*$/g, ""); //trim
	if(pattern.test(altUrl) === true) {
		var img = new Image(); //create local image
		//img.onload = setImage(this); // after it has loaded, then set the large image. (it's asynchronous)
		img.onload = function() {
			setImage(img);
		}; // after it has loaded, then set the large image. (it's asynchronous)
		img.src = altUrl;
	} else {
		setNoImage();
	}
}

function setImage(img) { //pass the img obj
	if(img.width) {
		// jsut make it 250 wide.
		var targetWidth = 250;
		var scale = targetWidth / img.width;
		var newWidth = targetWidth;
		var newHeight = Math.ceil(img.height * scale);
		document.getElementById('largeImage').src = img.src;
		document.getElementById('largeImage').width = newWidth;
		document.getElementById('largeImage').height = newHeight;
		document.getElementById('imagepreviewextra').value = img.src; //the radio button.
		//document.new_mf_listItem.listItemImage[checkedIndex].value = altUrl; //the radio button.
	} else {
		setNoImage();
	}
}

function setNoImage() {
	document.getElementById('largeImage').src = "/mcache/250x250/nab_originals/couldNotAcquire.jpg";
	document.getElementById('largeImage').width = 250;
	document.getElementById('largeImage').height = 250;
	document.getElementById('imagepreviewextra').value = "couldNotAcquire.jpg"; //the radio button.
}

function updateDisplayForNewType(listTypeId) {
	try {
		//alert(listTypeId);


	} catch (oError) {
		for (var i in oError) {
			//alert(i = ': ' + oError[i]);
		}
	}
}

function moveOrCopyUpdate() {
	//alert(arguments[0]);
	if (arguments[0] == 'copy') {
		document.getElementById('submit').value = "Copy item";
		document.getElementById('submit').name = "addLink";
	} else {
		document.getElementById('submit').value = "Update item";
		document.getElementById('submit').name = "saveLink";
	}
}


function text2textBox(fieldName) {
	//alert(fieldName);
	var currentValue = document.copy_mf_listItem[fieldName].value;
	var fontSize = document.getElementById(fieldName).parentNode.style.fontSize;
	var fontWeight = document.getElementById(fieldName).parentNode.style.fontWeight;
	//alert(fontSize);
	//alert(currentValue);
	var temp = '<input type="text" id="' + fieldName + 'TextBox" value="' + currentValue + '" onblur="textBox2text(this.value, \'' + fieldName + '\');" style="';
	if(fontSize !== "") { temp += " font-size:" + fontSize; }
	if(fontWeight !== "") { temp += "; font-weight:" + fontWeight; }
	var size = currentValue.length + 4;
	if(size < 30) { size = 30; }
	temp += '; font-family:Verdana; border:0px; padding:0px" size="' + size + '" />';
	document.getElementById(fieldName).innerHTML = temp;
	document.getElementById(fieldName + 'TextBox').focus();
}

function text2sselect(fieldName) {
	//alert(fieldName);
	var currentValue = document.copy_mf_listItem[fieldName].value;
	var fontSize = document.getElementById(fieldName).parentNode.style.fontSize;
	//alert(fontSize);
	//alert(currentValue);
	var temp = '<select id="' + fieldName + 'sselect" onblur="sselect2text(this.value, \'' + fieldName + '\');" style="';
	if(fontSize !== "") { temp += " font-size:" + fontSize; }
	temp += '; font-family:Verdana; border:0px; padding:0px" />';
	ourArray = eval(fieldName + 'Text2sselectArray');
	for(var x in ourArray) {
		temp += '<option value="' + x + '"';
		if(x == currentValue) { temp += ' selected="selected" '; }
		temp += '>' + ourArray[x] + '</option>';
	}
	temp += '</select>';
	document.getElementById(fieldName).innerHTML = temp;
}

function text2textArea(fieldName) {
	//alert(fieldName);
	var currentValue = document.copy_mf_listItem[fieldName].value;
	var fontSize = document.getElementById(fieldName).parentNode.style.fontSize;
	var cols = 60;
	var rows = (currentValue.length/cols)+1;
	if (rows < 4) { rows = 4; }
	//alert(currentValue);
	var temp = '<textarea name="" id="' + fieldName + 'TextArea" cols="' + cols + '" rows="' + rows + '" onblur="textArea2text(this.value, \'' + fieldName + '\');" style="';
	if(fontSize) { temp += "font-size:" + fontSize; }
	temp += '; border:0px none; display:inline; font-family:Verdana;">' + currentValue + '</textarea>';
	document.getElementById(fieldName).innerHTML = temp;
	document.getElementById(fieldName + 'TextArea').focus();
}

function price2textBox(fieldName) {
	//alert(fieldName);
	var currentValue = document.copy_mf_listItem[fieldName].value;
	//alert(currentValue);
	document.getElementById(fieldName).innerHTML = '$<input type="text" id="' + fieldName + 'TextBox" value="' + currentValue + '" size="20" onblur="textBox2price(this.value, \'' + fieldName + '\');" size="' + (currentValue.length+5) + '" style="font-family:Verdana;"  />';
	document.getElementById(fieldName + 'TextBox').focus();
}

function textBox2text(value, name) {
	//alert("field value: " + value);
	//alert("field name: " + name);
	document.copy_mf_listItem[name].value = value;
	if(value === "") { value = '<span style="color:#CCCCCC;">(No ' + name + ')</span>'; }
	document.getElementById(name).innerHTML = "<span onmouseover=\"this.style.backgroundColor='papayaWhip';\" onmouseout=\"this.style.backgroundColor='transparent';\" onclick='text2textBox(\"" + name + "\");'>" + value + "</span>";
}

function sselect2text(value, name) {
	//alert("field value: " + value);
	//alert("field name: " + name);
	document.copy_mf_listItem[name].value = value;
	ourArray = eval(name + 'Text2sselectArray');
	document.getElementById(name).innerHTML = "<span onmouseover=\"this.style.backgroundColor='papayaWhip';\" onmouseout=\"this.style.backgroundColor='transparent';\" onclick='text2sselect(\"" + name + "\");'>" + ourArray[value] + "</span>";
}

function textArea2text(value, name) {
	//alert("field value: " + value);
	//alert("field name: " + name);
	document.copy_mf_listItem[name].value = value;
	if(value === "") { value = '<span style="color:#CCCCCC;">(No ' + name + ')</span>'; }
	document.getElementById(name).innerHTML = "<span onmouseover=\"this.style.backgroundColor='papayaWhip';\" onmouseout=\"this.style.backgroundColor='transparent';\" onclick='text2textArea(\"" + name + "\");'>" + value + "</span>";
}

function textBox2price(value, name) {
	//alert("field value: " + value);
	//alert("field name: " + name);
	value = value.replace(/[^0-9,\.]*/g, "");
	document.copy_mf_listItem[name].value = value;
	if(value === "") { value = '<span style="color:#CCCCCC;">(No highlight)</span>'; }
	document.getElementById(name).innerHTML = "$<span onmouseover=\"this.style.backgroundColor='papayaWhip';\" onmouseout=\"this.style.backgroundColor='transparent';\" onclick='price2textBox(\"" + name + "\");'>" + value + "</span>";
}

function showWhatWasTruncated(id) {
	document.getElementById(id).style.display = 'inline';
	document.getElementById(id + "1").innerHTML = '';
}
function hideWhatWasTruncated(id) {
	document.getElementById(id).style.display = 'none';
	document.getElementById(id + "1").innerHTML = 'more &raquo;';
}



function trim11 (str) {
	str = str.replace(/^\s+/, '');
	for (var i = str.length - 1; i >= 0; i--) {
		if (/\S/.test(str.charAt(i))) {
			str = str.substring(0, i + 1);
			break;
		}
	}
	return str;
}

/////////////////////////////////////////////////////////////////////////////////////////////
/////////////// here's the stuff that bagus uses to get data from a modal back to a form'
/////////////// you need to do your modal form just right.. see mfInvite.module.
///////////////
/////////////// in theory this could be fairly easily extended to work on more than one field of data
/////////////// on the original form, but I'm not going to test that all right now. But the orignal code I stole
/////////////// did support that, so it's not too far off.
/////////////// however, we are doing it from a set of
////////////////////////////////////////////////////////////////////////////////////////////


// ok , it kind of starts here.
/// This takes the data from the parent form and populates the checkboxes and the hidden field on the modal.
// it is called by an 'onReady' function that is added to the javascript stack in mfInvite.module
function GetFormFields(fields, childFields) {

	//alert ("hello gff=== fields: " + fields + ", childFields: " + childFields);
	var arr = [];
	var dfpwArray = [];
	var fieldArray = [];
	var childFieldArray = [];
	fieldArray = fields.split(",");
	childFieldArray = childFields.split(",");
	if (fieldArray.length != childFieldArray.length) { alert("you need equal amounds of fields"); return; }
	//alert("hey");
	for (var f in fieldArray) {
		var dfpw = "";//new String(); // data from parent window
		dfpw = self.parent.GetFormInfoFromParentWindow(fieldArray[f]);

		//alert ("dfpw: " + dfpw);
		dfpw= dfpw.replace(new RegExp( "\\n", "g" ), ",");
		dfpw= dfpw.replace(new RegExp( ", ", "g" ), ",");
		//alert (dfpw);
		arr = dfpw.split(",");
		for (var k in arr) if(arr[k]) dfpwArray.push(arr[k]);
		for(var d in dfpwArray) {

			$("INPUT[@id=edit-" + dfpwArray[d] + "][type='checkbox']").attr('checked', true);
			//alert ("|" + cbArray[i] + "[");  //alert ("field: " + field + ", ecb: edit-" + cbArray[i]);
			checkBoxesToSingleInput(fieldArray[f], childFieldArray[f]);
		}
	}
}

//////////// this is called by the function above.
function GetFormInfoFromParentWindow(field) {
	//alert ("gfifpw  field: " + field);
	of = getPossiblyDrupalizedElement(field); // original field= of
	for (i = 0; i < e.length; i++) {
		if((of.id.length > 0) && (of.value.length > 0)) {
			return of.value;
		}
	}
}

/////////////////called by SendFormInfoToParentWindow to fill in the original form.
// checkBoxesToSingleInput works with a set of checkboxes with the same name attribute and another form field.
// If you check on a checkbox (that has the proper onclick),
// the value of the checkbox is added to the other form (usually hidden) field.
// unchecking removes it.
function checkBoxesToSingleInput(sourceField,targetField){
	//alert("cbtsi: source: " + sourceField + ", target: " + targetField);
	var el = getPossiblyDrupalizedElement(sourceField);
	var i = 0, c, arr = [];
	var b = document.getElementsByName(targetField);
	var d = "";//new String();
	for (i = 0; i < b.length; i++) {
		if (b[i].checked) {
			arr[arr.length] =b[i].value;
		}
	}
	d = arr.join(", ");
	el.value = d;
}

// checkBoxesToSingleInputCheckAll fills in the extra hidden field with the values (not id's)
// of all the checkboxes with the name=source source field check boxes. Handles unchecking too.
/// maybe could be integrated with the one above, but what the hey
function checkBoxesToSingleInputCheckAll(state, source, target)
{
	//alert ("check all- state: " + state + ", source: " + source + ", target: " + target);
	var src = document.getElementsByName(source);
	var tar = document.getElementById(target);
	if (state == 'uncheckall') {    //alert ("un");
		tar.value = "";
	} else {    //alert ("checked");
		var c_value = "";
		for (s in src) {      if (src[s].checked) c_value += src[s].value + ", ";    }
		tar.value = c_value.substring(0, c_value.length - 2);
	}
	return false;
}


/////////////////////////////////////////////////////////////////////////////////
// ok, that's it for opening and working with the modal.
// The rest of this is for getting the modal info back to the original form.


// SendFormInfoToParentWindow will make a modal form send data back to the parent window.
function SendFormInfoToParentWindow(fields, origFields) {
	//  alert ("SFITPW-- form: " + form + ", keeper: " + keeper + ", parentForm: " + parentForm);
	//alert ("SFITPW-- fields: " + fields + ", origFields: " + origFields);
	var fieldArray = [];
	var origFieldArray = [];
	var fieldString = new String();
	var origFieldString = new String();
	fieldArray = fields.split(",");
	origFieldArray = origFields.split(",");
	for (fa in fieldArray) {
		field = getPossiblyDrupalizedElement(fieldArray[fa]);
		fieldString +=  field.name + "| |" +  field.value + "~ ~";
		//alert ("fieldTmp: " + fieldTemp);
	}
	fieldString = fieldString.substr(0,fieldString.length - 3);
	//alert ("fieldString: " + fieldString);
	for (of in origFieldArray) {
		orig  = getPossiblyDrupalizedElementByName(origFieldArray[of]);
		for (o in orig) {
			if (orig[o].id) origFieldString  += orig[o].id.substr(5) + ",";  // kill the word edit-  //makes this all kind of custom...
		}
		origFieldString += "~ ~";
	}
	origFieldString = origFieldString.substr(0,origFieldString.length - 4);
	//alert ("origFieldString: " + origFieldString);
	self.parent.jQuery.fn.colorbox.close();
	self.parent.FillFormFields(fieldString, origFieldString);
} // function SendFormInfoToParentWindow()
//-->


// finally this guy puts the data from the modal back into the form.
// it's got a lot of work to do:
// * gets a set of values in a weird string from the submitting form.
// * check to see if it can find the form field(s) in the target form.
// * remove from the target form's existing data if there is duplicate data coming in from the submitting form.
// * remove from existing data if submitting form unchecked / removed it.
// * make sure we don't remove real email addresses or user names that weren't on the submtting form.
// * also if the user deselected all, there is some special work to do as well.

function FillFormFields(fieldString, origFieldString) {
	//alert ("hello v: " + fieldString);
	//alert ("origFields: " + origFieldString);
	origFieldArray = origFieldString.split("~ ~");
	//hello v: mails| |Monkey, adrienne, form: og-invite-form
	if(fieldString.length < 5) {  return; }
	var levelOne = fieldString.split('~ ~');
	for(var l1 in levelOne) {  // for each form field we are working with... [thats el one]
		var levelTwo = levelOne[l1].split('| |');
		var prev = new String(); // data existing already in the parent window field
		var arr = [];
		var prevArray = [];
		// try to get the existing data for the field name that is stored in levelTwo[0]
		prevField = levelTwo[0];
		//alert ("prev field: " + prevField);
		prev = getPossiblyDrupalizedElement(prevField);
		/// clean the existing data up a bit and stick it in an array.
		prev = prev.value;
		prev= prev.replace(new RegExp( "\\n", "g" ), ",");
		prev= prev.replace(new RegExp( ", ", "g" ), ",");
		arr = prev.split(",");
		for (k in arr) if(arr[k]) prevArray.push(arr[k]);

		if (prevArray) {  // if there isn't data on the original/target form, not much to worry about. But if there is...
			//alert ("prev ARRAY: "  + prevArray);
			var levelThree = levelTwo[1].split(", ");
			for (l3 in levelThree) {
				//alert ("l3: " + levelThree[l3]);
				for (pa in prevArray) {
					// if the value from l3 is already in pa, remove it from pa so it doesn't get in there twice
					//alert ("l3: " + levelThree[l3] + ", pa: " + prevArray[pa]);
					if (levelThree[l3] == prevArray[pa]) {
						//alert ("removing " + prevArray[pa] + " from pa cuz it's a duplicate'");
						prevArray.splice(pa,1);
					}
				}
			}
			// all this next bit to remove stuff that was in orig form but is being removed by the submitting form.
			for (pa in prevArray) {
				if (prevArray[pa].indexOf('@') == -1) {  // if its a user name
					var stillThere = false;
					for (l3 in levelThree) {
						if (levelThree[l3] == prevArray[pa]) {
							//alert (prevArray[pa] + "is still there");
							stillThere = true;
						}
					}
					if (!stillThere) {
						//alert (prevArray[pa] + "is NOT still there");
						// we have to check whether the pa we are looking at was an option in the submitting form.
						// because if it wasn't we don't want to remove it if someone typed in a username that wasn't a friend.
						var origFields = origFieldArray[l1];
						//alert ("of: " + origFields);
						origFields = origFields.split(",");
						for (of in origFields) {
							var checkOrig = origFields[of];
							var wasFromFriends = false;
							if (checkOrig != levelTwo[0] && checkOrig != "" ) {
								//alert ("pa: " + prevArray[pa] + ", ofa: " +  origFieldArray[of]);
								if (prevArray[pa] == checkOrig) {
									wasFromFriends = true;
								}
							}
							// ok so if it was from the submitting form, but isn't part of pa any more go ahead and delete it.
							if (wasFromFriends) {
								//alert (prevArray[pa] + " was a user name, was unchecked, and was a friend so they are being removed ");
								prevArray.splice(pa,1);
							}
						}
					}
				}
			}

			prevThis = prevArray.join(", ");
			phinal = levelTwo[1] + ", " + prevThis;
			if (phinal.substr(0,2) == ", ") phinal = phinal.substr(2);
			//alert ("phinal: " + phinal);
		}
		//alert ('hey');
		pf = getPossiblyDrupalizedElement(prevField);
		pf.value = phinal;
	}
}

function getPossiblyDrupalizedElement(field) {
	//alert ("drupalizeable field: " + field);
	el = document.getElementById(field);

	if(!el) {
		field = "edit-" + field; /// try the drupal way.
		el = document.getElementById(field);
	}
	if(!el) {
		alert("Unable to find " + field + " in the form form");
		return false;
	}
	return el;
}


function getPossiblyDrupalizedElementByName(field) {
	//alert ("by name: " + field);
	el = document.getElementsByName(field);
	if(!el) {
		//alert ("! by name: " + field);
		field = "edit-" + field; /// try the drupal way.
		el = document.getElementById(field);
	}
	if(!el) {
		//alert("Unable to find " + field + " in the form");
		return false;
	}
	return el;
}


function switchAction(param) {
	//var formId = "node-form";
	//var pValue = param.value;
	//el = document.getElementById("edit-destination");
	//el.action = "/node/add/forum/" + param.value;
	//el.value = ""
	//document.write("hey");
	//alert(param.value);
	//alert (formId);
}


function xswitchAction(param) {

	el = document.getElementById("edit-destination");

}

var bassModifiedFieldsList = ""; // moved this to a global outside of the function, so that other functions may add fields to the list.
function getModifiedFieldsList(theform) {

	for (var i=0; i < theform.length; i++) {
		e = theform.elements[i];
		//do not process the hidden field. it can't be changed, so no need to update it.
		if (e.type == 'hidden') {continue;} else
			if (e.type=="select-one") {
				if ((o=theform.elements[i]).type=="select-one" && !o.options[o.selectedIndex].defaultSelected) {
					bassModifiedFieldsList = bassModifiedFieldsList + e.name + ", ";
				}
			} else if (e.type=="radio" || e.type=="checkbox") {
				if ((e.defaultChecked && !e.checked) || (!e.defaultChecked && e.checked)) {
					bassModifiedFieldsList = bassModifiedFieldsList + e.name + ", ";
				}
			} else if (e.type=="file") {
				if (e.defaultValue != e.value) { // just plain text fields and ?

					bassModifiedFieldsList = bassModifiedFieldsList + e.name.replace('fileUpload', '') + ", ";
				}
				//return false;//aha!
			} else if (e.type == 'textarea') {
				var holder;
				eid = e.id;
				try { // and see if this was a tinyMCE thing
					holder = tinyMCE.get(e.id).getContent();
					if (holder != e.defaultValue) {
						bassModifiedFieldsList = bassModifiedFieldsList + e.name + ", ";
					}
				} catch(err) {
					if (e.defaultValue != e.value) {
						bassModifiedFieldsList = bassModifiedFieldsList + e.name + ", ";
					}
				}
			} else if (e.defaultValue != e.value) { // just plain text fields and ?
				bassModifiedFieldsList = bassModifiedFieldsList + e.name + ", ";
			}
	}
	fieldsToUpdate = document.createElement('INPUT');
	fieldsToUpdate.type = 'hidden';
	fieldsToUpdate.value = bassModifiedFieldsList;
	fieldsToUpdate.setAttribute("Name", "fieldsToUpdate");
	theform.appendChild(fieldsToUpdate);

	// now put all fields in allFieldNames


	var e = [];
	for (var i=0; i < theform.length; i++) {
		e.push(theform.elements[i].name);
	}
	fieldsToAdd = document.createElement('INPUT');
	fieldsToAdd.type = 'hidden';
	fieldsToAdd.value = e.join(",");
	fieldsToAdd.setAttribute("Name", "allFieldNames");
	theform.appendChild(fieldsToAdd);
	return true;
};

dump=function(object, showTypes){var dump='';var st=typeof showTypes=='undefined' ? true : showTypes;var winName='dumpWin';var browser=_dumpIdentifyBrowser();var w=760;var h=500;var leftPos=screen.width ?(screen.width-w)/ 2 : 0;var topPos=screen.height ?(screen.height-h)/ 2 : 0;var settings='height='+h+',width='+w+',top='+topPos+',left='+leftPos+',scrollbars=yes,menubar=yes,status=yes,resizable=yes';var title='Dump';var script='function tRow(s){t=s.parentNode.lastChild;tTarget(t, tSource(s));}function tTable(s){var switchToState=tSource(s);var table=s.parentNode.parentNode;for(var i=1;i < table.childNodes.length;i++){t=table.childNodes[i];if(t.style){tTarget(t, switchToState);}}}function tSource(s){if(s.style.fontStyle=="italic"||s.style.fontStyle==null){s.style.fontStyle="normal";s.title="click to collapse";return "open";}else{s.style.fontStyle="italic";s.title="click to expand";return "closed";}}function tTarget(t, switchToState){if(switchToState=="open"){t.style.display="";}else{t.style.display="none";}}';dump+=(/string|number|undefined|boolean/.test(typeof(object))||object==null)? object : recurse(object, typeof object);winName=window.open('', winName, settings);if(browser.indexOf('ie')!=-1||browser=='opera'||browser=='ie5mac'||browser=='safari'){winName.document.write('<html><head><title> '+title+' </title><script type="text/javascript">'+script+'</script><head>');winName.document.write('<body>'+dump+'</body></html>');}else{winName.document.body.innerHTML=dump;winName.document.title=title;var ffs=winName.document.createElement('script');ffs.setAttribute('type', 'text/javascript');ffs.appendChild(document.createTextNode(script));winName.document.getElementsByTagName('head')[0].appendChild(ffs);}winName.focus();function recurse(o, type){var i;var j=0;var r='';type=_dumpType(o);switch(type){case 'regexp':var t=type;r+='<table'+_dumpStyles(t,'table')+'><tr><th colspan="2"'+_dumpStyles(t,'th')+'>'+t+'</th></tr>';r+='<tr><td colspan="2"'+_dumpStyles(t,'td-value')+'><table'+_dumpStyles('arguments','table')+'><tr><td'+_dumpStyles('arguments','td-key')+'><i>RegExp: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o+'</td></tr></table>';j++;break;case 'date':var t=type;r+='<table'+_dumpStyles(t,'table')+'><tr><th colspan="2"'+_dumpStyles(t,'th')+'>'+t+'</th></tr>';r+='<tr><td colspan="2"'+_dumpStyles(t,'td-value')+'><table'+_dumpStyles('arguments','table')+'><tr><td'+_dumpStyles('arguments','td-key')+'><i>Date: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o+'</td></tr></table>';j++;break;case 'function':var t=type;var a=o.toString().match(/^.*function.*?\((.*?)\)/im);var args=(a==null||typeof a[1]=='undefined'||a[1]=='')? 'none' : a[1];r+='<table'+_dumpStyles(t,'table')+'><tr><th colspan="2"'+_dumpStyles(t,'th')+'>'+t+'</th></tr>';r+='<tr><td colspan="2"'+_dumpStyles(t,'td-value')+'><table'+_dumpStyles('arguments','table')+'><tr><td'+_dumpStyles('arguments','td-key')+'><i>Arguments: </i></td><td'+_dumpStyles(type,'td-value')+'>'+args+'</td></tr><tr><td'+_dumpStyles('arguments','td-key')+'><i>Function: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o+'</td></tr></table>';j++;break;case 'domelement':var t=type;r+='<table'+_dumpStyles(t,'table')+'><tr><th colspan="2"'+_dumpStyles(t,'th')+'>'+t+'</th></tr>';r+='<tr><td'+_dumpStyles(t,'td-key')+'><i>Node Name: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o.nodeName.toLowerCase()+'</td></tr>';r+='<tr><td'+_dumpStyles(t,'td-key')+'><i>Node Type: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o.nodeType+'</td></tr>';r+='<tr><td'+_dumpStyles(t,'td-key')+'><i>Node Value: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o.nodeValue+'</td></tr>';r+='<tr><td'+_dumpStyles(t,'td-key')+'><i>innerHTML: </i></td><td'+_dumpStyles(type,'td-value')+'>'+o.innerHTML+'</td></tr>';j++;break;}if(/object|array/.test(type)){for(i in o){var t=_dumpType(o[i]);if(j < 1){r+='<table'+_dumpStyles(type,'table')+'><tr><th colspan="2"'+_dumpStyles(type,'th')+'>'+type+'</th></tr>';j++;}if(typeof o[i]=='object' && o[i]!=null){r+='<tr><td'+_dumpStyles(type,'td-key')+'>'+i+(st ? ' ['+t+']' : '')+'</td><td'+_dumpStyles(type,'td-value')+'>'+recurse(o[i], t)+'</td></tr>';}else if(typeof o[i]=='function'){r+='<tr><td'+_dumpStyles(type ,'td-key')+'>'+i+(st ? ' ['+t+']' : '')+'</td><td'+_dumpStyles(type,'td-value')+'>'+recurse(o[i], t)+'</td></tr>';}else{r+='<tr><td'+_dumpStyles(type,'td-key')+'>'+i+(st ? ' ['+t+']' : '')+'</td><td'+_dumpStyles(type,'td-value')+'>'+o[i]+'</td></tr>';}}}if(j==0){r+='<table'+_dumpStyles(type,'table')+'><tr><th colspan="2"'+_dumpStyles(type,'th')+'>'+type+' [empty]</th></tr>';}r+='</table>';return r;};};_dumpStyles=function(type, use){var r='';var table='font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;cell-spacing:2px;';var th='font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;text-align:left;color: white;padding: 5px;vertical-align :top;cursor:hand;cursor:pointer;';var td='font-size:xx-small;font-family:verdana,arial,helvetica,sans-serif;vertical-align:top;padding:3px;';var thScript='onClick="tTable(this);" title="click to collapse"';var tdScript='onClick="tRow(this);" title="click to collapse"';switch(type){case 'string':case 'number':case 'boolean':case 'undefined':case 'object':switch(use){case 'table':r=' style="'+table+'background-color:#0000cc;"';break;case 'th':r=' style="'+th+'background-color:#4444cc;"'+thScript;break;case 'td-key':r=' style="'+td+'background-color:#ccddff;cursor:hand;cursor:pointer;"'+tdScript;break;case 'td-value':r=' style="'+td+'background-color:#fff;"';break;}break;case 'array':switch(use){case 'table':r=' style="'+table+'background-color:#006600;"';break;case 'th':r=' style="'+th+'background-color:#009900;"'+thScript;break;case 'td-key':r=' style="'+td+'background-color:#ccffcc;cursor:hand;cursor:pointer;"'+tdScript;break;case 'td-value':r=' style="'+td+'background-color:#fff;"';break;}break;case 'function':switch(use){case 'table':r=' style="'+table+'background-color:#aa4400;"';break;case 'th':r=' style="'+th+'background-color:#cc6600;"'+thScript;break;case 'td-key':r=' style="'+td+'background-color:#fff;cursor:hand;cursor:pointer;"'+tdScript;break;case 'td-value':r=' style="'+td+'background-color:#fff;"';break;}break;case 'arguments':switch(use){case 'table':r=' style="'+table+'background-color:#dddddd;cell-spacing:3;"';break;case 'td-key':r=' style="'+th+'background-color:#eeeeee;color:#000000;cursor:hand;cursor:pointer;"'+tdScript;break;}break;case 'regexp':switch(use){case 'table':r=' style="'+table+'background-color:#CC0000;cell-spacing:3;"';break;case 'th':r=' style="'+th+'background-color:#FF0000;"'+thScript;break;case 'td-key':r=' style="'+th+'background-color:#FF5757;color:#000000;cursor:hand;cursor:pointer;"'+tdScript;break;case 'td-value':r=' style="'+td+'background-color:#fff;"';break;}break;case 'date':switch(use){case 'table':r=' style="'+table+'background-color:#663399;cell-spacing:3;"';break;case 'th':r=' style="'+th+'background-color:#9966CC;"'+thScript;break;case 'td-key':r=' style="'+th+'background-color:#B266FF;color:#000000;cursor:hand;cursor:pointer;"'+tdScript;break;case 'td-value':r=' style="'+td+'background-color:#fff;"';break;}break;case 'domelement':switch(use){case 'table':r=' style="'+table+'background-color:#FFCC33;cell-spacing:3;"';break;case 'th':r=' style="'+th+'background-color:#FFD966;"'+thScript;break;case 'td-key':r=' style="'+th+'background-color:#FFF2CC;color:#000000;cursor:hand;cursor:pointer;"'+tdScript;break;case 'td-value':r=' style="'+td+'background-color:#fff;"';break;}break;}return r;};_dumpIdentifyBrowser=function(){var agent=navigator.userAgent.toLowerCase();if (typeof window.opera != 'undefined'){return 'opera';} else if (typeof document.all != 'undefined'){if (typeof document.getElementById != 'undefined'){var browser = agent.replace(/.*ms(ie[\/ ][^ $]+).*/, '$1').replace(/ /, '');if(typeof document.uniqueID != 'undefined') {if (browser.indexOf('5.5') != -1){return browser.replace(/(.*5\.5).*/, '$1');}else{return browser.replace(/(.*)\..*/, '$1');}}else{return 'ie5mac';}}}else if(typeof document.getElementById != 'undefined'){if (navigator.vendor.indexOf('Apple Computer, Inc.')!=-1) {return 'safari';}else if(agent.indexOf('gecko')!=-1) {return 'mozilla';}}return false;};_dumpType=function(obj){var t=typeof(obj);if(t=='function'){var f=obj.toString();if((/^\/.*\/[gi]??[gi]??$/).test(f)){return 'regexp';}else if((/^\[object.*\]$/i).test(f)){t='object'}}if(t !='object'){return t;}switch(obj){case null:return 'null';case window:return 'window';case document:return document;case window.event:return 'event';}if(window.event &&(event.type==obj.type)){return 'event';}var c=obj.constructor;if(c !=null){switch(c){case Array:t='array';break;case Date:return 'date';case RegExp:return 'regexp';case Object:t='object';break;case ReferenceError:return 'error';default:var sc=c.toString();var m=sc.match(/\s*function(.*)\(/);if(m !=null){return 'object';}}}var nt=obj.nodeType;if(nt !=null){switch(nt){case 1:if(obj.item==null){return 'domelement';}break;case 3:return 'string';}}if(obj.toString !=null){var ex=obj.toString();var am=ex.match(/^\[object(.*)\]$/i);if(am !=null){var am=am[1];switch(am.toLowerCase()){case 'event':return 'event';case 'nodelist':case 'htmlcollection':case 'elementarray':return 'array';case 'htmldocument':return 'htmldocument';}}}return t;};


function showComment(commentSubjectId) {
	jQuery('#addComment' + commentSubjectId).css('display', 'block').animate({height: '120px'}, 600 ).animate({opacity: 1}, 400);
}

function hideComment(commentSubjectId) {
	jQuery('#addComment' + commentSubjectId).animate({opacity: 0}, 400 ).animate({height: '0px'}, 600);
	var t=setTimeout("jQuery('#addComment" + commentSubjectId + "').css('display', 'none')", 1100);
}

/*vote!*/
function jog_votes() {
	// just make sure we have our basics defined.
	vote_data = vote_data || {}; // set in class poll
	vote_data.vote_user_ID = vote_data.vote_user_ID || 0;
	vote_data.vote_immutable = vote_data.vote_immutable || false;
	vote_data.vote_type = vote_data.vote_type || 'pickOne';
	vote_data.vote_show_total_from_yesterday = vote_data.vote_show_total_from_yesterday || true;
	vote_data.vote_values = vote_data.vote_values || {};
	vote_data.tracking = vote_data.tracking || {};
	vote_data.tracking.category = vote_data.tracking.category || 'Promotion';
	vote_data.tracking.action = vote_data.tracking.action || 'Vote';
	vote_data.tracking.label = vote_data.tracking.label || 'Unlabeled';

	//clear the ballot
	vote_clear_ballot();
	// put in fresh levers
	$(".voteLevers").each( function() { // this only works for our current batch of pick one stuff. 123 will need dev.
		var lever = $(this);
		var vote_item_id = lever.attr('data-vote_item_id');
		if(vote_item_id > 1) {
			vote_data.vote_values[vote_item_id] = vote_data.vote_values[vote_item_id] || 0;
			$(this).append(get_lever(lever, vote_item_id));
		}
	});

	//now, maybe we modify the voteTotals ...?
	if( ! vote_data.vote_show_total_from_yesterday && typeof voteTotals != 'undefined') {
		jQuery('.voteTotalDigits').each(function(index) {
			if(typeof voteTotals[this.id.replace('voteTotalId', '')] != 'undefined') this.innerHTML = voteTotals[this.id.replace('voteTotalId', '')];
		});
	}

}

function get_lever(lever, vote_item_id, disabled) {
	disabled = disabled || false;
	if(typeof window.voteLever == 'undefined') window.voteLever = $("<div class='voteLever' data-rating='yes' data-vote_item_id=''><span class='displayText'></span><span class='icon'></span></div>");
	var ret = window.voteLever.clone(true);
	ret.attr('data-vote_item_id', vote_item_id);
	if(disabled) { // disabled!
		ret.addClass('voteLever-disabled');
		if(lever.attr('data-disabled-text')) $('.displayText', ret).html(lever.attr('data-disabled-text'));
	} else if(vote_data.vote_values[vote_item_id] == 0) {
		// up
		ret.addClass('voteLever-up');
		if(lever.attr('data-off-text')) $('.displayText', ret).html(lever.attr('data-off-text'));
		ret.click(vote_cast);
	} else {
		// down
		ret.addClass('voteLever-down');
		if(lever.attr('data-on-text')) $('.displayText', ret).html(lever.attr('data-on-text'));
	}

	return ret;
}

function vote_cast() {
	var lever = $(this);
	var voteItemId = lever.attr('data-vote_item_id');
	var rating = lever.attr('data-rating');
	if(rating.length && voteItemId.length && voteItemId > 0) {
		vote_disable_ballot();

		window.timeout = setTimeout(vote_cast_error, 20000); // xd requests do not fire error handler.
		$.ajax({
			url: vote_data.vote_URL_base + voteItemId + '/vote/add/' + rating,
			dataType: 'jsonp',
			success: vote_parse,
			complete: function() {
				clearTimeout(window.timeout);
			},
			error: vote_cast_error
		});
	}
}

function vote_parse(response) {
	clearTimeout(window.timeout);
	var success = response.success || false;
	var action = response.action || false;
	var userMessages = response.userMessages || false;
	if(success) {
		//if it's a pick one, zero out all vote values before applying this value.
		if(vote_data.vote_type.indexOf('pickOne') != -1) for(x in vote_data.vote_values) vote_data.vote_values[x] = 0;

		var newVoteValues = response.voteValues;

		//looop thru em, stick them in the global voteValues
		for(key in newVoteValues) {
			var newVoteValue = newVoteValues[key];

			vote_data.vote_values[newVoteValue.parentId] = newVoteValue.voteValue;

			if(typeof voteTotals != 'undefined' && typeof newVoteValue.voteTotal != 'undefined' && newVoteValue.voteTotal != 0) {
				if(typeof newVoteValue.voteTotal != 'string') newVoteValue.voteTotal = newVoteValue.voteTotal.toString();
				if(newVoteValue.voteTotal.indexOf('-') != -1 || newVoteValue.voteTotal.indexOf('+') != -1) {
					voteTotals[newVoteValue.parentId] = eval(voteTotals[newVoteValue.parentId] + " " + newVoteValue.voteTotal);
				} else {
					voteTotals[newVoteValue.parentId] = parseInt(newVoteValue.voteTotal);
				}
			}
		}

		if(action == 'show messages' && userMessages) {
			mBox.alert(userMessages.join('\n\n'));
		}

		// ga event tracking for votes
		if(typeof pw_ga == 'object') {
			pw_ga.add_event({
				category: vote_data.tracking.category,
				action: vote_data.tracking.action,
				label: vote_data.tracking.label + ' success'
			});
		}

		if(typeof window.vote_post == 'function') window.vote_post(response);
	} else {
		if(action == 'show messages' && userMessages) {
			// ga event tracking for votes
			if(typeof pw_ga == 'object') {
				pw_ga.add_event({
					category: vote_data.tracking.category,
					action: vote_data.tracking.action,
					label: vote_data.tracking.label + ' unconfirmed'
				});
			}

			mBox.alert(userMessages.join('\n\n'));

		} else if(action == 'prompt to register') {
			// ga event tracking for votes
			if(typeof pw_ga == 'object') {
				pw_ga.add_event({
					category: vote_data.tracking.category,
					action: vote_data.tracking.action,
					label: vote_data.tracking.label + ' not logged in'
				});
			}

			// encourage the user to log in or register.
			var message = "You must be logged in to continue. Would you like to login now?";
			if (confirm(message)) mBox.login();

		} else {
			// ga event tracking for votes
			if(typeof pw_ga == 'object') {
				pw_ga.add_event({
					category: vote_data.tracking.category,
					action: vote_data.tracking.action,
					label: vote_data.tracking.label + ' error'
				});
			}
			vote_cast_error();
		}
	}

	//update the display
	jog_votes();
}

function vote_cast_error() {
	clearTimeout(window.timeout);
	mBox.alert('Sorry, your vote could not be processed, please try again later.');
	jog_votes();
}

function vote_disable_ballot() {
	vote_clear_ballot();
	$(".voteLevers").each( function(index) {
		$(this).append(get_lever($(this), 0, true));
	});
}

function vote_clear_ballot() {
	$(".voteLevers").each(function() {
		while (this.hasChildNodes()) this.removeChild(this.firstChild);
	});
}
/*end vote*/

/* begin mBox */
// mBox is a js lib for making pop-up modalesque windows. not for slide shows.
var mBox = {

	user_default_options: {},

	default_options: {
		overlay_omit: false, // the overlay is the part that fades out the background
		overlay_click_closes: true, // should a click outside the box close the box?
		overlay_opacity: 0.8, // the overlay generally partially fades the background
		overlay_color: 'black', // set this to an empty string to govern it by a css setting
		overlay_class: '',
		mBox_width: 500,
		mBox_height: 500,
		mBox_class: 'mBox_standard',
		min_clearance: 20,
		zIndex_base: 10000, // if you use other objects with high z-indexes, you'll probably need to raise this - updated jan 2013 from 100
		overlay_fade_in_length: 1000,
		container_fade_in_length: 2000,
		content: "mBox content goes here. Click outside this box to close.",
		dismiss_button_text: '', // leave empty to omit
		dismiss_button_class: 'dismiss mBox_button',
		affirm_button: '',
		misc_buttons: '',
		close_button_content: '', // typically 'close' or 'X'
		close_button_class: '',
		jog_length: 500, // ms - length of animation of vertical sliding back into vertical center
		external: false,
		iframe: false
	},

	set_default_options: function(options) {
		this.user_default_options = options;
	},

	get_options: function() {
		var options = jQuery.extend(true, {}, this.default_options); // getting a clone....
		for(x in this.user_default_options) {
			options[x] = this.user_default_options[x];
		}
		return options;
	},

	jog_boxes: function(seen) {
		if(typeof seen != 'boolean') seen = true;
		var options = this.get_options();
		$('.mBox').each(function(){
			if($(window).height() - options.min_clearance < $(this).outerHeight()) {
				// box too big for window. put it at the top and make it scrollable.
				$(this).css('position', 'absolute');
				$(this).css('top', options.min_clearance + 'px');
				newMarginTop = '0px';
				$("body").animate({scrollTop:0}, 250); // saf
				$("html").animate({scrollTop:0}, 250); // the rest
			} else {
				// float in the middle.
				$(this).css({position: 'fixed', top: '', left: ''}); // not really a good value, but need to destroy teh setting.
				newMarginTop = $(this).height()/-2 - parseInt($(this).css('paddingTop')) +  'px';
			}

			// not showing the same concern for horizontal fit.
			newMarginLeft = $(this).width()/-2 - parseInt($(this).css('paddingLeft')) +  'px';

			if(seen) {
				$(this).animate({marginLeft:newMarginLeft, marginTop:newMarginTop}, options.jog_length);
			} else {
				$(this).css({marginTop: newMarginTop, marginLeft: newMarginLeft});
			}
		});
	},

	close: function(all) {
		// if there is only one, then it is all by default - this is done this way because the overlay isn't removed unless we are killing all the mboxes
		if($(".mBox").length == 1) all = 'all';
		if(typeof all != 'undefined' && all == 'all') {
			// close/animate.remove all elements with this mbox index
			$("#mBox_overlay").stop().animate({opacity:0}, 300, function(){$(this).remove()});
			$(".mBox").stop().animate({opacity:0}, 300, function(){$(this).remove()});
		} else {
			//close jsut one. well, there should only be one that the user can see, so grab the 'last' one?
			$(".mBox").last().stop().animate({opacity:0}, 300, function(){$(this).remove()});
			// move the overlay back down one chunk
			var overlay = $("#mBox_overlay");
			overlay.css('zIndex', overlay.css('zIndex') - 5);
		}
	},

	open: function(argument_options) {
		var options = this.get_options();

		for(x in options) {
			if(typeof argument_options[x] != 'undefined') options[x] = argument_options[x];
		}

		// if we already have an mBox, base zIndex off of it.
		var temp = $(".mBox").last();
		if(temp.length) {
			previous_mBox_zIndex = parseInt(temp.css('zIndex'));
			previous_overlay_zIndex = previous_mBox_zIndex - 1;
			new_mBox_zIndex = previous_mBox_zIndex + 5;
			new_overlay_zIndex = new_mBox_zIndex - 1;
		} else {
			new_mBox_zIndex = options.zIndex_base + 1;
			new_overlay_zIndex = options.zIndex_base;
		}

		// create the overlay... or move it 'up' if it already exists
		if( ! options.overlay_omit) {
			var mBox_overlay = $("#mBox_overlay");
			if(mBox_overlay.length == 0) {
				// create one
				var overlay = $('<div id="mBox_overlay"></div>');
				if(options.overlay_class) overlay.addClass(options.overlay_class);
				if(options.overlay_color.length) overlay.css('backgroundColor', options.overlay_color);
				if(options.overlay_click_closes) {
					overlay.click(function(){
						mBox.close();
					});
				}
				// set the zindex
				overlay.css('zIndex', new_overlay_zIndex);
				$('body').append(overlay);
				overlay.animate({opacity:options.overlay_opacity}, options.overlay_fade_in_length);
			} else {
				// have one already, move it up:
				mBox_overlay.css('zIndex', parseInt(mBox_overlay.css('zIndex')) + 5);
			}
		}


		// create the mBox
		var mBox_container = $('<div class="mBox ' + options.mBox_class + '" style="width:' + options.mBox_width + 'px; z-index: ' + new_mBox_zIndex + '; opacity:0;"><div class="content"></div></div>');

		// is there a X - close button?
		if(options.close_button_class || options.close_button_position || options.close_button_content) {
			var close_button = $('<div class="close"></div>');
			if(options.close_button_content.length) close_button.html(options.close_button_content);
			close_button.click(mBox.close);
			mBox_container.append(close_button);
		}

		// is there an affirm button? prep it.
		if(typeof options.affirm_button == 'object') {
			var affirm_button = $('<div class="affirm mBox_button" style="float:right; margin-left:20px;"></div>');
			affirm_button.html(options.affirm_button.text);
			if(options.affirm_button.class_name && options.affirm_button.class_name.length) affirm_button.addClass(options.affirm_button.class_name);
			affirm_button.click(function(){
				options.affirm_button.callback();
				mBox.close();
			});
			mBox_container.find(".content").addClass('has_buttons');
			mBox_container.append(affirm_button);
		}

		// is there a dismiss button? prep it.
		if(options.dismiss_button_text.length) {
			var dismiss_button = $('<div class="' + options.dismiss_button_class + '" style="float:right; margin-left:20px;"></div>');
			dismiss_button.html(options.dismiss_button_text);
			dismiss_button.click(mBox.close);
			mBox_container.find(".content").addClass('has_buttons');
			mBox_container.append(dismiss_button);
		}

		// are there any misc buttons? this could be a single object or an array of them. if it is a single object, make it the only element in a new array.
		// remember, an array is akind of object, so a special test.....
		if(Object.prototype.toString.apply(options.misc_buttons) === '[object object]') options.misc_buttons = [options.misc_buttons];
		for(var x in options.misc_buttons) {
			if(typeof options.misc_buttons[x].callback == 'function' && options.misc_buttons[x].misc_button_text.length) {
				var misc_button = $('<div class="mBox_button misc" style="float:right; margin-left:20px;"></div>');
				misc_button.html(options.misc_buttons[x].misc_button_text);
				if(options.misc_buttons[x].title && options.misc_buttons[x].title.length) misc_button.attr('title', options.misc_buttons[x].title);
				if(options.misc_buttons[x].class_attribute && options.misc_buttons[x].class_attribute.length) misc_button.addClass(options.misc_buttons[x].class_attribute);
				misc_button.click(options.misc_buttons[x].callback);
				mBox_container.find(".content").addClass('has_buttons');
				mBox_container.append(misc_button);
			}
		}

		$('body').append(mBox_container);

		// contents of it.
		if(options.content instanceof jQuery) {
			options.content.appendTo(mBox_container.find(".content"));
			this.jog_boxes(false);
			mBox_container.animate({opacity:100}, options.container_fade_in_length);

		} else if(options.content.length) {
			if(options.content.substr(0,1) == '/') {
				// local content - go get it
				mBox_container.find(".content").load(options.content, function(){
					mBox.jog_boxes();
					mBox_container.animate({opacity:100}, options.container_fade_in_length);
				});

			} else if(options.content.substr(0,4) == 'http' && !options.external && !options.iframe) { // had trouble with urls starting with '//' on teh jsonp
				// foreign content - get via jsonp
				// jan 2013 - modifying so that it can handle sew feeds. there's some weird stuff going on here, so this is the only condition that supports it at this time
				$.ajax({
					url: options.content,
					dataType: 'jsonp',
					success: function(response) {
						response.HTML = response.HTML || response.content || false;
						if(response.HTML) {
							if (response.HTML == 'success') {
								response.HTML = "Success. You will be redirected";
								window.location.href = "/" + response.nextPath + "?" + response.query ;
							}
							mBox_container.find(".content").html(response.HTML);
							mBox.jog_boxes(false);
							mBox_container.animate({opacity:100}, options.container_fade_in_length);
						}
						if(response.headStuff) $('head').append(response.headStuff);
					}
				});

			} else if (options.content.substr(0, 4) == 'http' && options.external) {
				// external website contents
				oink = this;
				$.getScript('/bassjs/jquery.xdomainajax.js', function () {
					var pink = oink;
					var a = document.createElement('a'); a.href = options.content; pink.externalSite = a.hostname;
					pink.externalPath = options.content.substr(0, options.content.lastIndexOf('/'));
					console.log(pink.externalSite, pink.externalPath);
					$.ajax({
						url: options.content,
						dataType: '',
						type: 'get',
						success: function(response) {
							if(response.responseText) {
								var crownUrl = function (i, value) { // make an absolutist of our URL
									if (!value) {
										return value;
									}

									if (value.substr(0, 4) == 'http') {
										// fully qualified
										return value;
									}
									else if (value.substr(0, 1) == '/') {
										// absolute
										return 'http://' + pink.externalSite + value;
									}
									else {
										// relative
										return 'http://' + pink.externalPath + '/' + value;
									}
								}
								// fully qualify urls
								var $responseHTML = $(response.responseText);
								$('img', $responseHTML).attr('src', crownUrl);
								$('a', $responseHTML).attr('href', crownUrl);
								$('link', $responseHTML).attr('href', crownUrl);

								mBox_container.find(".content").html($responseHTML);
								pink.jog_boxes(false);
								mBox_container.animate({opacity:100}, options.container_fade_in_length);
							}
						}
					});
				});

			} else if (options.iframe) {
				// iframe to pull in outside content
				var ifr = $('<iframe>').attr('src', options.content).attr('width', options.mBox_width).attr('height', options.mBox_height).attr('scrolling', 'no');
				mBox_container.find(".content").html(ifr);
				this.jog_boxes(false);
				mBox_container.animate({opacity:100}, options.container_fade_in_length);

			} else {
				// some HTML presumably.
				mBox_container.find(".content").html(options.content);
				this.jog_boxes(false);
				mBox_container.animate({opacity:100}, options.container_fade_in_length);
			}
		}
	},

	// set up presets like this:
	alert: function(text) {
		if(typeof text == 'array' || typeof text == 'object') text = '<p>' + text.join('</p><p>') + '</p>';
		this.open({
			content: text,
			width: 400,
			mBox_class: 'mBox_alert',
			overlay_click_closes: false,
			dismiss_button_text: 'Okay'
		});
	},

	confirm: function(text) {
		if(typeof text == 'array' || typeof text == 'object') text = text.join('<br />');
		this.open({
			content:text,
			overlay_click_closes: false,
			width: 400,
			mBox_class: 'mBox_confirm',
			affirm_button: {
				text: 'Yes, please',
				callback: function() { alert('replace this with whatever you want to have happen when the user agrees.'); }
			},
			dismiss_button_text: 'No way'
		});
	},

	wait: function() {
		this.open({
			mBox_width:176,
			overlay_click_closes: false,
			overlay_opacity: 0.9,
			overlay_color: 'white',
			overlay_fade_in_length: 500,
			container_fade_in_length: 500,
			mBox_class: 'mBox_wait',
			content: '<div style="height:96px; width:176px; background-repeat: no-repeat; background-image: url(http://images.shoptopia.com/ingress/images/radial-blur.png); padding-top:80px; text-align:center;"><img src="http://images.shoptopia.com/ingress/images/ingress-loader.gif"></div>'
		})
	},

	login: function (destination) {
		destination = destination || false;
		if (destination) {
			window.location.href = '/user/new/?start=login&destination=' + destination;
		} else {
			window.location.href = '/user/new/?start=login';
		}
	},

	register: function(destination) {
		destination = destination || false;
		if(destination) {
			window.location.href = '/user/new/?destination=' + destination;
		} else {
			window.location.href = '/user/new/?';
		}
	}

}

function get_ingress_url(type) {
	var type = type || 'login';
	window.ingressURL = window.ingressURL || false;
	if( ! window.ingressURL) {
		var temp = document.domain.split('.');
		var tld = temp.pop();
		var domain = temp.pop();
		// usehost?
		window.useHost = window.useHost || 'shoptopia.com';
		var useHost_index = window.location.search.indexOf('useHost=');
		if(useHost_index != -1) {
			// yup, useHost
			pairs = window.location.search.split('&');
			for(x in pairs) {
				kv = pairs[x].split('=');
				key = kv[0];
				value = kv[1];
				if(key == 'useHost') window.useHost = value;
			}
		}
		var temp = useHost.split('.');
		tld = temp[1];
		var subdomain = temp[0];
		window.ingressURL = 'http://' + subdomain + '.' + domain + '.' + tld;
	}

	var ingressURL = window.ingressURL + "/ingress/";
	ingressURL += '?'; //keep
	if(window.location.search.indexOf('v=1.5') != -1) {
		ingressURL += '&v=1.5';
	} else {
		ingressURL += '&v=1.4'; // default
	}
	switch(type) { // no change for login, which is default
		case 'register':
		case 'registration':
			ingressURL += '&register=1';
			break;
	}
	return ingressURL;
}
/*end mBox*/

/* cookie stuff */
function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else {
		var expires = "";
	}
	bits = document.domain.split('.');
	tld = bits.pop();
	cookieDomain = bits.pop() + '.' + tld;
	document.cookie = name+"="+value+expires+"; path=/; domain=." + cookieDomain;
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

/* end cookie stuff */



function friendBait(friendId) {
	if(typeof friendId == 'undefined') {
		alert("Sorry, you can only send messages to your friends.");
	} else {
		if(confirm("Sorry, you can only send messages to your friends. Would you like to send a friend request?")) {
			window.location.href = "/buddy/add/" + friendId;
		}
	}
}

/*
___      ___   __   __  _______  _______  _______  _______  _______
|   |    |   | |  | |  ||       ||       ||   _   ||  _    ||       |
|   |    |   | |  |_|  ||    ___||_     _||  |_|  || |_|   ||  _____|
|   |    |   | |       ||   |___   |   |  |       ||       || |_____
|   |___ |   | |       ||    ___|  |   |  |       ||  _   | |_____  |
|       ||   |  |     | |   |___   |   |  |   _   || |_|   | _____| |
|_______||___|   |___|  |_______|  |___|  |__| |__||_______||_______|
*/

ltOrder = [];

/* helper function that's roughly equivalent to, but a bit more useful than jQuery's "contains prefix" selector ([name|="value"]) */
function findPartialClassName (el, searchStr) {
	if (!searchStr || !el) {
		console.log('Undefined argument for findPartialClassName.');
		return null;
	}

	var DOMel = el.jquery ? el[0] : el;
	var classIndex = DOMel.className.indexOf(searchStr);

	if (classIndex == -1)
		return null;
	else
		return DOMel.className.substr(classIndex).split(' ')[0];
}

/* initialize liveTabs on document.ready */
$(function() {
	/* if a profiletable is present, ensure each table is set up correctly */
	/* first each is for multiple profile tables, if present, second each is for the rows in this profiletable */
	$('table.profileTable').each(function (){
		ltClasses = {}, /* objects offer a shortcut to storing only unique class keys */
		ltAppName = findPartialClassName($('div.bubble-wrpr'), 'tbl__').split('tbl__')[1]; /* gets the name of the table from the bubble-wrpr div */
		ltAppName = ltAppName.indexOf('mf_') == 0 ? ltAppName.substr(3) : ltAppName;

		$(this).find('tr').each(function () {
			var ltTabClass = findPartialClassName(this, 'liveTab'), /* finds liveTab classNames, even if there's another class after the liveTab class */
			ltParamClass = findPartialClassName(this, ltAppName); /* the individual class for that particular param */

			/* This logic stops work from being done on anything that doesn't have a liveTabs class. DO NOT COMMENT OUT */
			if (!ltTabClass || !ltParamClass)
				return true; /* continue */

			if (ltOrder.length)
				var ltTabClass = ltTabClass || ltOrder[ltOrder.length - 1];

			/* add parameter class names to live tab, with key being the class and the value being an array, making sure to make a new array, or push to an existing array */
			if (ltClasses[ltTabClass]) {
				ltClasses[ltTabClass].push(ltParamClass);
			}
			else {
				ltClasses[ltTabClass] = [ltParamClass];
				ltOrder.push(ltTabClass);
			}

			/* let's not confuse liveTabs */
			// $(this).removeClass(ltTabClass); // Causes the parameter classes to be removed from the tr.
		});

		/* now let's put each parameter into its respective livetab tbody tag */
		for (var l = 0, ll = ltOrder.length; l < ll; l++) {
			var ltParamClasses = ltClasses[ltOrder[l]],
			$ltTbEl = $('<tbody class="' + ltOrder[l] + '">');

			for (var ltPC = 0, ltPCC = ltParamClasses.length; ltPC < ltPCC; ltPC++)
				$ltTbEl.append($('.' + ltParamClasses[ltPC] + ':first', this));

			$(this).append($ltTbEl);
		}

		/* finally, let's remove the original profile table elements */
		var ltLastTbEl = $('<tbody>');
		$(this).find('tbody:first > tr').appendTo(ltLastTbEl);
		$(this).append(ltLastTbEl);
		$(this).find('tbody:first').remove();
	});

	/* run rest of livetabs code */
	liveTabs();
});

function liveTabs() { // init. runs once. // presumes that the first tab is default.
	var desiredTabName = false;
	var desiredTabIndex = 0;
	if(location.hash.length && location.hash.substr(0, 8) == '#liveTab') {  //helpful comments coming soon
		desiredTabName = location.hash.substr(8);
		if( ! isNaN(parseInt(desiredTabName))) {
			desiredTabIndex = parseInt(desiredTabName);
			desiredTabName = false;
		}
	} else {
		cookieSaysTabName = readCookie('selectedLiveTabName');
		if(cookieSaysTabName != null) desiredTabName = cookieSaysTabName;
	}
	var tabwrapper = $("<div class='tabwrapper liveTabs'><div class='tabs'><ul class='horzlist'></ul></div></div>"),
	liveTabDivs = $("div[class^='liveTab']"),
	liveTabTbodies = $("tbody[class^='liveTab']"),
	liveTabElementsFirstParent = liveTabDivs.length ? liveTabDivs.first().parent() : liveTabTbodies.first().parent().parent();

	window.liveTabElements = liveTabDivs.length ? liveTabDivs : liveTabTbodies;

	liveTabElementsFirstParent.prepend(tabwrapper);
	liveTabElements.each(function(index) {
		tabName = $(this).attr('class').substr(7);
		tabName = tabName.replace(/_/g, ' ');
		// alert(tabName);
		li = $("<li class='liveTabsLI' id='" + $(this).attr('class') + "'><a href='javascript: void(0);'><span></span>" + tabName + "</a></li>");
		li.click(function(e) { liveTabsShow(e); liveTabIndex = $.inArray(e.target.parentNode.id, ltOrder); liveTabButton(0); });
		if(index == desiredTabIndex) {
			li.addClass('current');
		} else {
			$(this).css('display', 'none');
		}
		tabwrapper.find('ul').append(li);

		/* prev/next buttons, runs only once */
		if (index == 0) {
			$('#submit').before('<input class="liveTabsPrev genericButton" data-role="none" type="button" style="display:inline-block;" value="<< Prev">');
			$('.liveTabsPrev').click(function () { liveTabsShow({target: document.getElementById(liveTabButton(-1 ))}); });
			$('#submit').after('<input class="liveTabsNext genericButton" data-role="none" type="button" style="display:inline-block;" value="Next >>">');
			$('.liveTabsNext').click(function () { liveTabsShow({target: document.getElementById(liveTabButton( 1 ))}); });
			liveTabButton(0);
		}
	});
	if(desiredTabName) {
		$("li.liveTabsLI").each(function(index) { // go through each li.
			if($(this).text() == desiredTabName.replace(/_/g, ' ')) $(this).click();
		});
	}
}

function liveTabsShow(e) {
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
	var selectedTabName = $(targ).text();
	// console.log(targ);
	liveTabElements.each(function(index) { // go through each 'tab' div
		if($(this).prop('class').substr(7) == selectedTabName.replace(/[\s]+/g, '_')) {
			$(this).show(400);
		} else {
			$(this).hide(400);
		}
	});
	$("li.liveTabsLI").each(function(index) { // go through each tab
		if($(this).text() == selectedTabName) {
			$(this).addClass('current');
		} else {
			$(this).removeClass('current');
		}
	});
	//set a cookie for a few minutes that will restore this tab if they come back hre
	createCookie('selectedLiveTabName', selectedTabName, 0.005);
}

var liveTabIndex = 0;

function liveTabButton (incr) {
	var newLiveTabIndex = (liveTabIndex + incr) % ltOrder.length;
	liveTabIndex = newLiveTabIndex;

	$('.liveTabsPrev, .liveTabsNext').show();

	if (liveTabIndex == 0) {
		$('.liveTabsPrev').hide();
	}

	if (liveTabIndex == ltOrder.length - 1) {
		$('.liveTabsNext').hide();
	}

	return ltOrder[liveTabIndex];
}


$(document).ready(function(){
	var filterTabwrapper = []; // set as arrays to handle mulitple tab filter sets
	var currentFilterTab = []; // set as arrays to handle mulitple tab filter sets
	var filterTabs = []; // keep track of tabs

	// Create Tabs and Hide Content
	$("div[class^='filterGroup-']").each(function(index) {
		classArray = $(this).attr('class').split(' ');
		filterNames = classArray[0].split('_');
		if(!currentFilterTab[filterNames[0]]) {
			filterTabwrapper[filterNames[0]] = $("<div class='tabwrapper filterTabs'><div class='tabs'><ul class='horzlist'></ul></div></div>");
			$("div[class^='"+filterNames[0]+"']").first().before(filterTabwrapper[filterNames[0]]);
			currentFilterTab[filterNames[0]] = classArray[0];
		}
		tabName = filterNames[1].replace(/-/g,' ');
		filterTabs.push(filterNames[0]+"/"+filterNames[1]);
		li = $("<li class='"+filterNames[0]+"'><a class='filterTabsLink' id='"+classArray[0]+"' href='javascript: void(0);'><span></span>" + tabName + "</a></li>");
		if(currentFilterTab[filterNames[0]] == classArray[0]) {
			if(jQuery.inArray(filterNames[0]+"/"+filterNames[1],filterTabs)==0) li.addClass('current');
		} else {
			$(this).css('display', 'none');
		}
		// Detect ActiveFilterGroup Class
		if($(this).hasClass('ActiveFilterGroup')) {
			$("."+filterNames[0]).each(function(index) {
				$(this).removeClass('current');
			})
			$("div[class^='"+filterNames[0]+"']").each(function(index) {
				$(this).hide();
			})
			li.addClass('current');
			$(this).show();
		}
		filterTabwrapper[filterNames[0]].find('ul').append(li);
	})

	// On Click Switch Tabs and Show Content
	$(".filterTabsLink").click(function(){
		var selectedTab = $(this).attr('id');
		filterNames = selectedTab.split('_');
		$("div[class^='"+filterNames[0]+"']").each(function(index) {
			classArray = $(this).attr('class').split(' ');
			if(classArray[0] == selectedTab) {
				$(this).fadeIn(750);
			} else {
				$(this).hide();
			}
		})
		$("."+filterNames[0]).each(function(index) {
			$(this).removeClass('current');
		})
		$(this).parent().addClass('current');
	})

})

// --- PARAMETER ROLL OVER POP UPs --- //
$(document).ready(function() {
	$("div[class*='roll-']").each(function(index) {
		classArray = $(this).attr('class').split(' ');
		$.each(classArray, function(index,value) {
			if(value!='' && value!='parameterRollover' && value.substr(-7)!="content" && value.substr(0,5)=="roll-") {
				$('div.'+value).mouseover(function(event){
					$('div.'+value+'-content').show();
					return false;
				});
				$('div.'+value).mouseout(function(event){
					$('div.'+value+'-content').hide();
					return false;
				});
				$('div.'+value+'-content').mouseover(function(event){
					$('div.'+value+'-content').show();
					return false;
				});
				$('div.'+value+'-content').mouseout(function(event){
					$('div.'+value+'-content').hide();
					return false;
				});
			}
		})
	})
});



function listNewToggle(that) {
	$(that).closest('div.cnt-bdy').find('.listNewDisplayToggle').toggle('slow');
}




/*global comment submission - will submit the data, then runs a themed callback */
$(function() {
	$(".commentSubmissionButton").click(function(e) { submitComment(e); });
});
function submitComment(e) {
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug

	targ = $(targ);

	cntbdy = targ.closest('div.cnt-bdy');

	//set autoSub stuff
	autoSubName = 'autosubcheckboxnotchecked';
	autoSub = cntbdy.find('label.autoSubscribeCheckbox input');
	if(typeof autoSub != 'undefined' && autoSub.attr('checked')) {
		autoSubName = autoSub.attr('name');
	}

	textareaElement = cntbdy.find('textarea');
	comment = textareaElement.val();

	if(comment.length < 2) return;

	//disable the button so that there are no double submits
	targ.unbind();

	themeName = targ.attr('data-theme-name');
	if (themeName == 'shoptopia3.0') themeName='shoptopia3_0';

	preCallback = false;
	postCallback = false;
	eval("if(typeof " + themeName + "_preCommentSubmission == typeof Function) preCallback = " + themeName + "_preCommentSubmission;");
	eval("if(typeof " + themeName + "_postCommentSubmission == typeof Function) postCallback = " + themeName + "_postCommentSubmission;");

	if(typeof preCallback == typeof Function) preCallback(cntbdy);

	bassPath = textareaElement.closest('form').attr('action');
	$.get(
		bassPath,
		{'ajax':1, 'comment':comment, autoSubName:autoSubName},
		function(data){
			if(typeof postCallback == typeof Function) {
				newComment = $(data.replace(/<!--[^>]+-->/g, '').replace(/div>[\s]+<div/g, 'div><div'));
				postCallback(newComment, cntbdy);
			}
			cntbdy.find('textarea').val('');
			targ.click(function(e) { submitComment(e); });

			//increment comment counts ... eventually this should be it's own function and we'll need comment subject ids
			$(".commentCount").each(function() {
				newCount = parseInt($(this).html()) + 1;
				if(newCount != 1) { // this is english-biased
					unit = $(this).attr('data-unit-plural');
				} else {
					unit = $(this).attr('data-unit-singular');
				}
				$(this).html(newCount + ' ' + unit);
			})
	});

}

function filterByStore(page,sid) {
	if(sid!='-- by store --') {
		window.location = "/"+page+"?sid="+sid;
	} else {
		window.location = "/"+page;
	}
}

/* from fileupload.js */

function checkPastedURLforImageUpload(e) {
	var targ;
	if (!e) var e = window.event;
	if (e.target) targ = e.target;
	else if (e.srcElement) targ = e.srcElement;
	if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
	url = targ.value;
	if(url.indexOf('facebook.com') != -1) {
		alert("Sorry, photos on Facebook are private, so we can not access them. To use them, download them to your computer and then upload the file.");
		targ.value = "";
	}
}

function fileUploadClearNode(id, str) {
	var temp=document.getElementById(id);
	if(temp != null) {
		temp.parentNode.removeChild(temp);
		temp.innerHTML = str;
	}
}

function fileUploadSetMode(fileUploadId, mode) {
	//console.log("new mode: " + mode);
	//set current
	if(typeof fileUploadOriginalURL[fileUploadId] != 'undefined' && fileUploadOriginalURL[fileUploadId] != '') {
		//console.log("we have a current");
		var temp=document.getElementById('current' + fileUploadId);
		if(temp) {
			while (temp.hasChildNodes()) temp.removeChild(temp.firstChild);
			temp.innerHTML = "Keep Current";
			temp.onclick="";
			temp.className = 'fileUploadButton';
			if(mode == 'current') {
				temp.className = 'fileUploadButton active';

				// restore hidden
				var hidden = document.createElement('input');
				hidden.type = 'hidden';
				hidden.name = fileUploadFieldNames[fileUploadId];
				hidden.value = fileUploadOriginalURL[fileUploadId];
				temp.appendChild(hidden);

				// reset the preview
				fileUploadUpdatePreview(fileUploadId, fileUploadOriginalURL[fileUploadId], fileUploadTableNames[fileUploadId])
			} else {
				temp.onclick = function() { fileUploadSetMode(fileUploadId, 'current')};
			}
		}
	}

	//set delete
	if(typeof fileUploadOriginalURL[fileUploadId] != 'undefined' && fileUploadOriginalURL[fileUploadId] != '') {
		//console.log("we have a delete");
		var temp=document.getElementById('delete' + fileUploadId);
		if(temp) {
			while (temp.hasChildNodes()) temp.removeChild(temp.firstChild);
			temp.innerHTML = "Delete This Photo";
			temp.onclick="";
			temp.className = 'fileUploadButton';
			if(mode == 'delete') {
				temp.className = 'fileUploadButton active';
				// restore hidden
				var hidden = document.createElement('input');
				hidden.type = 'hidden';
				hidden.name = fileUploadFieldNames[fileUploadId];
				hidden.value = '';
				temp.appendChild(hidden);

				// reset the preview
				fileUploadUpdatePreview(fileUploadId, '', fileUploadTableNames[fileUploadId])
			} else {
				temp.onclick = function() { fileUploadSetMode(fileUploadId, 'delete')};
			}
		}
	}

	//set pasteURL
	var temp=document.getElementById('paste' + fileUploadId);
	//console.log("we have a paste");
	if(mode != 'paste') {
		//gracefully hide the elements before deleting
		jQuery('#' + fileUploadFieldNames[fileUploadId] + 'TextBox').animate( { marginBottom:'-30px' } , 500 );
		var t=setTimeout("document.getElementById('paste" + fileUploadId + "').innerHTML = 'Paste Any URL';", 510);
		temp.className = 'fileUploadButton';
		temp.onclick = function() { fileUploadSetMode(fileUploadId, 'paste'); };
	} else {
		temp.innerHTML = 'Paste Any URL<br />';
		temp.onclick="";
		temp.onchange = function(e) { checkPastedURLforImageUpload(e); }
		temp.className = 'fileUploadButton active';
		//restore the preview image
		fileUploadUpdatePreview(fileUploadId, fileUploadURL[fileUploadId], fileUploadTableNames[fileUploadId]);


		//restore input
		var textInput = document.createElement('input');
		textInput.type = 'text';
		textInput.name = fileUploadFieldNames[fileUploadId];
		textInput.value = fileUploadURL[fileUploadId];
		textInput.id = fileUploadFieldNames[fileUploadId] + 'TextBox';
		textInput.style.marginBottom = '-30px';
		textInput.style.display = 'block';
		textInput.onkeyup = function() { fileUploadUpdatePreview(fileUploadId, this.value, fileUploadTableNames[fileUploadId])};

		temp.appendChild(textInput);

		jQuery('#' + fileUploadFieldNames[fileUploadId] + 'TextBox').animate( { marginBottom:'0px' } , 500 );

	}
	//set upload
	var supportFileField = document.createElement("input");
	supportFileField.setAttribute("type", "file");
	supportFileField = supportFileField.disabled === false;
	//supportFileField = false;
	if(supportFileField) {
		//console.log("we have an upload");
		var temp=document.getElementById('upload' + fileUploadId);
		if(mode!='upload') {
			temp.onclick = function() { fileUploadSetMode(fileUploadId, 'upload')};
			temp.className = 'fileUploadButton';
			//gracefully
			jQuery('#' + fileUploadFieldNames[fileUploadId] + 'fileUpload').animate( { marginBottom:'-30px' } , 500 );
			var t=setTimeout("document.getElementById('upload" + fileUploadId + "').innerHTML = 'Upload File (2MB limit)<br />'", 510);
			//gracelessly
			//while (temp.hasChildNodes()) temp.removeChild(temp.firstChild);
			//temp.innerHTML = 'Upload File (2MB limit)<br />';

			//  setTimeout("fileUploadClearNode('" + fileUploadFieldNames[fileUploadId] + "fileUpload', 'Upload File<br />');", 500);
			//if(document.getElementById(fileUploadFieldNames[fileUploadId] + 'fileUpload') != null) {
			//  jQuery('#' + fileUploadFieldNames[fileUploadId] + 'fileUpload').animate( { opacity:0 }, 500);
			//  setTimeout("fileUploadClearNode('" + fileUploadFieldNames[fileUploadId] + "fileUpload', 'Upload File<br />');", 500);
			//} else {
			//  temp.innerHTML = 'Upload File<br />';
			//}
		} else {
			temp.innerHTML = 'Upload File (2MB limit)';
			temp.onclick = "";
			temp.className = 'fileUploadButton active';
			//kill the preview image
			fileUploadUpdatePreview(fileUploadId, '', fileUploadTableNames[fileUploadId]);

			//restore inputs
			var textInput = document.createElement('input');
			textInput.type = 'file';
			textInput.name = fileUploadFieldNames[fileUploadId] + 'fileUpload';
			textInput.id = fileUploadFieldNames[fileUploadId] + 'fileUpload';
			textInput.style.marginBottom = '-30px';
			textInput.style.display = 'block';
			textInput.onkeyup = function() { fileUploadUpdatePreview(fileUploadId, this.value, fileUploadTableNames[fileUploadId])};

			var fileUploadHidden = document.createElement('input');
			fileUploadHidden.type = 'hidden';
			fileUploadHidden.name = fileUploadFieldNames[fileUploadId];
			fileUploadHidden.value = 'fileUpload';

			temp.appendChild(textInput);
			temp.appendChild(fileUploadHidden);

			jQuery('#' + fileUploadFieldNames[fileUploadId] + 'fileUpload').animate( { marginBottom:'0px' } , 500 );

		}
	}
}

function fileUploadUpdatePreview(fileUploadId, url, tableName) {
	if(url != "") {
		if(tableName != "" && url.substring(0,7) != 'http://') url = '/files/' + tableName + '/' + url;
		var temp = new Image();
		temp.src = url;
		if(temp.complete) {
			fileUploadResetPreview(fileUploadId, url, temp.width, temp.height);
		} else {
			temp.onload = function(){fileUploadResetPreview(fileUploadId, url, temp.width, temp.height)};
		}
	} else {
		fileUploadResetPreview(fileUploadId, '', 85, 85);
	}
}

function fileUploadResetPreview(fileUploadId, url, width, height) {
	previewDiv = document.getElementById('fileUploadPreview' + fileUploadId);
	if(typeof url != 'string' || url == "") {
		url = 'http://images.shoptopia.com/files/images/placeholderImage.png';
	}
	if(width == "" || width == 0) {
		var temp = new Image();
		temp.src = url;
		height = temp.height;
		width = temp.width;
	}
	//clear out the kids, first.

	if(previewDiv)
		while (previewDiv.hasChildNodes()) previewDiv.removeChild(previewDiv.firstChild);

	if(height > width) {
		longestDimension = 'height';
		shortestDimension = 'width';
	} else {
		longestDimension = 'width';
		shortestDimension = 'height';
	}
	eval(shortestDimension + " = 85 / " + longestDimension + " * " + shortestDimension + ";");
	eval(longestDimension + " = 85;");

	previewImage = document.createElement('img');
	//previewImage.width = width;
	//previewImage.height = height;
	previewImage.src = url;
	previewImage.setAttribute('width', width, 0); // IE sucks!
	previewImage.setAttribute('height', height, 0); // IE sucks!

	if (previewDiv)
		previewDiv.appendChild(previewImage);
}
/*end fileupload.js */

// JS specifically for the Project Style 2012 Full Contestant View in order to keep the YouTube iframe from obscuring photos.
$(document).ready(function(){
	$("a.cboxElement").click(function() {$('.mf_projectStyleContestant___contestantVideo').css('visibility', 'hidden')});
	$("#cboxOverlay, #cboxClose").click(function() {$('.mf_projectStyleContestant___contestantVideo').css('visibility', 'visible')});
	$(document).keyup(function(evt) {if(evt.keyCode == 27) {$('.mf_projectStyleContestant___contestantVideo').css('visibility', 'visible');}});
});
// End PS12 Full Contestant View JS




/* now without tracking!!!!! */



/* begin baiter */
var baiter = {
	default_mBox_options: {
		content: "Sorry, your account does not qualify to continue.",
		width: 400,
		mBox_class: 'mBox_alert',
		overlay_click_closes: false,
	},

	loginBait_standard_options: {
		content: "You must be logged in to continue.",
		misc_buttons: [{
			misc_button_text:'Back',
			callback: function(){mBox.close()},
			// title: 'Nevermind.',
			class_attribute: 'just_text'
			},{
				misc_button_text:'Register',
				callback: function(){mBox.register()},
				title: 'Register a new account.'
			},{
				misc_button_text:'Log In',
				callback: function(){mBox.login();},
				title: 'Log in with your existing account email address.'
		}]
	},

	confirmBait_standard_options: {
		content: "You must confirm your email address to continue.",
		dismiss_button_text: 'Back'
		// link to profile page?
	},

	jailBait_standard_options: {
		content: "You must be over 18 to continue.",
		dismiss_button_text: "Back"
	},

	create_click_handler: function(arg_options) {
		var options = {}; // the options we'll be passing
		for(x in this.default_mBox_options) options[x] = this.default_mBox_options[x]; // get a copy of the standard
		if(typeof arg_options == 'object') { // if something was supplied, copy the elements of it to our options
			for(x in arg_options) options[x] = arg_options[x];
		}

		return function(e) {
			e = e || '';
			if(e.preventDefault) e.preventDefault();
			mBox.open(options);
		};
	},

	jog:function(options) {
		options = options || {};
		options.is_logged_in = options.is_logged_in || false;
		options.is_confirmed = options.is_confirmed || false;
		options.is_18 = options.is_18 || false;

		if(options.is_logged_in) {
			// clear away any baiter click handlers & restore any previously stowed-away click handlers - for loginBaits
			$('.loginBait').each(function(){baiter.restore_unchallenged_click_handler($(this))});

			// being adult and being confirmed are not mutually exclusive. until further notice.

			if(options.is_confirmed && options.is_18) {
				// clear away any baiter click handlers & restore any stowed handlers.
				$('.confirmBait, .jailBait').each(function(){baiter.restore_unchallenged_click_handler($(this))});
			} else if(options.is_confirmed && ! options.is_18) {
				// clear away any baiter click handlers & restore any stowed handlers.
				$('.confirmBait').each(function(){baiter.restore_unchallenged_click_handler($(this))});
				// ... not of age. all appropriate baits will be applied.
				$('.jailBait').each(function(){
					baiter.store_unchallenged_click_handler($(this));
					baiter.apply_click_handler('jail', $(this));
				});
			} else if( ! options.is_confirmed && options.is_18) {
				// clear away any baiter click handlers & restore any stowed handlers.
				$('.jailBait').each(function(){baiter.restore_unchallenged_click_handler($(this))});
				// ... not of age. all appropriate baits will be applied.
				$('.confirmBait').each(function(){
					baiter.store_unchallenged_click_handler($(this));
					baiter.apply_click_handler('confirm', $(this));
				});
			} else {
				// ... not of age, not confirmed. apply the confirm Bait. - will prob save the user some time.
				$('.confirmBait, .jailBait').each(function(){
					baiter.store_unchallenged_click_handler($(this));
					if($(this).hasClass('confirmBait') && $(this).hasClass('jailBait')) {
						baiter.apply_click_handler('confirm', $(this));
					} else if($(this).hasClass('confirmBait')) {
						baiter.apply_click_handler('confirm', $(this));
					} else {
						baiter.apply_click_handler('jail', $(this));
					}

				});
			}

		} else {
			// if not logged in, all challenges are failed, and the appropriate loginBait will be applied.
			$('.loginBait, .confirmBait, .jailBait').each(function(){
				baiter.store_unchallenged_click_handler($(this));
				baiter.apply_click_handler('login', $(this));
			});
		}
	},

	apply_click_handler: function(challenge_type, element) {
		// does it have it's own custom click handler? if it did, it would be named {challenge_type}Bait_click_handler_{function name}
		challenge_type = challenge_type || 'login';
		if(element instanceof jQuery || (element.bind && typeof element.bind == 'function')) { // the instanceof check by itself was failing just after logging out. no one knows why.
			var bait_style = false;
			var bait_custom_handler_function_name = false;
			var click_handler = window['standard_' + challenge_type + 'Bait_click_handler']; // this will be the default - todo check if exists
			var temp = element.attr('class').split(' ');
			for(x in temp) {
				if(temp[x].indexOf('bait_style_') == 0) {
					bait_style = temp[x].substr(('bait_style_').length);
					bait_custom_handler_function_name = challenge_type + 'Bait_' + bait_style + '_click_handler';
					if(typeof window[bait_custom_handler_function_name] !== 'function') {
						bait_custom_handler_function_name = false;
					} else {
						break;
					}
				} else if(temp[x].indexOf(challenge_type + 'Bait_callback_') == 0) {
					bait_custom_handler_function_name = temp[x].substr((challenge_type + 'Bait_callback_').length);
					if(typeof window[bait_custom_handler_function_name] !== 'function') {
						bait_custom_handler_function_name = false;
					} else {
						break;
					}
				}
			}
			if(typeof window[bait_custom_handler_function_name] === 'function') {
				// use custom
				click_handler = window[bait_custom_handler_function_name];
			} else {
				// use standard  (already set above)
			}
			element.bind('click.baiter', click_handler); // this is the standard click (also namespaced)
		} else {
			console.log('non-jquery element passed to apply_click_handler()');
		}
	},

	store_unchallenged_click_handler: function(element) {
		// now, for all elements, try to move a bound event into storage. please note that a properly made bait click handler has its own preventDefault.
		var data = element.data();
		if('events' in data && 'click' in data.events && ! 'baiter' in data.events) {
			for(x in data.events.click) {
				//console.log(data.events.click[x]);
				element.bind('baiter.click_storage', data.events.click[x].handler);
			}
		}
		element.unbind('click');

		// also the onclick attr - which will be converted form an onclick attr to a jq click if restored.
		if(element.attr('onclick')) {
			element.bind('baiter.click_storage', element.attr('onclick'));
			element.removeAttr('onclick');
		}

		// and it may be a link...
		if(element.is('a')) {
			// move the href to a data attr, set the href to return javascript void. actually, if the href is '#', we hate that.
			if(element.attr('href') && ! element.attr('baiter_storage_href')) {
				if(element.attr('href') != '#') element.attr('baiter_storage_href', element.attr('href'));
				element.attr('href', 'javascript: void(0);');
			}
		}
	},

	restore_unchallenged_click_handler: function(element) { // this method exists so that if a user's status changes, we can re-jog the page and restore any disabled clickabilities.
		element.unbind('click');
		var data = element.data();
		if('events' in data && 'baiter' in data.events) {
			for(x in data.events.baiter) {
				element.click(data.events.baiter[x].handler);
			}
		}
		// any onclick attributes were stored in the baiter namespace and restored as click bindings above

		// what about a link....
		if(element.is('a') && element.attr('baiter_storage_href')) {
			element.attr('href', element.attr('baiter_storage_href'));
		}
	},

	trigger: function(challenge_type, arg) {
		// sometimes you need to trigger a bait popup without haveing a click, or knowing which one it is....
		// so pass me a jquery dom element, or a bait_style_name (which would have to be pre-defined, anyway...)
		challenge_type = challenge_type || 'login';
		arg = arg || '';
		var bait_style_name = 'standard'; // this will be used at the end of the func no matter what. fill it with special desires.
		if(typeof arg == 'string') {
			bait_style_name = arg;
			// do we have a function of the name...
			temp = challenge_type + 'Bait_' + bait_style_name + '_click_handler';
			if(typeof window[temp] === 'function') return window[temp]();
			temp = 'standard_' + challenge_type + 'Bait_click_handler'
			if(typeof window[temp] === 'function') return window[temp]();
			return standard_loginBait_click_handler();  // fail silently to login bait

			// not a string, find the target.
		} else if(arg instanceof jQuery) {
			var target = arg;
		} else { // not a string? not a jquery element? assumed to be an event
			var target = $(arg.target);
		}
		// now from the target, find out if it has a special style or custom callback
		var bait_custom_handler_function_name;
		var temp = target.attr('class').split(' ');
		for(x in temp) {
			if(temp[x].indexOf('bait_style_') == 0) {
				bait_style = temp[x].substr(('bait_style_').length);
				bait_custom_handler_function_name = challenge_type + 'Bait_' + bait_style + '_click_handler';
				if(typeof window[bait_custom_handler_function_name] !== 'function') {
					bait_custom_handler_function_name = false;
				} else {
					break;
				}
			} else if(temp[x].indexOf(challenge_type + 'Bait_callback_') == 0) {
				bait_custom_handler_function_name = temp[x].substr((challenge_type + 'Bait_callback_').length);
				if(typeof window[bait_custom_handler_function_name] !== 'function') {
					bait_custom_handler_function_name = false;
				} else {
					break;
				}
			}
		}
		if(typeof window[bait_custom_handler_function_name] === 'function') {
			window[bait_custom_handler_function_name]();
		} else {
			window['standard_' + challenge_type + 'Bait_click_handler']();
		}
	}

}

var standard_loginBait_click_handler = baiter.create_click_handler(baiter.loginBait_standard_options); // create this once so that it doesn't need to be created each time. standard_loginBait_click_handler will always be the standard.
var standard_confirmBait_click_handler = function(e) {
	e.preventDefault();
	// to do go trigger a confirmation email
	baiter.create_click_handler(baiter.confirmBait_standard_options)(e);
}
var standard_jailBait_click_handler = baiter.create_click_handler(baiter.jailBait_standard_options);

/* end baiter */

/* begin quickConfig 2013 js */

$(function() {
	$(".quickConfigLink").mouseenter(function(e) { quickConfigShowLinks(e); });
	$(".quickConfigDiv, .quickConfigDiv2").mouseleave(function(e) { quickConfigHideLinks(e); });
});


function quickConfigHideLinks(e) {
	var newDivId = '' ;
	$('#' + e.currentTarget.id).hide();
}

function quickConfigShowLinks(e) {
	var newDivId = e.currentTarget.id + "Links";
	var countdown;
	$('#' + newDivId).show().hover(function() {
		clearTimeout(countdown);
	});
	countdown = setTimeout(function() {
		$('#' + newDivId).hide('slow');
		}, 2000);
}
