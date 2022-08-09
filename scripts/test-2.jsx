////////////////USER VARIABLES ////////////////

var RenderSettingsTemplate = "Best Settings";
var OutputModuleTemplate = "Lossless";
var OutputPath = "~/Desktop/";

//////////////////////////////////////////////////

app.beginUndoGroup("Promo Version Maker");

var spreadsheet = File.openDialog("Please select .csv file");

var readOK = spreadsheet.open("r");

if (readOK) {

    var spreadsheetContents = spreadsheet.read();
    var itemsArray = spreadsheetContents.split(/\n|\r/);
    var itemsObject = new Object();
    for (var i = 0; i < itemsArray.length; i++) {
        itemsArray[i] = itemsArray[i].split(",");
        itemsObject["Station" + i] = {
            name: itemsArray[i][0],
            time: itemsArray[i][1],
            color: itemsArray[i][2]
        }
    }

    var foundTemplate = false;
    for (var j = 1; j <= app.project.numItems; j++) {
        if (app.project.item(j).name.match(/_Template$/)) {
            var templateComp = app.project.item(j);
            if (templateComp instanceof CompItem) {
                foundTemplate = true;
            } else {
                alert("Found template but it's NOT a comp!");
            }
        } //if (app.project.item(j).name == "Tag_Template")
    } // for  j loop

    var colors = { //create an object that holds the RGBA values for the named colors in the spreadsheet.  Be sure to match case!
        Blue: [0, 0, 1, 1], //  colors are stored in float (0-1) in a 4 item array: [R,G,B,A]   (A is alpha or opacity)
        Green: [0, 1, 0, 1],
        Red: [1, 0, 0, 1],
        Purple: [0.5, 0, 1, 1],
        Magenta: [1, 0, 1, 1]
    }

    if (foundTemplate) {
        for (var h in itemsObject) {
            var dupComp = templateComp.duplicate();
            dupComp.name = templateComp.name.replace(/_Template$/, "- " + itemsObject[h].name);
            var changeColor = false;
            for (k = 1; k <= dupComp.numLayers; k++) {
                if (dupComp.layer(k).sourceText != undefined) {
                    if (dupComp.layer(k).sourceText.value == "STATION NAME") {
                        dupComp.layer(k).sourceText.setValue(itemsObject[h].name);
                        changeColor = true;
                    } //	if (dupComp.layer(k).sourceText.value == "STATION NAME")
                    if (dupComp.layer(k).sourceText.value == "TIME") {
                        dupComp.layer(k).sourceText.setValue(itemsObject[h].time);
                        changeColor = true;
                    } //if (dupComp.layer(k).sourceText.value == "TIME")
                } //if (dupComp.layer(k).sourceText != undefined)
                if (dupComp.layer(k).name == "Shape Layer 1") {
                    changeColor = true;
                }

                if (changeColor) {
                    var fillEffect = dupComp.layer(k).property("Effects").addProperty("ADBE Fill");
                    fillEffect.property("Color").setValue(colors[itemsObject[h].color]);
                } //if (changeColor)
            } //for (k=1; k <= dupComp.numLayers; k++) 

            //Add to RenderQueue
            var myRQItem = app.project.renderQueue.items.add(dupComp);

            //get render setting templates
            var myRSTemplates = app.project.renderQueue.item(1).templates;
            var foundTemplate = false;

            for (var t = 0; t < myRSTemplates.length; t++) {
                if (myRSTemplates[t] == RenderSettingsTemplate) {
                    foundTemplate = true;
                    break;
                }
            } //for (var t=0; t < myRSTemplates.length; t++)

            //Apply Render Settings
            if (foundTemplate) {
                myRQItem.applyTemplate(RenderSettingsTemplate);
            } else {
                alert("Could not find Render Setting: " + RenderSettingsTemplate);
            }
            //Apply OM Template
            myRQItem.outputModules[1].applyTemplate("Lossless");

            //Set output name and path
            var projName = app.project.file.name;

            var myFile = new File(OutputPath + dupComp.name);
            myRQItem.outputModules[1].file = myFile;


        } // for (var h=0 in itemsObject) 

    } else { //if (foundTemplate) 
        alert("Could not find template");
    }

} else {
    alert("Error opening file");
}