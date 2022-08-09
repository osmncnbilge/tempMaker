var comp = app.project.activeItem;
var layer = comp.layer(1);

$.writeln(layer.property(4).property(1).property(1).value.vertices[0]);

var vpos = layer.property(4).property(1).property(1).value.vertices[0];
xpos = vpos[0];
ypos = vpos[1];