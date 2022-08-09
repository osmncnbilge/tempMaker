var myPalette = buildUI (this);

if (myPalette != null && myPalette instanceof Window) {
  myPalette.show();
}

function buildUI (thisObject) {

if (thisObject instanceof Panel) {
  var myWindow = thisObject;
} else {
  var myWindow = new Window("palette", "My window");
}

myWindow.myPanel = myWindow.add("panel");
myWindow.orientation = "column";
myWindow.myPanel.okButton = myWindow.myPanel.add("button");
myWindow.myPanel.okButton.text = "OK";
myWindow.myPanel.cancelButton = myWindow.myPanel.add("button");
myWindow.myPanel.cancelButton.text = "Cancel";

myWindow.layout.layout(true);
myWindow.layout.resize();

myWindow.myPanel.okButton.onClick = function () {
  var myLayer = app.project.activeItem.layer(1);
  myLayer.position.setValue([0,0])
	myWindow.close();
};

myWindow.myPanel.cancelButton.onClick = function () {
  myWindow.close();
};

}

