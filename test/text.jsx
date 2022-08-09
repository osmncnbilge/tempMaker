var scriptTitle = "Search for layers in proj and do...";

var myPalette = buildUI(this);

if (myPalette != null && myPalette instanceof Window) {
	myPalette.show();
	}

function buildUI (thisObject) {

if (thisObject instanceof Panel) {
	var myPalette = thisObject;
	} else { 
    var myPalette = new Window ("palette", scriptTitle, undefined, {resizeable:true});
	}

if (myPalette != null ) {
	
	var res =
	"Group { \
		orientation: 'column', \
		alignment: ['fill','fill'], \
		alignChildren: ['left','top'], \
		searchTxt: StaticText {text:'Search string:'}, \
		searchBox: EditText {alignment: ['fill','top']}, \
		searchProj: RadioButton {text:'Search entire project'}, \
		searchComps: RadioButton {text: 'Search selected comps only'},\
		searchBtn: Button {text:'Search', alignment: ['right','top']}, \
		}";
	
	myPalette.grp = myPalette.add(res);
	myPalette.layout.layout(true);
	myPalette.layout.resize();
	
	myPalette.grp.searchProj.value = true;
	myPalette.grp.searchBtn.onClick = function () {
		searchForLayers (myPalette);
		}
	
	myPalette.onResizing = myPalette.onRize = function () {this.layout.resize();}

	} //if (myPalette != null ) 
return myPalette;
} //function buildUI (thisObject) 

function searchForLayers (palObj) {
	var searchString = palObj.grp.searchBox.text;
	var searchProj = palObj.grp.searchProj.value;
	//alert(searchProj);
	
	if (searchString == "") {
		alert("Please enter a search string");
		return;
		}
	
	var compsArray = new Array();
	var myProj = app.project;
	if (searchProj) { //if searching whole proj
		for (var i=1; i <= myProj.numItems; i++) { // loop through all proj items
			if (myProj.item(i) instanceof CompItem) { //check to see if it is a comp
				compsArray[compsArray.length] = myProj.item(i);
				} //if (myProj.item(i) instanceof CompItem)
			}//for (var i=1; i <= myProj.numItems; i++) 
		} else { //if (searchProj)
			var projSelection = myProj.selection;
			if (projSelection.length == 0) {
				alert("Please select the comps you would like to search in the project panel");
				return;
				} //if (projSelection.length == 0)
			for (var i=0; i < projSelection.length; i++) {
				if (projSelection[i] instanceof CompItem) {
					compsArray[compsArray.length] = projSelection[i];
					} else {// if (projSelection[i] instanceof CompItem) 
						alert (projSelection[i].name + " is not a comp and will be skipped.");
						}
				}//	for (var i=0; i < projSelection.length; i++) 
			}//else (searchProj)
		
	if (compsArray.length == 0) { //check to make sure we have some comps
		alert("There are no comps in the project or no comps were selected");
		return;
		}
	
	var foundOne = false;
	var matchesObject =  new Object();
	for (var i=0; i < compsArray.length; i++ ) {
		var matchingLayersArray = new Array();
		var myComp = compsArray[i];
		for (var j=1; j <= myComp.numLayers; j++) {
			var myLayer = myComp.layer(j);
			if (myLayer.name.toLowerCase().match(searchString.toLowerCase())) {
				foundOne = true;
				matchingLayersArray[matchingLayersArray.length] = myLayer;
				}
			}//	for (var j=1; j <= myComp.numLayers; j++)
		if (matchingLayersArray.length != 0) { //we have at least 1 matching layer
			matchesObject[myComp.id] = {
				compName: myComp.name,
				compId: myComp.id,
				matchingLayers: matchingLayersArray
				} //matchesObject[myComp.id] 
			}// if (matchingLayersArray.length != 0)
		
		}//for (var i=0; i < compsArray.length; i++ )
	
	if (!foundOne) {
		alert("No layers matching: " + searchString + " were found");
		return;
		}
	
	var myWin = new Window ("palette", "Matching Layers", undefined, {resizeable:true});
	
	if (myWin != null) {
		
		var res = 
		"Group { \
		orientation: 'column', \
		alignment: ['fill','fill'], \
		alignChildren: ['left','top'], \
			layersGrp: Group { \
			alignment: ['fill','fill'], \
			alignChildren: ['fill','fill'], \
			layersTree: TreeView {} \
			} \
			optionsGrp: Group { \
			orientation: 'column', \
			alignment: ['fill','bottom'], \
			alignChildren: ['fill','bottom'], \
				deleteGrp: Group { \
					deleteCheck: Checkbox {text:'Delete'} \
				} \
				enableGrp: Group { \
					enableCheck: Checkbox {text:'Enable'} \
					disableCheck: Checkbox {text:'Disable'} \
				} \
				renameGrp: Group { \
					renameCheck: Checkbox {text:'Rename',alignment: ['left','top']} \
					renameString: EditText {alignment: ['fill','top'], enabled:false} \
				} \
				propertyGrp: Group { \
					propertyCheck: Checkbox {text:'Property',alignment: ['left','top']} \
					propertyString: EditText {alignment: ['fill','top'], enabled:false} \
					propertyLoadBtn: Button {text: 'Load',alignment: ['right','top'], enabled:false} \
				} \
				newValueGrp: Group { \
					newValueTxt: StaticText {text:'New value:',alignment: ['left','top']} \
					newValue0: EditText {alignment: ['fill','top']}, \
					newValue1: EditText {alignment: ['fill','top']}, \
					newValue2: EditText {alignment: ['fill','top']}, \
					newValue3: EditText {alignment: ['fill','top']}, \
					newValueUnits: StaticText {text:'units',alignment: ['right','top']} \
				} \
				doItGrp: Group { \
					doItBtn: Button {text: 'Do It', alignment: ['right','top']} \
				} \
			} \
		}"; 
		
		myWin.grp = myWin.add(res);
		myWin.layout.layout(true);
		myWin.layout.resize();
		myWin.show();
		if (palObj != null && palObj instanceof Window) {
		palObj.hide();
		}
		
		populateTree (myWin, matchesObject);
		
		myWin.grp.optionsGrp.newValueGrp.visible = false;
		myWin.grp.optionsGrp.newValueGrp.enabled = false;
		myWin.grp.optionsGrp.newValueGrp.newValueUnits.minimumSize.width = 50;
		
		myWin.onClose = function () {
			if (palObj != null && palObj instanceof Window) {
			palObj.show();
			}
			}
		myWin.onResizing = myWin.Resize = function () {this.layout.resize();}  //there was a typo on this line in the live class recording.  It said myWin.Rize when it should be myWin.Resize
		
		var propertyObject;
		myWin.grp.optionsGrp.propertyGrp.propertyLoadBtn.onClick = function () {
			propertyObject = getSelectedProperty ();
			if (propertyObject != false) {
							myWin.grp.optionsGrp.propertyGrp.propertyString.text = propertyObject.property.parentProperty.name + ":" + propertyObject.property.name;
				}// if (propertyObject != false)
			for (var h=0; h < 4; h++) {
				myWin.grp.optionsGrp.newValueGrp["newValue"+h].enabled = false;
				myWin.grp.optionsGrp.newValueGrp["newValue"+h].visible = false;
				myWin.grp.optionsGrp.newValueGrp["newValue"+h].text = "";
				myWin.grp.optionsGrp.newValueGrp.newValueUnits.text = "";
				}
			if (propertyObject.property.value.length != undefined) {
				for (var i=0; i < propertyObject.property.value.length; i++) {
					myWin.grp.optionsGrp.newValueGrp.enabled = true;
					myWin.grp.optionsGrp.newValueGrp["newValue"+i].enabled = true;
					myWin.grp.optionsGrp.newValueGrp["newValue"+i].visible = true;
					myWin.grp.optionsGrp.newValueGrp["newValue"+i].text = propertyObject.property.value[i];
					} //for (var i=0; i < propertyObject.property.value.length; i++)
				} else { //if (propertyObject.property.value.length != undefined)
					myWin.grp.optionsGrp.newValueGrp.enabled = true;
					myWin.grp.optionsGrp.newValueGrp.newValue0.text = propertyObject.property.value;
					myWin.grp.optionsGrp.newValueGrp.newValue0.enabled = true;
					myWin.grp.optionsGrp.newValueGrp.newValue0.visible = true;
					}// else (propertyObject.property.value.length != undefined)
			myWin.grp.optionsGrp.newValueGrp.newValueUnits.text = propertyObject.property.unitsText;
			} 
		
		myWin.grp.optionsGrp.deleteGrp.deleteCheck.onClick = function () {
				myWin.grp.optionsGrp.enableGrp.enabled = !this.value;
				myWin.grp.optionsGrp.renameGrp.enabled = !this.value;
				myWin.grp.optionsGrp.propertyGrp.enabled = !this.value;
				myWin.grp.optionsGrp.newValueGrp.enabled = !this.value;
			}
		myWin.grp.optionsGrp.renameGrp.renameCheck.onClick = function () {
			this.parent.renameString.enabled = this.value;
			}
		myWin.grp.optionsGrp.propertyGrp.propertyCheck.onClick = function () {
			myWin.grp.optionsGrp.newValueGrp.visible = this.value;
			myWin.grp.optionsGrp.propertyGrp.propertyString.enabled = this.value;
			myWin.grp.optionsGrp.propertyGrp.propertyLoadBtn.enabled = this.value;
			}
		
		myWin.grp.optionsGrp.doItGrp.doItBtn.onClick = function () {
			if (myWin.grp.optionsGrp.propertyGrp.propertyCheck.value && propertyObject ==undefined) {
				alert("Please load a property first");
				return;
				}
			processLayers (myWin, matchesObject, propertyObject);
			
			}//myWin.grp.optionsGrp.doItGrp.doItBtn.onClick = function () 
		
		} //if (myWin != null)
	} //function searchForLayer ()

function processLayers (winObj, matchesObject, propertyObject) {
	app.beginUndoGroup(scriptTitle);
	var doDelete = winObj.grp.optionsGrp.deleteGrp.deleteCheck.value;
	var doEnable = winObj.grp.optionsGrp.enableGrp.enableCheck.value;
	var doDisable = winObj.grp.optionsGrp.enableGrp.disableCheck.value;
	var doRename = winObj.grp.optionsGrp.renameGrp.renameCheck.value;
	var renameString = winObj.grp.optionsGrp.renameGrp.renameString.text;
	var doProperty = winObj.grp.optionsGrp.propertyGrp.propertyCheck.value;
	var propertyString = winObj.grp.optionsGrp.propertyGrp.propertyString.text;
	var newValue = new Array();
	for (var h=0; h < 4; h++) {
		var myValue = parseFloat(winObj.grp.optionsGrp.newValueGrp["newValue"+h].text);
		if (!isNaN(myValue)){
			newValue[h] = myValue;
			}//if (!isNaN(parseFloat(winObj.grp.optionsGrp.newValueGrp["newValue"+i].text)))
		}
	//alert(newValue);
	for (var i in matchesObject) {
		for (var j=0; j <  matchesObject[i].matchingLayers.length; j++) {
			var myLayer = matchesObject[i].matchingLayers[j];
			//alert(myLayer.name);
			if (doEnable) {
				try {myLayer.enabled= true;}
				catch (err) {alert(err);}
				}
			if (doDisable) {
				try {myLayer.enabled= false;}
				catch (err) {alert(err);}
				}
			if (doRename) {
				try {myLayer.name = renameString;}
				catch (err) {alert(err);}
				}
			if (doProperty) {
				var myProperty = myLayer;
				for (var k=0; k < propertyObject.propertyChain.length; k++) {
					if (myProperty != null) {
						myProperty = myProperty.property(propertyObject.propertyChain[k]);
						}  else {//if (myProperty != null)
							alert("Property: " + myProperty.name + " is missing from layer: " + myLayer.name);
							return;
							}
					} //	for (var k=0; k < propertyObject.propertyChain.length; k++)
				if (myProperty.value == undefined) {
					alert(myProperty.name + " value is undefined");
					return;
					} else { //if (myProperty.value == undefined)
						try {myProperty.setValue(newValue);}
						catch (err) {alert(err);}
						} //else  (myProperty.value == undefined
				}// if (doProperty)
			if (doDelete) {
				try {myLayer.remove();}
				catch (err) {alert(err);}
				}
			}// for (var j=0; j <  matchesObject[i].matchingLayers.length; j++)
		}//for (var i in matchesObject)
	winObj.close();
	}//function processLayers (myWinObj, matchesObject, propertyObject) 

function getSelectedProperty () {
	if (app.project.activeItem == null || app.project.activeItem.selectedLayers.length == 0) {
			alert( "Please select a property in the timeline panel");
			return false;
			}
		if (app.project.activeItem.selectedLayers.length > 1) {
			alert("Please select only one property in the timeline panel");
			return false;
			}
	var myLayer = app.project.activeItem.selectedLayers[0];
	
	if (myLayer == null) {
		alert( "Please select a property in the timeline panel");
		return false;
		}
	var myProperty = myLayer.selectedProperties;
	
	if (myProperty.length > 2) {
		alert("Please only select one property");
		return false;
		}
	if (myProperty.length == 2) {
		if (myProperty[0].propertyDepth > myProperty[1].propertyDepth) {
			myProperty =  myProperty[0];
			} else {
				myProperty =  myProperty[1];
				}
		} else {//if (myProperty.length == 2) 
			myProperty =  myProperty[0];
			}
	
	if (myProperty == null || myProperty.value == undefined) {
		alert("You need to select a property with a value");
		return false;
		}
	
	var propertyObject = new Object();
	propertyObject.property = myProperty;
	var propertyChain = [myProperty.matchName];  //create a new array and put the property object as the first item
	while (myProperty.propertyDepth > 1) {
		propertyChain.unshift(myProperty.parentProperty.matchName);
		myProperty = myProperty.parentProperty;
		} //while (myProperty.propertyDepth > 0) 
	propertyObject.propertyChain = propertyChain;
	
return propertyObject;
	
	} //function getSelectedProperty () 

function populateTree (myWinObj, matchesObject) {
	var layerTree = myWinObj.grp.layersGrp.layersTree;
	for (var i in matchesObject) {
		var compNode = layerTree.add("node", matchesObject[i].compName);
		for (var j=0; j <  matchesObject[i].matchingLayers.length; j++) {
			compNode.add("item", "Layer " + matchesObject[i].matchingLayers[j].index + ": " + matchesObject[i].matchingLayers[j].name);
			}// for (var j=0; j <  matchesObject[i].matchingLayers.length; j++)
		}//for (var i in matchesObject)
	}//function populateTree (myWinObj, matchesObject) {
