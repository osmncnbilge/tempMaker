// GLOBAL VARIABLES

//var itemNum = app.project.numItems;

var thisFile = File($.fileName);
var filePath = thisFile.path;
var folderPath = Folder(filePath).parent;
var basePath = folderPath.absoluteURI;
var resPath = basePath + "/res/";
var defEase = new KeyframeEase(0, 33.33333);

// GLOBAL FUNCTIONS

function findComp(compName) {
    var itemNum = app.project.numItems;
    for (var i = 1; i <= itemNum; i++) {
        if (app.project.item(i).name == compName) {
            return app.project.item(i);
        }
    }
}

function findLayer(layerName) {
    var itemNum = app.project.numItems;
    for (var i = 1; i <= itemNum; i++) {
        var layerNum = app.project.item(i).numLayers;
        for (var j = 1; j <= layerNum; j++) {
            if (app.project.item(i).layer(j).name == layerName) {
                return app.project.item(i).layer(j);
                break;
            }
        };
    }
}

function objectMask() {
    var myLayer = app.project.activeItem.layer(1);
    var r = myLayer.sourceRectAtTime(0, false);

    var myMask = myLayer.property("Masks").addProperty("Mask");
    var myPath = myMask.property("Mask Path");
    var myShape = myPath.value;

    switch (true) {

        case r.height > 600:

            myShape.vertices = [
                [r.left, r.top],
                [r.left + r.width, r.top + r.height / 7],
                [r.left, r.top + 2 * r.height / 7],
                [r.left + r.width, r.top + 3 * r.height / 7],
                [r.left, r.top + 4 * r.height / 7],
                [r.left + r.width, r.top + 5 * r.height / 7],
                [r.left, r.top + 6 * r.height / 7],
                [r.left + r.width, r.top + r.height]
            ];
            break;

        case r.height > 300:
            myShape.vertices = [
                [r.left, r.top],
                [r.left + r.width, r.top + r.height / 5],
                [r.left, r.top + 2 * r.height / 5],
                [r.left + r.width, r.top + 3 * r.height / 5],
                [r.left, r.top + 4 * r.height / 5],
                [r.left + r.width, r.top + r.height]
            ];
            break;

        case r.height <= 150:
            myShape.vertices = [
                [r.left, r.top],
                [r.left + r.width, r.top + r.height / 4],
                [r.left, r.top + 2 * r.height / 4],
                [r.left + r.width, r.top + 3 * r.height / 4],
                [r.left, r.top + 4 * r.height / 4],
            ];
            break;

        default:
            alert("!");

    }

    myShape.inTangents = [];
    myShape.outTangents = [];
    myShape.closed = false;
    myPath.setValue(myShape);
}


/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Group","parentId":10,"style":{"enabled":true,"varName":"","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-2":{"id":2,"type":"Panel","parentId":1,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Scene","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-3":{"id":3,"type":"Button","parentId":2,"style":{"enabled":true,"varName":null,"text":"Load Template","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-4":{"id":4,"type":"Button","parentId":2,"style":{"enabled":true,"varName":null,"text":"Import Scene","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-5":{"id":5,"type":"Panel","parentId":1,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Path","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-6":{"id":6,"type":"Button","parentId":5,"style":{"enabled":true,"varName":null,"text":"Create Path","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-7":{"id":7,"type":"Button","parentId":5,"style":{"enabled":true,"varName":null,"text":"Transfer Path","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-9":{"id":9,"type":"TabbedPanel","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":10,"alignment":null,"selection":10}},"item-10":{"id":10,"type":"Tab","parentId":9,"style":{"enabled":true,"varName":null,"text":"Project","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-11":{"id":11,"type":"Tab","parentId":9,"style":{"enabled":true,"varName":null,"text":"Character","orientation":"column","spacing":10,"alignChildren":["left","top"]}},"item-13":{"id":13,"type":"Button","parentId":21,"style":{"enabled":true,"varName":null,"text":"Apply Preset","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-15":{"id":15,"type":"DropDownList","parentId":21,"style":{"enabled":true,"varName":null,"text":"DropDownList","listItems":"ProRes 4444, Animation, Custom","preferredSize":[0,0],"alignment":null,"selection":0,"helpTip":null}},"item-16":{"id":16,"type":"Button","parentId":21,"style":{"enabled":true,"varName":null,"text":"Set Export Path","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-19":{"id":19,"type":"Button","parentId":21,"style":{"enabled":true,"varName":null,"text":"Render","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-20":{"id":20,"type":"Group","parentId":10,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":"center"}},"item-21":{"id":21,"type":"Panel","parentId":20,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Export","preferredSize":[0,0],"margins":10,"orientation":"row","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-22":{"id":22,"type":"Panel","parentId":11,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Panel","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}}},"order":[0,9,10,1,2,3,4,5,6,7,20,21,15,13,16,19,11,22],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"},"activeId":10}
*/

// DIALOG
// ======
var dialog = new Window("palette");
dialog.text = "Coşkunmatik";
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// TPANEL1
// =======
var tpanel1 = dialog.add("tabbedpanel", undefined, undefined, {
    name: "tpanel1"
});
tpanel1.alignChildren = "fill";
tpanel1.preferredSize.width = 525.312;
tpanel1.margins = 0;

// TAB1
// ====
var tab1 = tpanel1.add("tab", undefined, undefined, {
    name: "tab1"
});
tab1.text = "Project";
tab1.orientation = "column";
tab1.alignChildren = ["left", "top"];
tab1.spacing = 10;
tab1.margins = 10;

// GROUP1
// ======
var group1 = tab1.add("group", undefined, {
    name: "group1"
});
group1.orientation = "row";
group1.alignChildren = ["left", "center"];
group1.spacing = 10;
group1.margins = 0;

// PANEL1
// ======
var panel1 = group1.add("panel", undefined, undefined, {
    name: "panel1"
});
panel1.text = "Scene";
panel1.orientation = "row";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 10;
panel1.margins = 10;

var button1 = panel1.add("button", undefined, undefined, {
    name: "button1"
});
button1.text = "Load Template";
button1.onClick = loadTemplate;

var button2 = panel1.add("button", undefined, undefined, {
    name: "button2"
});
button2.text = "Import Scene";
button2.onClick = importScene;


// PANEL2
// ======
var panel2 = group1.add("panel", undefined, undefined, {
    name: "panel2"
});
panel2.text = "Path";
panel2.orientation = "row";
panel2.alignChildren = ["left", "top"];
panel2.spacing = 10;
panel2.margins = 10;

var button3 = panel2.add("button", undefined, undefined, {
    name: "button3"
});
button3.text = "Create Path";
button3.onClick = createPath;


var button4 = panel2.add("button", undefined, undefined, {
    name: "button4"
});
button4.text = "Transfer Path";
button4.onClick = transferPath;


// GROUP2
// ======
var group2 = tab1.add("group", undefined, {
    name: "group2"
});
group2.orientation = "row";
group2.alignChildren = ["left", "center"];
group2.spacing = 10;
group2.margins = 0;
group2.alignment = ["center", "top"];

// PANEL3
// ======
var panel3 = group2.add("panel", undefined, undefined, {
    name: "panel3"
});
panel3.text = "Export";
panel3.orientation = "row";
panel3.alignChildren = ["left", "top"];
panel3.spacing = 10;
panel3.margins = 10;

var dropdown1_array = ["ProRes 4444", "Animation", "Custom"];
var dropdown1 = panel3.add("dropdownlist", undefined, undefined, {
    name: "dropdown1",
    items: dropdown1_array
});
dropdown1.selection = 0;

var button5 = panel3.add("button", undefined, undefined, {
    name: "button5"
});
button5.text = "Apply Preset";
button5.onClick = applyPreset;


var button6 = panel3.add("button", undefined, undefined, {
    name: "button6"
});
button6.text = "Set Export Path";
button6.onClick = setExportPath;


var button7 = panel3.add("button", undefined, undefined, {
    name: "button7"
});
button7.text = "Render";
button7.onClick = renderMovie;


// TAB2
// ====
var tab2 = tpanel1.add("tab", undefined, undefined, {
    name: "tab2"
});
tab2.text = "Character";
tab2.orientation = "column";
tab2.alignChildren = ["left", "top"];
tab2.spacing = 10;
tab2.margins = 10;

// TPANEL1
// =======
tpanel1.selection = tab1;

// PANEL4
// ======
var panel4 = tab2.add("panel", undefined, undefined, {
    name: "panel4"
});
panel4.text = "Panel";
panel4.orientation = "column";
panel4.alignChildren = ["left", "top"];
panel4.spacing = 10;
panel4.margins = 10;

dialog.show();

var mainComp;

function loadTemplate() {
    app.beginUndoGroup("rr");
    var paperFile = resPath + "paper.psd";
    var pageTurn = resPath + "page_turn.mov";
    var paperItem = app.project.importFile(new ImportOptions(File(paperFile)));
    var pageTurnItem = app.project.importFile(new ImportOptions(File(pageTurn)));

    mainComp = app.project.items.addComp("_MAIN_COMP", 1920, 1080, 1, 150, 25);
    var bgPageLayer = mainComp.layers.add(paperItem);
    var paperLayer = mainComp.layers.add(paperItem);

    var title = prompt("Konu başlığını giriniz", "");
    var mainTitleLayer = mainComp.layers.addBoxText([1250, 500]);
    var topTitleLayer = mainComp.layers.addText();

    var pageTurnLayer = mainComp.layers.add(pageTurnItem);
    pageTurnLayer.startTime = 3.6;

    // Main Title Text Properities ////////////////////////////////////////

    var mainTitleDoc = new TextDocument("Test Text");
    mainTitleLayer.property("Source Text").setValue(mainTitleDoc);

    var textProp = mainTitleLayer.property("Source Text");
    mainTitleDoc = textProp.value;

    mainTitleDoc.resetCharStyle();
    mainTitleDoc.resetParagraphStyle();
    mainTitleDoc.font = "meatloafsketched";
    mainTitleDoc.fontSize = 70;
    mainTitleDoc.text = title;
    mainTitleDoc.fillColor = [64 / 255, 93 / 255, 114 / 255];
    mainTitleDoc.justification = ParagraphJustification.CENTER_JUSTIFY;

    textProp.setValue(mainTitleDoc);
    mainTitleLayer.property("Position").setValue([960, 750]);

    /////////////////////////////////////////////////////////////////////

    // Top Title Text Properities //////////////////////////////////////

    var topTitleDoc = new TextDocument("Test Text");
    topTitleLayer.property("Source Text").setValue(topTitleDoc);

    var textProp = topTitleLayer.property("Source Text");
    topTitleDoc = textProp.value;

    topTitleDoc.resetCharStyle();
    topTitleDoc.resetParagraphStyle();
    topTitleDoc.font = "meatloafsketched";
    topTitleDoc.fontSize = 80;
    topTitleDoc.text = title;
    topTitleDoc.fillColor = [64 / 255, 93 / 255, 114 / 255];
    topTitleDoc.justification = ParagraphJustification.LEFT_JUSTIFY;

    textProp.setValue(topTitleDoc);
    topTitleLayer.anchorPoint.setValue([0.6, -18]);
    topTitleLayer.property("Position").setValue([95, 80]);
    topTitleLayer.inPoint = 7.4;

    /////////////////////////////////////////////////////////////////////

    var paperCutItem = mainComp.layers.precompose([3, 4], "PaperCut", true);
    paperCutItem.duration = 6.6;
    var paperCut = findLayer("PaperCut");
    paperCut.anchorPoint.setValue([0, 147.5]);
    paperCut.position.setValue([0, 147.5]);


    // MAIN_COMP //

    paperCutMask = paperCut.Masks.addProperty("Mask");
    paperCutMask.inverted = true;
    paperCutMaskShape = paperCutMask.property("maskShape");
    paperCutCustomMask = paperCutMaskShape.value;
    paperCutCustomMask.vertices = [
        [1930, -10],
        [-10, -10],
        [-10, 147],
        [1930, 147]
    ];
    paperCutCustomMask.closed = true;
    paperCutMaskShape.setValue(paperCutCustomMask);

    var setBezierWarp = paperCut.property("Effects").addProperty("Bezier Warp");
    setBezierWarp.property(5).setValueAtTime(4.28, [1920, 360]);
    setBezierWarp.property(5).setValueAtTime(4.6, [1920, 500]);
    setBezierWarp.property(5).setTemporalEaseAtKey(1, [defEase], [defEase]);
    setBezierWarp.property(5).setTemporalEaseAtKey(2, [defEase], [defEase]);

    setBezierWarp.property(6).setValueAtTime(4.28, [1920, 720]);
    setBezierWarp.property(6).setValueAtTime(4.6, [1920, 850]);
    setBezierWarp.property(6).setTemporalEaseAtKey(1, [defEase], [defEase]);
    setBezierWarp.property(6).setTemporalEaseAtKey(2, [defEase], [defEase]);

    paperCut.position.setValueAtTime(5.04, [0, 147.5]);
    paperCut.position.setValueAtTime(5.52, [0, 1100]);
    paperCut.rotation.setValueAtTime(4.56, 0);
    paperCut.rotation.setValueAtTime(5.12, 9);

    var paperDropShadow = paperCut.property("Effects").addProperty("Drop Shadow");
    paperDropShadow.property(2).setValue(30 * 2.55); //Opacity value 0-255
    paperDropShadow.property(4).setValue(3);
    paperDropShadow.property(5).setValue(7);




    // var comp = mainTitleLayer.containingComp;
    // var curTime = comp.time;
    // var layerAnchor = mainTitleLayer.anchorPoint.value;
    // var x;
    // var y;

    //     x = mainTitleLayer.sourceRectAtTime(curTime, false).width/2;
    //     y = mainTitleLayer.sourceRectAtTime(curTime, false).height/2;
    //     x += mainTitleLayer.sourceRectAtTime(curTime, false).left;
    //     y += mainTitleLayer.sourceRectAtTime(curTime, false).top;

    // var xAdd = (x-layerAnchor[0]) * (mainTitleLayer.scale.value[0]/100);
    // var yAdd = (y-layerAnchor[1]) * (mainTitleLayer.scale.value[1]/100);
    // mainTitleLayer.anchorPoint.setValue([ x, y ]);
    // var layerPosition = mainTitleLayer.position.value ;
    // mainTitleLayer.position.setValue([ layerPosition[0] + xAdd, layerPosition[1] + yAdd, layerPosition[2] ]);
    app.endUndoGroup();
};

function importScene() {

    var selectAiFiles = File.openDialog(["Select scene *.ai file"], ["Illustrator:*.ai"], [true]);

    for (var i = 0; i < selectAiFiles.length; i++) {
        var importAiFiles = new ImportOptions(File(selectAiFiles[i]));
        if (importAiFiles.canImportAs(ImportAsType.COMP_CROPPED_LAYERS)) {
            importAiFiles.importAs = ImportAsType.COMP_CROPPED_LAYERS;
            var aiComp = app.project.importFile(importAiFiles);
            aiComp.name = selectAiFiles[i].name.slice(0, -3);
            var layerNamesArr = new Array();
            var layerIndexArr = new Array();
            for (var k = 1; k <= aiComp.numLayers; k++) {
                if (k == aiComp.numLayers) {
                    break;
                }
                var tempNameArr = [aiComp.layers[k]];
                var tempIndexArr = [k];
                for (var l = k + 1; l <= aiComp.numLayers; l++) {
                    if (aiComp.layers[k].name.slice(0, 2) == aiComp.layers[l].name.slice(0, 2)) {
                        tempNameArr.push(aiComp.layers[l]);
                        tempIndexArr.push(aiComp.layers[l].index);
                    }
                }
                var isContiune = false;
                if (layerNamesArr.length >= 1) {
                    var checkIndex = layerNamesArr.length - 1;
                    for (var c = 0; c < layerNamesArr[checkIndex].length; c++) {
                        if (layerNamesArr[checkIndex][c].name === aiComp.layers[k].name) {
                            isContiune = true;
                        }
                    }
                }
                if (isContiune) {
                    continue;
                }
                layerNamesArr.push(tempNameArr);
                layerIndexArr.push(tempIndexArr);
            }
        }

        function makePreComposeIndexArray(count, content) {
            var result = [];
            for (var i = 0; i < count; i++) {
                result.push(content(i));
            }
            return result;
        }

        for (var v = 0; v < layerIndexArr.length; v++) {
            var preComposeIndexArr = layerIndexArr[v];
            if (v !== 0) {
                preComposeIndexArr = makePreComposeIndexArray(layerIndexArr[v].length, function(i) {
                    return i + v + 1;
                });

            }
            aiComp.layers.precompose(preComposeIndexArr, layerNamesArr[v][0].name, true);

        }

        for (var d = 1; d <= aiComp.numLayers; d++) {
            aiComp.layer(d).copyToComp(mainComp)
        }
    }

};

function createPath() {
    alert(arguments.callee.name)

};

function transferPath() {
    alert(arguments.callee.name)

};

function applyPreset() {
    alert(arguments.callee.name)
};

function setExportPath() {
    alert(arguments.callee.name)
};

function renderMovie() {
    alert(arguments.callee.name)
};

hello