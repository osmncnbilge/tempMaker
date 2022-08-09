var tempSettings = "DV Settings";
var outputTempSettings = "Losdsless";
var outputPath = new Folder;
outputPath = outputPath.selectDlg("Select a folder please");

var selectedItems = app.project.selection

app.beginUndoGroup("Conform Framerate");

for (var i = 0; i < selectedItems.length; i++) {
     selectedItems[i].mainSource.conformFrameRate = 18;
     var compItem = app.project.items.addComp(selectedItems[i].name.slice(0,-4), selectedItems[i].width, selectedItems[i].height, selectedItems[i].pixelAspect, selectedItems[i].duration, selectedItems[i].frameRate);
     compItem.layers.add(selectedItems[i]);
     var compText = compItem.layers.addText("Window Burn");
     compText.sourceText.expression = "thisComp.name + '(' + (1 + (time/thisComp.frameDuration)) + ')'";
     compText.position.setValue([850,650]);
     var renderItem = app.project.renderQueue.items.add(compItem);

     var tempCheck = app.project.renderQueue.item(1).templates;
     var outputCheck = app.project.renderQueue.item(1).outputModule(1).templates;

     var foundTemp = false;
     var foundModule = false;
    
     for (var j = 0; j < tempCheck.length; j++) {
        if (tempCheck[j] == tempSettings) {
            foundTemp = true;
            break;
        } 
     }

    if (foundTemp) {
     renderItem.applyTemplate(tempSettings);
    } else {
        alert("Can't find temp");
        break;
    }

    for (var k = 0; k < outputCheck.length; k++) {
        if (outputCheck[k] == outputTempSettings) {
            foundModule = true;
            break;
        }
    }

    if (foundModule) {
    renderItem.outputModule(1).applyTemplate(outputTempSettings);
    } else {
        alert("Can't find OM");
        break;
    }

    var myFile = new File(outputPath.fsName + "/" + compItem.name);

    renderItem.outputModule(1).file = myFile; 

};

app.endUndoGroup();
