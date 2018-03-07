//介面管理
/// <reference path=".\typings\globals\pixi.js\index.d.ts" />
/*************************************************************************************************************************/
//引用渲染引擎
var type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
};
/*************************************************************************************************************************/
//設定UI管理系統
var UI = function(x, maze_width, maze_height) {
    x *= 8;
    var renderer = new PIXI.WebGLRenderer(maze_width * x, maze_height * x, { transparent: true }); //設置渲染器
    var stage = new PIXI.Container(); //設置容器
    var Ability_stage = new PIXI.Container(); //設置能力值容器
    var Pixel_obj = new PIXI.Graphics();
    stage.addChild(Pixel_obj); // 要將 Graphics 物件加到 Stage 中
    var Pixels = [maze_width];
    for (var i = 0; i * x < maze_width * x; i++) {
        Pixels[i] = [maze_height];
        for (var j = 0; j * x < maze_height * x; j++) {
            Pixels[i][j] = 0xff0066; //i,j代表Pixels[i][j][k]的座標位置，k=0設定Pixels[i][j][0] = new PIXI.Graphics().k=1紀錄顏色
            if (i == 1 && j == 1) {
                Pixels[i][j] = 0xffff00;
            } else if (i == maze_width - 2 && j == maze_height - 2) {
                Pixels[i][j] = 0xffff00;
            } else if (i == 0 || j == 0 || i == maze_width - 1 || j == maze_height - 1) {
                Pixels[i][j] = 0x000000;
            }

            Pixel_obj.beginFill(Pixels[i][j]); // 設定我們要畫的顏色
            Pixel_obj.drawRect(i * x, j * x, x, x);
        };
    };
    /****/
    document.body.appendChild(renderer.view); // 連結至網頁
    /****/
    this.sharder = function(i = 0, j = 0, color, nib_size = 1, transparency = 1) {
        for (var _i = 0; _i < nib_size; _i++) { //筆尖大小
            for (var _j = 0; _j < nib_size; _j++) {
                if (color != undefined) {
                    Pixels[i + _i][j + _j] = color;
                };
                Pixel_obj.beginFill(Pixels[i + _i][j + _j]);
                Pixel_obj.drawRect((i + _i) * x, (j + _j) * x, x, x);
                if (transparency == 0) {
                    stage.removeChild(Pixels[i + _i][j + _j])
                    Pixel_obj = new PIXI.Graphics();
                    stage.addChild(Pixel_obj);
                };
            };
        };
        renderer.render(stage);
    };
    /****/
    var stop = 0; //0=沒有找到路 1=找到路
    var way_long = 0;
    this.find_way = async function(maze_X, maze_Y) {
        //alert("<" + maze_X + "，" + maze_Y + ">");

        if (stop == 1) {
            way_long -= 1;
            return 1;
        };
        if (maze_X == maze_width - 2 && maze_Y == maze_height - 2) {
            renderer.render(stage);
            alert("找到出路");
            alert("出路長度 : " + way_long);
            stop = 1;
            return 1;
        };

        if ((Pixels[maze_X][maze_Y] == 0xffffff || Pixels[maze_X][maze_Y] == 0xffff00) && stop == 0) {
            console.log("<" + maze_X + "，" + maze_Y + ">");
            Pixels[maze_X][maze_Y] = 0x00ffff;
            way_long += 1;
            this.find_way(maze_X, maze_Y + 1);
            this.find_way(maze_X + 1, maze_Y + 1);
            this.find_way(maze_X + 1, maze_Y);
            this.find_way(maze_X + 1, maze_Y - 1);
            this.find_way(maze_X, maze_Y - 1);
            this.find_way(maze_X - 1, maze_Y - 1);
            this.find_way(maze_X - 1, maze_Y);
            this.find_way(maze_X - 1, maze_Y + 1);
            Pixel_obj.beginFill(Pixels[maze_X][maze_Y]); // 設定我們要畫的顏色
            Pixel_obj.drawRect(maze_X * x, maze_Y * x, x, x);
        }
        return -1;
    };
    this.go = function() {
        if (stop == 0) {
            alert("無法出去");
            for (var i = 0; i * x < maze_width * x; i++) {
                for (var j = 0; j * x < maze_height * x; j++) {
                    if (Pixels[i][j] == 0x00ffff) {
                        Pixels[i][j] = 0xffffff;
                        Pixel_obj.beginFill(Pixels[i][j]); // 設定我們要畫的顏色
                        Pixel_obj.drawRect(i * x, j * x, x, x);
                    }
                };
            };
        }
        stop = 0;
        way_long = 0;
    }
};
/*************************************************************************************************************************/