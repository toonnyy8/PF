//按鍵控制
///<reference path=".\typings\globals\pixi.js\index.d.ts" />
/*************************************************************************************************************************/
var Control = function(x, maze_width, maze_height) {
    x *= 8;
    this.Chara_editor = function(a) {
        var red = 0x000000;
        var blue = 0x000000;
        var green = 0x000000;
        var nib = 1; //筆尖:1，2，4
        var transparency = 1; //transparency=不透明度(1是不透明，0是透明)
        var mouse = function(a, color, nib_size) {
            window.onmousedown = function() {
                var _X = Math.ceil((event.pageX - 13) / x);
                var _Y = Math.ceil((event.pageY - 13) / x);
                if (_X != 0 && _X != maze_width - 1 && _Y != 0 && _Y != maze_height - 1) {
                    if ((_X != 1 || _Y != 1) && (_X != maze_width - 2 || _Y != maze_height - 2)) {
                        a.sharder(_X, _Y, color, nib_size, transparency);
                    };
                };
                window.onmousemove = function() {
                    var _X = Math.ceil((event.pageX - 13) / x);
                    var _Y = Math.ceil((event.pageY - 13) / x);
                    if (_X != 0 && _X != maze_width - 1 && _Y != 0 && _Y != maze_height - 1) {
                        if ((_X != 1 || _Y != 1) && (_X != maze_width - 2 || _Y != maze_height - 2)) {
                            a.sharder(_X, _Y, color, nib_size, transparency);
                        };
                    };
                };
            };
            window.onmouseup = function() {
                window.onmousemove = function() {};
            };
        };
        document.onkeydown = function() {
            var keycode = event.which || event.keyCode;
            if (keycode == 90) { //Z
                red = 0xff0000; //牆
                green = 0x000000;
                blue = 0x000066;
                transparency = 1;
                mouse(a, red + green + blue, nib); //著色
            } else if (keycode == 88) { //X
                red = 0xff0000; //路
                green = 0x00ff00;
                blue = 0x0000ff;
                transparency = 1;
                mouse(a, red + green + blue, nib); //著色
            } else if (keycode == 67) { //C
                a.find_way(1, 1);
                a.go();
                a.sharder(1, 1, 0xffff00);
                a.sharder(maze_width - 2, maze_height - 2, 0xffff00);
            } else {
                window.onmousedown = function() {};
            };
        };
    };
    /****/
};