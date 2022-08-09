/* 1

var myName = myInput();

function myInput() {
    var myWindow = new Window("dialog", "Form");
    myWindow.orientation = "row";
    myWindow.alignChildren = "top";
    var myInputGroup = myWindow.add("group");
    myInputGroup.add("statictext", undefined, "Name:");
    var myText = myInputGroup.add("edittext", undefined, "John");
    myText.characters = 30;
    myText.active = true;
    var myButtonGroup = myWindow.add("group");
    myButtonGroup.orientation = "column";
    myButtonGroup.add("button", undefined, "OK");
    myButtonGroup.add("button", undefined, "Cancel");

    if (myWindow.show() == 1) {
        return myText.text;
    }
    
    exit();
}
alert(myName);

*/

/* 2

w = new Window ("dialog");
w.grp1 = w.add ("group");
w.grp1.add("panel",[0,0,100,100],"None",{borderStyle:"none"});
w.grp1.add("panel",[0,0,100,100],"Gray",{borderStyle:"gray"});
w.grp1.add("panel",[0,0,100,100],"Black",{borderStyle:"black"});
w.grp1.add("panel",[0,0,100,100],"White",{borderStyle:"white"});
w.grp2 = w.add("group");
w.grp2.add("panel",[0,0,100,100],"Etched",{borderStyle:"etched"});
w.grp2.add("panel",[0,0,100,100],"Sunken",{borderStyle:"sunken"});
w.grp2.add("panel",[0,0,100,100],"Raised",{borderStyle:"raised"});
w.show();

*/

/* 3 Multiline

var w = new Window ("dialog", "Multiline");
var myText = w.add ("edittext", [0, 0, 150, 70], " ", {multiline: true});
myText.text = "Line 1\rLine 2\rLine 3\rLine 4\rLine 5\rLine 6\r";
myText.active = true;
w.show ();

*/

var w = new Window ("dialog");
var myList = w.add ("listbox", undefined, ["one", "two", "three"]);
myList.onChange = function () {
$.writeln (myList.selection);
}
w.show ();