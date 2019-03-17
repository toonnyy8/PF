//編輯器設定
///<reference path=".\typings\globals\pixi.js\index.d.ts" />
"use strict";
exports.Editor = function(x) {
    {
        //x *= 8;
        x = x - x % 0.01;
        var renderer = new PIXI.Application(320 * x, 181 * x, { transparent: true }); //設置渲染器
        //renderer.renderer.view.style = "display:none"; <--可以隱藏renderer
        //renderer.renderer.view.style = ""; <--可以顯示renderer
        this.editor_close = function() {
            renderer.renderer.view.style = "display:none";
        };
        this.editor_open = function() {
            renderer.renderer.view.style = "";
        };
        /****/
        var stage = new PIXI.Container(); //設置容器
        var Ability_stage = new PIXI.Container(); //設置能力值容器
        var Pixels = [320];
        var Pillar_bar = [320]; //中心點
        for (var i = 0; i * x < 320 * x; i++) {
            Pixels[i] = [180];
            Pillar_bar[i] = [4];
            for (var j = 0; j * x < 180 * x; j++) {
                Pixels[i][j] = [4]; //i,j代表Pixels[i][j][k]的座標位置，k=0設定Pixels[i][j][0] = new PIXI.Graphics().k=1紀錄顏色.k=2設定Pixels[i][j][2] = new PIXI.Graphics().k=3紀錄屬性(攻擊/防禦/身體/無).k=4紀錄所有人(P1.P2.GB)
                Pixels[i][j][0] = new PIXI.Graphics();
                Pixels[i][j][1] = 0xcccccc;
                Pixels[i][j][2] = new PIXI.Graphics();
                Pixels[i][j][3] = 0x660000; //0x333333:=無,0x110000~0xff0000:=攻擊力1~15,0x001100~0x00ff00:=體力1~15,0x000011~0x0000ff:=防禦力1~15
                stage.addChild(Pixels[i][j][0]); // 要將 Graphics 物件加到 Stage 中
                Pixels[i][j][0].beginFill(Pixels[i][j][1], 0); // 設定我們要畫的顏色
                Pixels[i][j][0].drawRect(i * x, j * x, x, x);
                Ability_stage.addChild(Pixels[i][j][2]); // 要將 Graphics 物件加到 Ability_stage 中
                Pixels[i][j][2].beginFill(Pixels[i][j][3], 0); // 設定能力圖
                Pixels[i][j][2].drawRect(i * x, j * x, x, x);
                /****/
            };
            Pillar_bar[i][0] = new PIXI.Graphics(); //sharder用的中心軸
            stage.addChild(Pillar_bar[i][0]);
            Pillar_bar[i][1] = 0x000000;
            Pillar_bar[i][0].beginFill(Pillar_bar[i][1], 1);
            Pillar_bar[i][0].drawRect(i * x, 180 * x, x, x);
            /***/
            Pillar_bar[i][2] = new PIXI.Graphics(); //Ability_sharder用的中心軸
            Ability_stage.addChild(Pillar_bar[i][2]);
            Pillar_bar[i][3] = 0x000000;
            Pillar_bar[i][2].beginFill(Pillar_bar[i][3], 1);
            Pillar_bar[i][2].drawRect(i * x, 180 * x, x, x);
        };
        Pillar_bar[160][1] = 0xffffff;
        Pillar_bar[160][0].beginFill(Pillar_bar[160][1], 1);
        Pillar_bar[160][0].drawRect(160 * x, 180 * x, x, x);
        Pillar_bar[160][3] = 0xffffff;
        Pillar_bar[160][2].beginFill(Pillar_bar[160][3], 1);
        Pillar_bar[160][2].drawRect(160 * x, 180 * x, x, x);
    }
    /****/
    let screenset = function() {
        if (document.getElementById("EDITOR") != undefined) {
            document.getElementById("EDITOR").appendChild(renderer.renderer.view); // 連結至網頁
        } else {
            document.body.appendChild(renderer.renderer.view); // 連結至網頁
        };
        //window.onload = function () { window.resizeTo(320 * x + 30, 181 * x + 60); };
        //window.onresize = function () { window.resizeTo(320 * x + 30, 181 * x + 60); };
    };
    screenset();
    /****/
    this.Chara_sharder = function(i = 0, j = 0, color, nib_size = 2, transparency = 1) {
        if (j != 180) {
            for (var _i = 0; _i < nib_size; _i++) { //筆尖大小
                for (var _j = 0; _j < nib_size; _j++) {
                    if (color != undefined) {
                        Pixels[i + _i][j + _j][1] = color;
                    };
                    stage.removeChild(Pixels[i + _i][j + _j][0])
                    Pixels[i + _i][j + _j][0] = new PIXI.Graphics();
                    stage.addChild(Pixels[i + _i][j + _j][0]);
                    if (transparency != 0) {
                        Pixels[i + _i][j + _j][0].beginFill(Pixels[i + _i][j + _j][1]);
                        Pixels[i + _i][j + _j][0].drawRect((i + _i) * x, (j + _j) * x, x, x);
                    }
                };
            };
        } else {
            for (var k = 0; k < 320; k++) {
                if (Pillar_bar[k][1] != 0x000000) {
                    Pillar_bar[k][1] = 0x000000;
                    Pillar_bar[k][0].beginFill(Pillar_bar[k][1]);
                    Pillar_bar[k][0].drawRect(k * x, 180 * x, x, x);
                };
            };
            Pillar_bar[i][1] = 0xffffff;
            Pillar_bar[i][0].beginFill(Pillar_bar[i][1]);
            Pillar_bar[i][0].drawRect(i * x, 180 * x, x, x);
        }
        renderer.stage.addChild(stage);
        renderer.stage.removeChild(Ability_stage);
    };
    /****/
    this.Ability_sharder = function(i = 0, j = 0, Ability, nib_size = 2, transparency = 1) {
        if (j != 180) {
            for (var _i = 0; _i < nib_size; _i++) { //筆尖大小
                for (var _j = 0; _j < nib_size; _j++) {
                    if (Ability != undefined) {
                        Pixels[i + _i][j + _j][3] = Ability;
                    };
                    Ability_stage.removeChild(Pixels[i + _i][j + _j][2])
                    Pixels[i + _i][j + _j][2] = new PIXI.Graphics();
                    Ability_stage.addChild(Pixels[i + _i][j + _j][2]);
                    if (transparency != 0) {
                        Pixels[i + _i][j + _j][2].beginFill(Pixels[i + _i][j + _j][3]);
                        Pixels[i + _i][j + _j][2].drawRect((i + _i) * x, (j + _j) * x, x, x);
                    }
                };
            };
        } else {
            for (var k = 0; k < 320; k++) {
                if (Pillar_bar[k][3] != 0x000000) {
                    Pillar_bar[k][3] = 0x000000;
                    Pillar_bar[k][2].beginFill(Pillar_bar[k][3]);
                    Pillar_bar[k][2].drawRect(k * x, 180 * x, x, x);
                };
            };
            Pillar_bar[i][3] = 0xffffff;
            Pillar_bar[i][2].beginFill(Pillar_bar[i][3]);
            Pillar_bar[i][2].drawRect(i * x, 180 * x, x, x);
        }
        renderer.stage.addChild(Ability_stage);
        renderer.stage.removeChild(stage);
    };
    /****/
    this.Save_File = function(file_type = 'mode') {
        var fileName = ".png"; //匯出的檔名
        var file_num = 0;
        var pillar_num = 0;
        renderer.renderer.resize(640, 180);
        if (file_type == 'mode') {
            for (file_num = 0; fs.existsSync("./resources/app/chara/player1/mode/" + file_num + fileName); file_num++) {};
            fileName = file_num + fileName;
            this.Chara_sharder(0, 0, undefined, 4, 0);
            stage.width /= x;
            stage.height /= x;
            stage.x = 320;
            renderer.renderer.render(stage);
            fs.writeFile("./resources/app/chara/player1/mode/" + fileName, new Buffer(renderer.renderer.view.toDataURL().replace(/^[^,]+,/, ""), "base64"), function(err) {
                if (err) {
                    console.log(err);
                    alert(err);
                } else {
                    console.log("save " + fileName + " in ./resources/app/chara/player1/mode/");
                    alert("save " + fileName + ".png in ./resources/app/chara/player1/mode/");
                }
            });
            renderer.renderer.resize(320 * x, 181 * x);
            this.Chara_sharder(0, 0, undefined, 4, 1);
            stage.width *= x;
            stage.height *= x;
            stage.x = 0;
            renderer.renderer.render(stage);
            for (pillar_num = 0; Pillar_bar[pillar_num][1] == 0x000000; pillar_num++) {};
        } else {
            for (file_num = 0; fs.existsSync("./resources/app/chara/player1/ability/" + file_num + fileName); file_num++) {};
            fileName = file_num + fileName;
            this.Ability_sharder(0, 0, undefined, 4, 0);
            Ability_stage.width /= x;
            Ability_stage.height /= x;
            Ability_stage.x = 320;
            renderer.renderer.render(Ability_stage);
            fs.writeFile("./resources/app/chara/player1/ability/" + fileName, new Buffer(renderer.renderer.view.toDataURL().replace(/^[^,]+,/, ""), "base64"), function(err) {
                if (err) {
                    console.log(err);
                    alert(err);
                } else {
                    console.log("save " + fileName + " in ./resources/app/chara/player1/ability/");
                    alert("save " + fileName + " in ./resources/app/chara/player1/ability/");
                }
            });
            renderer.renderer.resize(320 * x, 181 * x);
            this.Ability_sharder(0, 0, undefined, 4, 1);
            Ability_stage.width *= x;
            Ability_stage.height *= x;
            Ability_stage.x = 0;
            renderer.renderer.render(Ability_stage);
            for (pillar_num = 0; Pillar_bar[pillar_num][3] == 0x000000; pillar_num++) {};
        };
        /*var data = renderer.view;  //棄案
        var href = data.toDataURL();
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.href = href;
        link.download = fileName;
        link.click();*/
        var RW_json = "./resources/app/chara/player1/player.json";
        fs.readFile(RW_json, 'utf8', function(err, data) {
            console.log(data);
            if (data != '') {
                data = JSON.parse(data);
            }
            if (err || data[file_type + "Pillar"] == undefined) {
                data = {
                    "HP": "1000_1000",
                    "MP": "10_10_2_1",
                    "FPS": 30,
                    "modePillar": [],
                    "abilityPillar": [],
                    "action": [],
                    "combos_status": [],
                    "stand": "0_0",
                    "comment": ["action是用於記載角色的動作模組，寫法是'由i動作接續_要按的按鍵指令_要求達成指令的時限(毫秒)_演出的動作_實際的判定圖_移動速度((x.y)，不影響速度寫null(ex:null.null))_是否(1/0)能按住續力_面向右或左(0/1)時才發動(都可發動寫null)_動作撥放多少後可供接技(1=100%，0.5=50%，0=0%)_撥放完後自動接續的動作(null表示無)_發動所改變的HP.MP(不足則無法發動，正增加，負減少)_受攻擊所改變的動作(不改變寫null)'", "由i動作接續請以動作編號表示，動作從0開始編排，可以有複數個動作", "指令鍵以數字組合，中間以'.'隔開 EX:65.66.65 排序與要按的順序無關，數字參照 https://dotblogs.com.tw/corner/2009/07/19/9583 或 http://www.zendei.com/article/13872.html", "演出的動作 與 實際的判定圖 也請都以 圖片編號.圖片編號 來連接 EX:1.2.5.10"],
                    "Scomment": ["stand是用於記載角色的站立模組，stand寫法是'演出的動作_實際的判定圖_受攻擊所改變的動作(不改變寫null)'", "combos_status寫法是用於記載角色的動作狀態值，寫法是將角色的所有動作編號記錄下來，如果有動作發動後回形成迴圈變成變身狀態，動作的編號就寫null", "HP是紀錄角色的血量，寫法是'最大HP_現有HP'", "MP是紀錄角色的能量，寫法是'最大MP_現有MP_每hit回復多少MP_受攻擊回多少MP''"],
                    "note": []
                };
                fs.writeFile("./resources/app/chara/player1/player.json", JSON.stringify(data), function(err) {
                    if (err) {
                        console.log(err);
                        alert(err);
                    } else {
                        console.log("build player.json");
                    };
                });
            };
            data[file_type + "Pillar"][file_num] = pillar_num;
            console.log(data[file_type + "Pillar"][file_num]);
            console.dir(data);
            fs.writeFile("./resources/app/chara/player1/player.json", JSON.stringify(data), function(err) {
                if (err) {
                    console.log(err);
                    alert(err);
                } else {
                    console.log("save player.json");
                };
            });
        });

        return file_num + 1;
    };
    /****/
    this.Chara_editor = function() {
        var Chara_sharder = this.Chara_sharder;
        var red = 0x00000;
        var blue = 0x00000;
        var green = 0x00000;
        var nib = 2; //筆尖:1，2，4
        var transparency = 1; //transparency=不透明度(1是不透明，0是透明)
        var mouse = function(color, nib_size) {
            window.onmousedown = function() {
                var _X = Math.ceil((event.pageX - 15) / x);
                var _Y = Math.ceil((event.pageY - 15) / x);
                Chara_sharder(_X, _Y, color, nib_size, transparency);
                window.onmousemove = function() {
                    var _X = Math.ceil((event.pageX - 15) / x);
                    var _Y = Math.ceil((event.pageY - 15) / x);
                    Chara_sharder(_X, _Y, color, nib_size, transparency);
                };
            };
            window.onmouseup = function() {
                window.onmousemove = function() {};
            };
        };
        document.onkeydown = function() {
            var keycode = event.which || event.keyCode;
            if (keycode == 96 || keycode == 86) { //0，v
                red = 0x000000; //橡皮擦
                green = 0x000000;
                blue = 0x000000;
                transparency = 0;
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 97 || keycode == 90) { //1，z
                if (red < 0xff0000) {
                    red += 0x330000; //+紅
                    transparency = 1;
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 98 || keycode == 88) { //2，x
                if (green < 0x00ff00) {
                    green += 0x003300; //+綠
                    transparency = 1;
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 99 || keycode == 67) { //3，c
                if (blue < 0x0000ff) {
                    blue += 0x000033; //+藍
                    transparency = 1;
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 100 || keycode == 65) { //4，a
                if (red > 0x000000) {
                    red -= 0x330000; //-紅
                    transparency = 1;
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 101 || keycode == 83) { //5，s
                if (green > 0x000000) {
                    green -= 0x003300; //-綠
                    transparency = 1;
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 102 || keycode == 68) { //6，d
                if (blue > 0x000000) {
                    blue -= 0x000033; //-藍
                    transparency = 1;
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 110 || keycode == 70) { //. ，f
                window.onmousedown = function() { //取色
                    var _X = Math.ceil((event.pageX - 15) / x);
                    var _Y = Math.ceil((event.pageY - 15) / x);
                    let color = Pixels[_X][_Y][1];
                    blue = color % 0x000100;
                    green = (color % 0x010000) - blue;
                    red = color - (green + blue);
                    Chara_sharder(0, 0, red + green + blue, nib, 0);
                    Chara_sharder(0, 0, red + green + blue, nib);
                };
                transparency = 1;
            } else if (keycode == 103 || keycode == 81) { //7，Q
                Chara_sharder(0, 0, red + green + blue, nib, 0);
                if (nib > 1) {
                    nib -= 1;; //筆尖變小
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 104 || keycode == 87) { //8，W
                Chara_sharder(0, 0, red + green + blue, nib, 0);
                nib = 2;; //筆尖大小=2*2
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 105 || keycode == 69) { //9,E
                Chara_sharder(0, 0, red + green + blue, nib, 0);
                if (nib < 15) {
                    nib += 1;; //筆尖變大
                };
                mouse(red + green + blue, nib); //著色
            } else {
                window.onmousedown = function() {};
            };
            Chara_sharder(0, 0, red + green + blue, nib);
        };
    };
    /****/
    this.Ability_editor = function() {
        var Ability_sharder = this.Ability_sharder;
        var red = 0x330000; //攻擊力
        var blue = 0x000000; //防禦力
        var green = 0x000000; //體力
        var nib = 2; //筆尖:1，2，4
        var transparency = 1;
        var mouse = function(Ability, nib_size) {
            window.onmousedown = function() {
                var _X = Math.ceil((event.pageX - 15) / x);
                var _Y = Math.ceil((event.pageY - 15) / x);
                Ability_sharder(_X, _Y, Ability, nib_size, transparency);
                window.onmousemove = function() {
                    var _X = Math.ceil((event.pageX - 15) / x);
                    var _Y = Math.ceil((event.pageY - 15) / x);
                    Ability_sharder(_X, _Y, Ability, nib_size, transparency);
                };
            };
            window.onmouseup = function() {
                window.onmousemove = function() {};
            };
        };
        document.onkeydown = function() {
            var keycode = event.which || event.keyCode;
            if (keycode == 96 || keycode == 86) { //0，V
                red = 0x000000; //橡皮擦
                green = 0x000000;
                blue = 0x000000;
                transparency = 0;
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 97 || keycode == 90) { //1，z
                if (red < 0xff0000) {
                    red += 0x330000; //+紅
                    green = 0x000000;
                    blue = 0x000000;
                    transparency = 1;
                };
                mouse(red, nib); //著色
            } else if (keycode == 98 || keycode == 88) { //2，x
                if (green < 0x00ff00) {
                    green += 0x003300; //+綠
                    red = 0x000000;
                    blue = 0x000000;
                    transparency = 1;
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 99 || keycode == 67) { //3，c
                if (blue < 0x0000ff) {
                    blue += 0x000033; //+藍
                    red = 0x000000;
                    green = 0x000000;
                    transparency = 1;
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 100 || keycode == 65) { //4，a
                if (red > 0x330000) {
                    red -= 0x330000; //-紅
                    green = 0x000000;
                    blue = 0x000000;
                    transparency = 1;
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 101 || keycode == 83) { //5，s
                if (green > 0x003300) {
                    green -= 0x003300; //-綠
                    red = 0x000000;
                    blue = 0x000000;
                    transparency = 1;
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 102 || keycode == 68) { //6，d
                if (blue > 0x000033) {
                    blue -= 0x000033; //-藍
                    red = 0x000000;
                    green = 0x000000;
                    transparency = 1;
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 110 || keycode == 70) { //. ，f
                window.onmousedown = function() { //取色
                    var _X = Math.ceil((event.pageX - 15) / x);
                    var _Y = Math.ceil((event.pageY - 15) / x);
                    let color = Pixels[_X][_Y][3];
                    blue = color % 0x000100;
                    green = (color % 0x010000) - blue;
                    red = color - (green + blue);
                    Ability_sharder(0, 0, red + green + blue, nib, 0);
                    Ability_sharder(0, 0, red + green + blue, nib);
                };
                transparency = 1;
            } else if (keycode == 103 || keycode == 81) { //7，q
                Ability_sharder(0, 0, red + green + blue, nib, 0);
                if (nib > 1) {
                    nib -= 1;; //筆尖變小
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 104 || keycode == 87) { //8，w
                Ability_sharder(0, 0, red + green + blue, nib, 0);
                nib = 2;; //筆尖大小=2*2
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 105 || keycode == 69) { //9，e
                Ability_sharder(0, 0, red + green + blue, nib, 0);
                if (nib < 15) {
                    nib += 1;; //筆尖變大
                };
                mouse(red + green + blue, nib); //著色
            } else if (keycode == 27) { //esc
                return 0;
            } else {
                window.onmousedown = function() {};
            };
            Ability_sharder(0, 0, red + green + blue, nib);
        };
    };
    /****/
};