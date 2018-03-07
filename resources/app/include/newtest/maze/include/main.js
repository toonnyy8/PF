//主程式
/// <reference path=".\typings\globals\pixi.js\index.d.ts" />
var main = function(x = 2, maze_width = 100, maze_height = 100) {
    maze_width += 2;
    maze_height += 2;
    if (maze_height * maze_width > 600 * 100) {
        x *= (60000 / (maze_height * maze_width));
    }
    document.write("<h1>");
    var ui = new UI(x, maze_width, maze_height);
    var control = new Control(x, maze_width, maze_height);

    ui.sharder();
    control.Chara_editor(ui);
};