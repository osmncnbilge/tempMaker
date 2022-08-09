var prj = app.project;
var itemsCount = prj.items.length;

for(var i=1; i<=itemsCount; i++){
     var curItem = prj.item(i);
     if (curItem instanceof CompItem && curItem.name == "_MAIN_COMP") {    
          var mainComp = curItem;
          break;
     } else {
          alert("_MAIN_COMP bulunamadı.");
          break;
     }
}


var maskLayer = mainComp.layers.addSolid([0,0,0], "Mask", mainComp.width, mainComp.height, mainComp.pixelAspect);
maskLayer.enabled = false;
for (var j = 1; j <= mainComp.layers.length; j++) {
    if (mainComp.layer(j).name != "Mask") {
        mainComp.layer(j).locked = true;
    }
}


//maskLayer.remove();



/*
var curComp = app.project.activeItem;
var curLayer = curComp.layer("White Solid 1");
var curMaskAtom = curLayer.property("ADBE Mask Parade").property("ADBE Mask Atom");
var curMask = curMaskAtom.property("ADBE Mask Shape");
var posProp = app.project.activeItem.layer(6).property("ADBE Transform Group").property("ADBE Position");

curMask.selected = true;
app.executeCommand(19); //Copy command
curMask.selected = false;
curMaskAtom.selected = false;

posProp.selected = true;
app.executeCommand(20); //Paste command
*/