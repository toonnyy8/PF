//戰鬥設定
/// <reference path=".\typings\globals\pixi.js\index.d.ts" />
"use strict";
exports.Fight = function(x) {
    //x *= 8;
    console.log(x);

    var renderer = new PIXI.Application(220 * x, 120 * x, { transparent: true }); //設置渲染器
    //renderer.renderer.view.style = "display:none"; <--可以隱藏renderer
    //renderer.renderer.view.style = ""; <--可以顯示renderer

    this.fight_close = function() {
        renderer.renderer.view.style = "display:none";
    };
    this.fight_open = function() {
        renderer.renderer.view.style = "";
    };
    let screenset = function() {
        document.body.appendChild(renderer.renderer.view); // 連結至網頁
        //window.onload = function() { window.resizeTo(220 * x + 30, 120 * x + 60); };
        //window.onresize = function() { window.resizeTo(220 * x + 30, 120 * x + 60); };
    };
    screenset();
    /****/
    this.fighter = function(fighter_name = 'player1', fps = 30, stand_vector = 50, faceTo = 0 /*0面相右 1面向左*/ ) {
        this.fighter_name = fighter_name;
        let that = this;
        let MODE_stage = this.MODE_stage = new PIXI.Container(); //設置容器
        let ABILITY_stage = new PIXI.Container(); //設置容器
        this.fps = fps;
        var Ability_renderer = new PIXI.Application(220, 120, { transparent: true });
        this.Read_Ability_renderer = function() {
            return Ability_renderer;
        };
        document.body.appendChild(Ability_renderer.renderer.view); // 連結至網頁
        this.fighter_Ability_close = function() {
            Ability_renderer.renderer.view.style = "display:none";
        };
        this.fighter_Ability_open = function() {
            Ability_renderer.renderer.view.style = "";
        };
        //stand_vector -= 220; //人物位置
        this.stand_vector = function(set_stand_vector = null) {
            if (set_stand_vector != null) {
                stand_vector = set_stand_vector;
            };
            return stand_vector;
        };
        var speed = []; //人物速度
        speed[0] = 0; //移動
        speed[1] = 0; //跳躍
        this.speed = function() {
            return speed;
        }
        let Move;
        let KO_END = new PIXI.Container(); //設置容器
        let WINner = [];
        let LOSer = [];
        let Game_Over = this.Game_Over = function() {
            if (faceTo == 0) {
                KO_END.scale.set(1, 1);
            } else {
                KO_END.scale.set(-1, 1);
            }
            KO_END.x = stand_vector * x;

            Ability_renderer.stage.removeChildren();
            Ability_renderer.ticker.remove(Move);
            renderer.stage.removeChild(MODE_stage);
            renderer.stage.addChild(KO_END);
            KO_END.visible = true;
            if (HP[1] > 0) {
                WINner["pre"].visible = true;
                WINner["pre"].gotoAndPlay(0);
                setTimeout(function() {
                    WINner["pre"].visible = false;
                    WINner["post"].visible = true;
                    WINner["post"].gotoAndPlay(0);
                }, 1000 * (data["win"]["pre"].length - 1) / fps);
            } else {
                LOSer["pre"].visible = true;
                LOSer["pre"].gotoAndPlay(0);
                setTimeout(function() {
                    LOSer["pre"].visible = false;
                    LOSer["post"].visible = true;
                    LOSer["post"].gotoAndPlay(0);
                }, 1000 * (data["lose"]["pre"].length - 1) / fps);
            }
        }
        this.faceTo = function(TofaceTo) {
            if (combos_status_ck().toString().split("run ").pop() != "null") {
                if (player_action[combos_status.toString().split("run ").pop()][7] != "null") {
                    if (TofaceTo != faceTo) {
                        speed[0] = 0; //移動
                        speed[1] = 0; //跳躍
                        faceTo = TofaceTo;
                    } else {
                        faceTo = TofaceTo;
                    };
                }
            } else {
                if (TofaceTo != faceTo) {
                    speed[0] = 0; //移動
                    speed[1] = 0; //跳躍
                    faceTo = TofaceTo;
                    Action_Control_Module[0].play_fighter(combos_status.toString().split("run ").pop());
                } else {
                    faceTo = TofaceTo;
                };
            }
            return faceTo;
        };
        this.avatar;
        var Saction = [];
        var Saction_mode = [];
        var Saction_ability = [];
        var player_mode = [];
        var Mode = [];
        var player_ability = [];
        var Ability = [];
        var player_action = [];
        var Action_Controller_obj = [];
        var combos_status = "null";
        this.combos_status = function(STRICT_combos_status = false) {
            if (STRICT_combos_status == true) {
                return combos_status;
            } else {
                if (combos_status == "null") {
                    return combos_status;
                } else {
                    return data["combos_status"][combos_status.toString().split("run ").pop()];
                }
            }

        };
        var combos_status_ck = this.combos_status;
        var data = fs.readFileSync("./resources/app/chara/" + fighter_name + "/player.json", 'utf8');
        data = JSON.parse(data);
        var HP = data["HP"].split("_");
        HP[0] = Number(HP[0]);
        HP[1] = Number(HP[1]);
        if (HP[1] > HP[0]) {
            HP[1] = HP[0];
        }
        this.HP = function(set_HP = null) {
            if (set_HP != null) {
                HP[0] = set_HP[0];
                HP[1] = set_HP[1];
            }
            return HP;
        };
        var MP = data["MP"].split("_");
        MP[0] = Number(MP[0]);
        MP[1] = Number(MP[1]);
        MP[2] = Number(MP[2]);
        MP[3] = Number(MP[3]);
        if (MP[1] > MP[0]) {
            MP[1] = MP[0];
        }
        this.MP = function(set_MP = null) {
            if (set_MP != null) {
                MP = set_MP;
            }
            return MP;
        };

        var Change = {};
        Change.HP = [];
        Change.MP = [];
        Change.action = [];
        for (let i = 0; i < data["action"].length; i++) {
            Change.HP[i] = data["action"][i].split("_")[10].split(".")[0];
            Change.HP[i] = Number(Change.HP[i]);
            Change.MP[i] = data["action"][i].split("_")[10].split(".")[1];
            Change.MP[i] = Number(Change.MP[i]);
            Change.action[i] = data["action"][i].split("_")[11];
        };
        var stand_Change = data["stand"].split("_")[2];
        this.hurt = async function(damage, Success_DEF = false) {
            if (!Success_DEF) {
                HP[1] -= damage;
                if (Change.action[combos_status] != undefined && Change.action[combos_status] != null) {
                    if (Change.action[combos_status] != "null") {
                        //**console.log(Change.action[combos_status]);
                        Action_Control_Module[combos_status.toString().split("run ").pop()].stop_fighter();
                        combos_status = "run " + Change.action[combos_status.toString().split("run ").pop()];
                        if (player_action[combos_status.toString().split("run ").pop()][6] == "1") {
                            Action_Control_Module[combos_status.toString().split("run ").pop()].HoldKey();
                        } else {
                            Action_Control_Module[combos_status.toString().split("run ").pop()].ComboKey();
                        }
                    };
                } else if (combos_status == "null") {
                    if (stand_Change != "null") {
                        combos_status = "run " + stand_Change;
                        if (player_action[combos_status.toString().split("run ").pop()][6] == "1") {
                            Action_Control_Module[combos_status.toString().split("run ").pop()].HoldKey();
                        } else {
                            Action_Control_Module[combos_status.toString().split("run ").pop()].ComboKey();
                        }
                        //**console.log(stand_Change);
                    };
                };
            }
            MP[1] += MP[3];
            if (MP[1] > MP[0]) {
                MP[1] = MP[0];
            } else if (MP[1] < 0) {
                MP[1] = 0;
            };
            if (HP[1] < 0) {
                HP[1] = 0;
            };
            return HP[1] + " , " + MP[1];
        };
        this.attack = async function() {
            MP[1] += MP[2];
            if (MP[1] > MP[0]) {
                MP[1] = MP[0];
            } else if (MP[1] < 0) {
                MP[1] = 0;
            };
            return MP[1];
        }
        let Action_Control_Module = [];
        for (let i = 0; fs.existsSync("./resources/app/chara/" + fighter_name + "/mode/" + i + ".png"); i++) {
            Mode[i] = PIXI.Texture.fromImage("./chara/" + fighter_name + "/mode/" + i + ".png");
            Mode[i].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST; //將導入的圖片以像素模式縮放

            var rectangle = new PIXI.Rectangle(data["modePillar"][i] * x, 0, (440 - data["modePillar"][i]) * x, 120 * x);
            Mode[i] = new PIXI.Texture(Mode[i], rectangle);
            Mode[i].baseTexture.resolution = Math.floor((1 / x) * 10000000000) / 10000000000;
            if (data["Mode_size"] != undefined) {
                if (data["Mode_size"][i] != undefined) {
                    Mode[i].baseTexture.resolution *= data["Mode_size"][i];
                };
            };

            //**console.log(data["modePillar"][i]);
        };
        for (let i = 0; fs.existsSync("./resources/app/chara/" + fighter_name + "/ability/" + i + ".png"); i++) {
            Ability[i] = PIXI.Texture.fromImage("./chara/" + fighter_name + "/ability/" + i + ".png");
            Ability[i].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST; //將導入的圖片以像素模式縮放

            var rectangle = new PIXI.Rectangle(data["abilityPillar"][i], 0, (440 - data["abilityPillar"][i]), 120);
            Ability[i] = new PIXI.Texture(Ability[i], rectangle);

            //**console.log(data["abilityPillar"][i]);
        };
        if (Mode[0] != null && Ability[0] != null) {

            Saction[0] = data["stand"].split("_");
            Saction[0][0] = Saction[0][0].split(".");
            for (var i = 0; i < Saction[0][0].length; i++) {
                Saction[0][0][i] = Mode[Saction[0][0][i]];
            };
            Saction_mode = new PIXI.extras.AnimatedSprite(Saction[0][0]);
            Saction_mode.animationSpeed = fps / 60;
            Saction_mode.x = -220 * x;
            MODE_stage.addChild(Saction_mode);
            Saction_mode.visible = true;


            this.avatar = new PIXI.extras.AnimatedSprite(Saction[0][0]);
            this.avatar.scale.set(1 / 4);
            this.avatar.animationSpeed = fps / 60;
            this.avatar.visible = true;
            this.avatar.gotoAndPlay(0);

            Saction[0][1] = Saction[0][1].split(".");
            for (var i = 0; i < Saction[0][1].length; i++) {
                Saction[0][1][i] = Ability[Saction[0][1][i]];
            };
            Saction_ability = new PIXI.extras.AnimatedSprite(Saction[0][1]);
            Saction_ability.scale.set(1);
            Saction_ability.animationSpeed = fps / 60;
            Saction_ability.x -= 220;
            ABILITY_stage.addChild(Saction_ability);
            Saction_ability.visible = true;

            for (var i = 0; i < data["action"].length; i++) {
                player_action[i] = data["action"][i].split("_");
                /*
                i代表動作編號
                player_action[i][0]=要接續的動作
                player_action[i][1]=要按的按鍵指令
                player_action[i][2]=要求達成指令的時限(毫秒)
                player_action[i][3]=演出的動作
                player_action[i][4]=實際的判定圖
                */
                player_action[i][0] = player_action[i][0].split(".");
                player_action[i][1] = player_action[i][1].split(".");
                player_action[i][5] = player_action[i][5].split("."); //移動速度
                player_action[i][3] = player_action[i][3].split("."); //動作模組

                for (var j = 0; j < player_action[i][3].length; j++) {
                    player_action[i][3][j] = Mode[player_action[i][3][j]];
                };
                player_action[i][3][player_action[i][3].length] = player_action[i][3][player_action[i][3].length - 1];
                player_mode[i] = new PIXI.extras.AnimatedSprite(player_action[i][3]);
                player_mode[i].animationSpeed = fps / 60;
                player_mode[i].x = -220 * x;
                MODE_stage.addChild(player_mode[i]);
                player_mode[i].visible = false;

                player_action[i][4] = player_action[i][4].split("."); //實際判定圖
                for (var j = 0; j < player_action[i][4].length; j++) {
                    player_action[i][4][j] = Ability[player_action[i][4][j]];
                };
                player_action[i][4][player_action[i][4].length] = player_action[i][4][player_action[i][4].length - 1];
                player_ability[i] = new PIXI.extras.AnimatedSprite(player_action[i][4]);
                player_ability[i].scale.set(1);
                player_ability[i].animationSpeed = fps / 60;
                player_ability[i].x = -220;
                ABILITY_stage.addChild(player_ability[i]);
                player_ability[i].visible = false;

            };
            for (let i = 0; i < data["lose"]["pre"].length; i++) {
                data["lose"]["pre"][i] = Mode[data["lose"]["pre"][i]];
            }
            data["lose"]["pre"][data["lose"]["pre"].length] = data["lose"]["pre"][data["lose"]["pre"].length - 1];
            LOSer["pre"] = new PIXI.extras.AnimatedSprite(data["lose"]["pre"]);
            LOSer["pre"].animationSpeed = fps / 60;
            LOSer["pre"].x = -220 * x;
            KO_END.addChild(LOSer["pre"]);
            LOSer["pre"].visible = false;
            for (let i = 0; i < data["lose"]["post"].length; i++) {
                data["lose"]["post"][i] = Mode[data["lose"]["post"][i]];
            }
            data["lose"]["post"][data["lose"]["post"].length] = data["lose"]["post"][data["lose"]["post"].length - 1];
            LOSer["post"] = new PIXI.extras.AnimatedSprite(data["lose"]["post"]);
            LOSer["post"].animationSpeed = fps / 60;
            LOSer["post"].x = -220 * x;
            KO_END.addChild(LOSer["post"]);
            LOSer["post"].visible = false;
            for (let i = 0; i < data["win"]["pre"].length; i++) {
                data["win"]["pre"][i] = Mode[data["win"]["pre"][i]];
            }
            data["win"]["pre"][data["win"]["pre"].length] = data["win"]["pre"][data["win"]["pre"].length - 1];
            WINner["pre"] = new PIXI.extras.AnimatedSprite(data["win"]["pre"]);
            WINner["pre"].animationSpeed = fps / 60;
            WINner["pre"].x = -220 * x;
            KO_END.addChild(WINner["pre"]);
            WINner["pre"].visible = false;
            for (let i = 0; i < data["win"]["post"].length; i++) {
                data["win"]["post"][i] = Mode[data["win"]["post"][i]];
            }
            data["win"]["post"][data["win"]["post"].length] = data["win"]["post"][data["win"]["post"].length - 1];
            WINner["post"] = new PIXI.extras.AnimatedSprite(data["win"]["post"]);
            WINner["post"].animationSpeed = fps / 60;
            WINner["post"].x = -220 * x;
            KO_END.addChild(WINner["post"]);
            WINner["post"].visible = false;


            Mode = null;
            Ability = null;
            MODE_stage.x = stand_vector * x;
            ABILITY_stage.x = stand_vector;
            renderer.stage.addChild(MODE_stage);
            Ability_renderer.stage.addChild(ABILITY_stage);
            //**console.log(player_action);
            　
            let Vittual_event = document.createEvent("KeyboardEvent");
            Vittual_event.initKeyboardEvent("keydown", true, true, document.defaultView);

            renderer.ticker.add(function() {
                Ability_renderer.renderer.view.dispatchEvent(Vittual_event);
                MODE_stage.y = ABILITY_stage.y * x;
                MODE_stage.x = stand_vector * x;
            });

            Ability_renderer.ticker.add(Move = function(delta) {
                delta = (fps / 60);
                if (stand_vector < 0) {
                    speed[0] = 0;
                    MODE_stage.x = 0;
                    ABILITY_stage.x = 0;
                    stand_vector = 0;
                } else if (stand_vector > 220) {
                    speed[0] = 0;
                    MODE_stage.x = 220 * x;
                    ABILITY_stage.x = 220;
                    stand_vector = 220;
                };
                if (faceTo == 0) {
                    stand_vector += Number(speed[0]) * delta;
                } else if (faceTo == 1) {
                    stand_vector -= Number(speed[0]) * delta;
                };
                if (MODE_stage.y > 0) {
                    ABILITY_stage.y = 0;
                    speed[1] = 0;
                } else if (speed[1] != 0) {
                    ABILITY_stage.y -= Number(speed[1]) * delta;
                } else if (MODE_stage.y != 0) {
                    ABILITY_stage.y -= 4 * (Math.abs(ABILITY_stage.y) / ABILITY_stage.y) * delta;
                };
                ABILITY_stage.x = stand_vector;
            });

            let Action_Controller = function(i) {
                var action_key = [];
                var finish_cmd_num = 0;

                var play_fighter = this.play_fighter = async function(n = i) {
                    n = n.toString().split("run ").pop();
                    if (n != "null") {
                        if (faceTo == 0) {
                            MODE_stage.scale.set(1, 1);
                            ABILITY_stage.scale.set(1, 1);
                        } else {
                            MODE_stage.scale.set(-1, 1);
                            ABILITY_stage.scale.set(-1, 1);
                        }
                        player_mode[n].gotoAndPlay(0);
                        player_mode[n].visible = true;
                        //renderer.stage.addChild(player_mode[i][faceTo]);
                        player_ability[n].gotoAndPlay(0);
                        player_ability[n].visible = true;
                        Saction_mode.visible = false;
                        Saction_ability.visible = false;
                        for (let ii = 0; ii < player_mode.length; ii++) {
                            if (ii != n && player_mode[ii].visible != false) {
                                player_mode[ii].visible = false;
                                player_ability[ii].visible = false;
                            }
                        }

                        //Ability_renderer.stage.addChild(player_ability[i][faceTo]);
                    } else {
                        stop_fighter(n);
                    }
                    //**console.log("play : " + n);
                };

                var stop_fighter = this.stop_fighter = async function(n = i) {
                    n = n.toString().split("run ").pop();
                    if (faceTo == 0) {
                        MODE_stage.scale.set(1, 1);
                        ABILITY_stage.scale.set(1, 1);
                    } else {
                        MODE_stage.scale.set(-1, 1);
                        ABILITY_stage.scale.set(-1, 1);
                    }
                    if (n != "null") {
                        player_mode[n].visible = false;
                        player_ability[n].visible = false;
                    }
                    if (combos_status == "null") {
                        Saction_mode.gotoAndPlay(0);
                        Saction_mode.visible = true;
                        Saction_ability.gotoAndPlay(0);
                        Saction_ability.visible = true;
                        //**console.log(Saction_mode);
                        //**console.log(Saction_ability);
                    };

                    /*renderer.stage.removeChild(player_mode[n][0]);
                    renderer.stage.removeChild(player_mode[n][1]);
                    Ability_renderer.stage.removeChild(player_ability[n][0]);
                    Ability_renderer.stage.removeChild(player_ability[n][1]);*/
                    //renderer.stage.removeChildren();
                    //Ability_renderer.stage.removeChildren();
                    //**console.log("stop : " + n);
                };

                {
                    let keypress = [];
                    let keyrelease = [];
                    let DownUp = [];
                    let tt1;
                    let ClearKey = async function() {
                        tt1 = setTimeout(async function() {
                            for (let m = 0; m < player_action[i][1].length; m++) {
                                keyboardJS.unbind(keytransform.KeyCodetoChar(player_action[i][1][m]), keypress[m], keyrelease[m]);
                            }
                            keyboarda(0);
                            ////**console.log("aaaaaa");
                        }, player_action[i][2]);
                    }
                    let tt2;
                    let tt3;
                    this.ComboKey = async function() {
                        stop_fighter(combos_status);
                        play_fighter();
                        if (player_action[i][5][0] != "null") {
                            speed[0] = player_action[i][5][0];
                        }
                        if (player_action[i][5][1] != "null") {
                            speed[1] = player_action[i][5][1];
                        }

                        HP[1] += Change.HP[i];
                        MP[1] += Change.MP[i];
                        if (HP[1] > HP[0]) {
                            HP[1] = HP[0];
                        }
                        if (MP[1] > MP[0]) {
                            MP[1] = MP[0];
                        }

                        tt3 = setTimeout(async function() {
                            if (combos_status == "run " + i) {
                                combos_status = i;
                            }
                        }, 1000 * (player_action[i][3].length - 1) * player_action[i][8] / fps);

                        tt2 = setTimeout(async function() {
                            if (combos_status == i) {
                                combos_status = player_action[i][9];
                                stop_fighter();
                                if (combos_status != "null") {
                                    if (HP[1] >= -1 * Change.HP[combos_status] && MP[1] >= -1 * Change.MP[combos_status]) {
                                        play_fighter(combos_status);
                                        if (player_action[combos_status][5][0] != "null") {
                                            speed[0] = player_action[combos_status][5][0];
                                        }
                                        if (player_action[combos_status][5][1] != "null") {
                                            speed[1] = player_action[combos_status][5][1];
                                        }
                                        Action_Control_Module[combos_status].ComboKey();
                                        combos_status = "run " + combos_status;
                                    } else {
                                        combos_status = "null";
                                        stop_fighter();
                                        speed[0] = 0;
                                        speed[1] = 0;
                                    }
                                } else {
                                    speed[0] = 0;
                                    speed[1] = 0;
                                }
                            }
                        }, 1000 * (player_action[i][3].length - 1) / fps);
                    }
                    let ComboKey = this.ComboKey;

                    let tt4;
                    let tt5;
                    this.HoldKey = async function() {
                        if (combos_status != i) {
                            if (combos_status.toString().split(" ").pop() != "null") {
                                if (player_action[combos_status.toString().split(" ").pop()][5][0] == "null") {
                                    if (player_action[i][5][0] != "null") {
                                        speed[0] = player_action[i][5][0];
                                    }
                                }
                                if (player_action[combos_status.toString().split(" ").pop()][5][1] == "null") {
                                    if (player_action[i][5][1] != "null") {
                                        speed[1] = player_action[i][5][1];
                                    }
                                }
                            } else {
                                if (player_action[i][5][0] != "null") {
                                    speed[0] = player_action[i][5][0];
                                }
                                if (player_action[i][5][1] != "null") {
                                    speed[1] = player_action[i][5][1];
                                }
                            }
                        } else {
                            play_fighter();
                            if (player_action[i][5][0] != "null") {
                                speed[0] = player_action[i][5][0];
                            }
                            if (player_action[i][5][1] != "null") {
                                speed[1] = player_action[i][5][1];
                            }
                        }

                        HP[1] += Change.HP[i];
                        MP[1] += Change.MP[i];
                        if (HP[1] > HP[0]) {
                            HP[1] = HP[0];
                        }
                        if (MP[1] > MP[0]) {
                            MP[1] = MP[0];
                        }
                        tt5 = setTimeout(function() {
                            if (combos_status == "run " + i) {
                                combos_status = i;
                            }
                        }, 1000 * (player_action[i][3].length - 1) * player_action[i][8] / fps)
                        tt4 = setTimeout(function() {
                            if (DownUp[player_action[i][1].length - 1] == "Down" && (player_action[i][7] == faceTo || player_action[i][7] == "null")) {
                                if (combos_status_ck() == "null") {
                                    combos_status = i;
                                    play_fighter();
                                }
                                HoldKey();
                            } else {
                                keyrelease[player_action[i][1].length - 1]();
                                if (combos_status == i) {
                                    combos_status = player_action[i][9];
                                    stop_fighter();
                                    if (combos_status != "null") {
                                        if (HP[1] >= -1 * Change.HP[combos_status] && MP[1] >= -1 * Change.MP[combos_status]) {
                                            play_fighter(combos_status);
                                            if (player_action[combos_status][5][0] != "null") {
                                                speed[0] = player_action[combos_status][5][0];
                                            }
                                            if (player_action[combos_status][5][1] != "null") {
                                                speed[1] = player_action[combos_status][5][1];
                                            }
                                            Action_Control_Module[combos_status].ComboKey();
                                            combos_status = "run " + combos_status;
                                        } else {
                                            combos_status = "null";
                                            stop_fighter();
                                            speed[0] = 0;
                                            speed[1] = 0;
                                        }
                                    } else {
                                        play_fighter(combos_status);
                                        speed[0] = 0;
                                        speed[1] = 0;
                                    }
                                } else if (combos_status_ck() == "null") {
                                    stop_fighter();
                                    if (combos_status.toString().split("run ").pop() != "null") {
                                        Action_Control_Module[combos_status.toString().split("run ").pop()].ComboKey();
                                        play_fighter(combos_status);
                                        speed[0] = player_action[combos_status.toString().split("run ").pop()][5][0];
                                        speed[1] = player_action[combos_status.toString().split("run ").pop()][5][1];
                                    } else {
                                        speed[0] = 0;
                                        speed[1] = 0;
                                    }
                                }
                            }
                        }, 1000 * (player_action[i][3].length - 1) / fps)
                    }
                    let HoldKey = this.HoldKey;

                    let keyboarda = function(j) {
                        if (player_action[i][6] == "1") {
                            keyboardJS.bind(keytransform.KeyCodetoChar(player_action[i][1][j]), keypress[j] = async function() {
                                if (player_action[i][7] == faceTo || player_action[i][7] == "null") {
                                    if (HP[1] >= -1 * Change.HP[i] && MP[1] >= -1 * Change.MP[i]) {
                                        for (let k = 0; k < player_action[i][0].length; k++) {
                                            if (combos_status == player_action[i][0][k]) {
                                                if (DownUp[j] != "Down") {
                                                    DownUp[j] = "Down";
                                                    if (j == player_action[i][1].length - 1) {
                                                        stop_fighter(combos_status);
                                                        play_fighter();
                                                        //**console.log("combos_status  " + combos_status);
                                                        combos_status = "run " + i;
                                                        if (player_action[i][5][0] != "null") {
                                                            speed[0] = player_action[i][5][0];
                                                        }
                                                        if (player_action[i][5][1] != "null") {
                                                            speed[1] = player_action[i][5][1];
                                                        }
                                                        HoldKey();
                                                    }
                                                    //**console.log(keytransform.KeyCodetoChar(player_action[i][1][j]))
                                                }
                                                break;
                                            }
                                        }
                                    }
                                }

                            }, keyrelease[j] = async function() {
                                if (DownUp[j] == "Down") {
                                    DownUp[j] = "Up";
                                    if (player_action[i][7] == faceTo || player_action[i][7] == "null") {
                                        if (HP[1] >= -1 * Change.HP[i] && MP[1] >= -1 * Change.MP[i]) {
                                            for (let k = 0; k < player_action[i][0].length; k++) {
                                                if (combos_status == player_action[i][0][k]) {
                                                    if (j == 0) {
                                                        clearTimeout(tt1);
                                                        ClearKey();
                                                    }
                                                    //**console.log(keytransform.KeyCodetoChar(player_action[i][1][j]))
                                                    if (j < player_action[i][1].length - 1) {
                                                        keyboardJS.unbind(keytransform.KeyCodetoChar(player_action[i][1][j]), keypress[j], keyrelease[j]);
                                                        keyboarda(j + 1);
                                                    } else if (j == player_action[i][1].length - 1 && player_action[i][1].length != 1) {
                                                        keyboardJS.unbind(keytransform.KeyCodetoChar(player_action[i][1][j]), keypress[j], keyrelease[j]);
                                                        keyboarda(0);
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            })
                        } else if (player_action[i][6] == "0") {
                            keyboardJS.bind(keytransform.KeyCodetoChar(player_action[i][1][j]), keypress[j] = async function() {
                                if (player_action[i][7] == faceTo || player_action[i][7] == "null") {
                                    if (HP[1] >= -1 * Change.HP[i] && MP[1] >= -1 * Change.MP[i]) {
                                        if (DownUp[j] != "Down") {
                                            DownUp[j] = "Down";
                                            for (let k = 0; k < player_action[i][0].length; k++) {
                                                if (combos_status == player_action[i][0][k]) {
                                                    if (j == player_action[i][1].length - 1) {
                                                        stop_fighter(combos_status);
                                                        play_fighter();
                                                        //**console.log("combos_status  " + combos_status);
                                                        combos_status = "run " + i;
                                                        ComboKey();
                                                    }
                                                    //**console.log(keytransform.KeyCodetoChar(player_action[i][1][j]))
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }

                            }, keyrelease[j] = async function() {
                                if (player_action[i][7] == faceTo || player_action[i][7] == "null") {
                                    if (HP[1] >= -1 * Change.HP[i] && MP[1] >= -1 * Change.MP[i]) {
                                        if (DownUp[j] == "Down") {
                                            DownUp[j] = "Up";
                                            for (let k = 0; k < player_action[i][0].length; k++) {
                                                if (combos_status == player_action[i][0][k]) {
                                                    if (j == 0) {
                                                        clearTimeout(tt1);
                                                        ClearKey();
                                                    }
                                                    //**console.log(keytransform.KeyCodetoChar(player_action[i][1][j]))
                                                    if (j < player_action[i][1].length - 1) {
                                                        keyboardJS.unbind(keytransform.KeyCodetoChar(player_action[i][1][j]), keypress[j], keyrelease[j]);
                                                        keyboarda(j + 1);
                                                    } else if (j == player_action[i][1].length - 1 && player_action[i][1].length != 1) {
                                                        keyboardJS.unbind(keytransform.KeyCodetoChar(player_action[i][1][j]), keypress[j], keyrelease[j]);
                                                        keyboarda(0);
                                                    }
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            })
                        }
                    }
                    keyboarda(0);
                }
            };

            this.controller = async function() {
                for (var i = 0; i < player_action.length; i++) {
                    Action_Control_Module[i] = new Action_Controller(i);
                }
                renderer.stage.removeChild(MODE_stage);
                renderer.stage.addChild(MODE_stage);
                Action_Control_Module[0].stop_fighter();
            };
        };
    };
    let decide = this.decide = async function(fighter1, fighter2, isHELPER = false, VS_isHELPER = false) {
        let decideWORKER = new Worker("./include/Fight.decide.worker.js");
        //"func":調用的function名稱: "asyncComputeDamage"
        //"args":參數:[受擊腳色判定圖,敵方角色判定圖,分成n塊做判定,受擊腳色代稱,敵方角色代稱,判定第A塊(省略則為1)]
        decideWORKER.onmessage = function(e) {
            if (e.data[1] == "fighter1" && e.data[2] == "fighter2") {
                onmessage_decide(fighter1, fighter2, e);
            } else {
                onmessage_decide(fighter2, fighter1, e);
            }
        };
        let onmessage_decide = function(THIS_fight, VS_fight, e) {
            if (e.data[0] == "Be Defence Break") { //被破防
                VS_fight.attack();
                renderer.stage.removeChild(VS_fight.MODE_stage);
                renderer.stage.addChild(VS_fight.MODE_stage);
                THIS_fight.hurt(0);
                Shake();
            } else if (e.data[0] == "Break Attack") { //破敵攻擊
                renderer.stage.removeChild(VS_fight.MODE_stage);
                renderer.stage.addChild(VS_fight.MODE_stage);
                VS_fight.hurt(0);
                THIS_fight.hurt(0, true);
                Shake();
            } else if (e.data[0] == "offset") { //攻防相消
                VS_fight.attack();
                renderer.stage.removeChild(VS_fight.MODE_stage);
                renderer.stage.addChild(VS_fight.MODE_stage);
                THIS_fight.hurt(0, true);
                Shake();
            } else if (e.data[0] == "impact") { //角色碰撞
                if (THIS_fight.speed()[0] != 0 || (THIS_fight.speed()[0] == 0 && VS_fight.speed()[0] == 0)) {
                    if (THIS_fight.stand_vector() > VS_fight.stand_vector()) {
                        THIS_fight.stand_vector(THIS_fight.stand_vector() + 0.05);
                    } else if (THIS_fight.stand_vector() <= VS_fight.stand_vector()) {
                        THIS_fight.stand_vector(THIS_fight.stand_vector() - 0.05);
                    }
                } else {
                    if (THIS_fight.stand_vector() > VS_fight.stand_vector()) {
                        THIS_fight.stand_vector(THIS_fight.stand_vector() + 0.01);
                    } else if (THIS_fight.stand_vector() <= VS_fight.stand_vector()) {
                        THIS_fight.stand_vector(THIS_fight.stand_vector() - 0.01);
                    }
                }
            } else {
                if (e.data[0] != 0) {
                    Shake();
                    renderer.stage.removeChild(VS_fight.MODE_stage);
                    renderer.stage.addChild(VS_fight.MODE_stage);
                    THIS_fight.hurt(e.data[0]);
                    VS_fight.attack();
                }
            }
        }


        var p1_Ability_renderer = fighter1.Read_Ability_renderer();
        var p2_Ability_renderer = fighter2.Read_Ability_renderer();
        var gl = [];
        gl[0] = p1_Ability_renderer.view.getContext("webgl");
        gl[1] = p2_Ability_renderer.view.getContext("webgl");
        var pixels = [];
        pixels[0] = new Uint8Array(gl[0].drawingBufferWidth * gl[0].drawingBufferHeight * 4);
        pixels[1] = new Uint8Array(gl[1].drawingBufferWidth * gl[1].drawingBufferHeight * 4);

        let p1_fps = 0;
        let p2_fps = 0;
        renderer.ticker.add(async function() {
            p1_fps += fighter1.fps / 60;
            p2_fps += fighter2.fps / 60;
            if (!VS_isHELPER) {
                if (isHELPER) {
                    if (fighter1.combos_status() == "null") {
                        if (fighter1.stand_vector() >= fighter2.stand_vector()) {
                            fighter1.faceTo(1);
                        } else {
                            fighter1.faceTo(0);
                        };
                    };
                } else {
                    if (fighter1.stand_vector() >= fighter2.stand_vector()) {
                        fighter1.faceTo(1);
                    } else {
                        fighter1.faceTo(0);
                    };
                }

            }
            if (!isHELPER) {
                if (VS_isHELPER) {
                    if (fighter2.combos_status() == "null") {
                        if (fighter2.stand_vector() >= fighter1.stand_vector()) {
                            fighter2.faceTo(1);
                        } else {
                            fighter2.faceTo(0);
                        };
                    };
                } else {
                    if (fighter2.stand_vector() >= fighter1.stand_vector()) {
                        fighter2.faceTo(1);
                    } else {
                        fighter2.faceTo(0);
                    };
                };

            }
            gl[0].readPixels(0, 0, gl[0].drawingBufferWidth, gl[0].drawingBufferHeight, gl[0].RGBA, gl[0].UNSIGNED_BYTE, pixels[0]);
            gl[1].readPixels(0, 0, gl[1].drawingBufferWidth, gl[1].drawingBufferHeight, gl[1].RGBA, gl[1].UNSIGNED_BYTE, pixels[1]);
            if (p1_fps >= 1) {
                p1_fps -= 1;

                //pixels[][4*n]==>攻擊塊，pixels[][4*n+1]==>受擊區，pixels[][4*n+2]==>防禦塊
                decideWORKER.postMessage({ "func": "asyncComputeDamage", "args": [pixels[0], pixels[1], 1, "fighter1", "fighter2"] });
            }
            if (p2_fps >= 1) {
                p2_fps -= 1;

                //pixels[][4*n]==>攻擊塊，pixels[][4*n+1]==>受擊區，pixels[][4*n+2]==>防禦塊
                decideWORKER.postMessage({ "func": "asyncComputeDamage", "args": [pixels[1], pixels[0], 1, "fighter2", "fighter1"] });
            }
        })

        async function Shake() {
            if (renderer.stage.x == 0) {
                let i = 3 * Math.floor(x);
                let Timer = setTimeout(active, 0);

                async function active() {
                    if (i >= 0) {
                        renderer.stage.x = 0;
                        i % (2) == 0 ? renderer.stage.x = -i : renderer.stage.x = i;
                        i--;
                        Timer = setTimeout(active, 0);
                    } else {
                        clearTimeout(Timer);
                    };
                };
            }
        };

        if (!isHELPER && !VS_isHELPER) {
            /*****************
             * 名字顯示
             *****************/
            let style = new PIXI.TextStyle({
                fontFamily: 'Microsoft JhengHei',
                fontSize: 5 * x,
                //fontStyle: 'italic',
                fontWeight: 'bold',
                fill: ['#ffffff', '#ffffff'], // gradient
                stroke: false,
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: false,
                //dropShadowBlur: x * 2 / 3,
                //dropShadowAngle: x / 3,
                dropShadowDistance: x * 3 / 4,
                wordWrap: false,
                wordWrapWidth: 440
            });

            let fighter1_NAME_text = new PIXI.Text(fighter1.fighter_name, style);
            fighter1_NAME_text.x = 65 * x;
            fighter1_NAME_text.y = 22 * x;
            fighter1_NAME_text.anchor.set(0.5);
            renderer.stage.addChild(fighter1_NAME_text);

            let fighter2_NAME_text = new PIXI.Text(fighter2.fighter_name, style);
            fighter2_NAME_text.x = 155 * x;
            fighter2_NAME_text.y = 22 * x;
            fighter2_NAME_text.anchor.set(0.5);
            renderer.stage.addChild(fighter2_NAME_text);
            /*****************
             *HP條
             *MP條
             *****************/
            let fighter1_HP = [3];
            let fighter2_HP = [3];
            let fighter1_MP = [3];
            let fighter2_MP = [3];
            /***********/
            fighter1_HP[0] = new PIXI.Graphics();
            renderer.stage.addChild(fighter1_HP[0]);
            fighter1_HP[0].beginFill(0, 1);
            fighter1_HP[0].drawRect(30.4 * x, 5.4 * x, 69.2 * x, 4.2 * x);

            fighter1_HP[1] = new PIXI.Graphics();
            renderer.stage.addChild(fighter1_HP[1]);
            fighter1_HP[1].beginFill(0x222255, 1);
            fighter1_HP[1].drawRect(0, 0, 68 * x, 3 * x);
            fighter1_HP[1].x = 31 * x;
            fighter1_HP[1].y = 6 * x;
            fighter1_HP[1].width = 0;

            fighter1_HP[2] = new PIXI.Graphics();
            renderer.stage.addChild(fighter1_HP[2]);
            fighter1_HP[2].beginFill(0xff2222, 1);
            fighter1_HP[2].drawRect(0, 0, 68 * x, 3 * x);
            fighter1_HP[2].x = 31 * x;
            fighter1_HP[2].y = 6 * x;
            fighter1_HP[2].width = 0;
            /****************/
            fighter2_HP[0] = new PIXI.Graphics();
            renderer.stage.addChild(fighter2_HP[0]);
            fighter2_HP[0].beginFill(0, 1);
            fighter2_HP[0].drawRect(120.4 * x, 5.4 * x, 69.2 * x, 4.2 * x);

            fighter2_HP[1] = new PIXI.Graphics();
            renderer.stage.addChild(fighter2_HP[1]);
            fighter2_HP[1].beginFill(0x222255, 1);
            fighter2_HP[1].drawRect(0, 0, 68 * x, 3 * x);
            fighter2_HP[1].x = 121 * x;
            fighter2_HP[1].y = 6 * x;
            fighter2_HP[1].width = 0;

            fighter2_HP[2] = new PIXI.Graphics();
            renderer.stage.addChild(fighter2_HP[2]);
            fighter2_HP[2].beginFill(0xff2222, 1);
            fighter2_HP[2].drawRect(0, 0, 68 * x, 3 * x);
            fighter2_HP[2].x = 121 * x;
            fighter2_HP[2].y = 6 * x;
            fighter2_HP[2].width = 0;
            /****************/
            fighter1_MP[0] = new PIXI.Graphics();
            renderer.stage.addChild(fighter1_MP[0]);
            fighter1_MP[0].beginFill(0, 1);
            fighter1_MP[0].drawRect(30.4 * x, 12.4 * x, 69.2 * x, 2.2 * x);

            fighter1_MP[1] = new PIXI.Graphics();
            renderer.stage.addChild(fighter1_MP[1]);
            fighter1_MP[1].beginFill(0x222255, 1);
            fighter1_MP[1].drawRect(0, 0, 68 * x, 1 * x);
            fighter1_MP[1].x = 31 * x;
            fighter1_MP[1].y = 13 * x;
            fighter1_MP[1].width = 0;

            fighter1_MP[2] = new PIXI.Graphics();
            renderer.stage.addChild(fighter1_MP[2]);
            fighter1_MP[2].beginFill(0x5555ff, 1);
            fighter1_MP[2].drawRect(0, 0, 88 * x, 1 * x);
            fighter1_MP[2].x = 31 * x;
            fighter1_MP[2].y = 13 * x;
            fighter1_MP[2].width = 0;
            /****************/
            fighter2_MP[0] = new PIXI.Graphics();
            renderer.stage.addChild(fighter2_MP[0]);
            fighter2_MP[0].beginFill(0, 1);
            fighter2_MP[0].drawRect(120.4 * x, 12.4 * x, 69.2 * x, 2.2 * x);

            fighter2_MP[1] = new PIXI.Graphics();
            renderer.stage.addChild(fighter2_MP[1]);
            fighter2_MP[1].beginFill(0x222255, 1);
            fighter2_MP[1].drawRect(0, 0, 68 * x, 1 * x);
            fighter2_MP[1].x = 121 * x;
            fighter2_MP[1].y = 13 * x;
            fighter2_MP[1].width = 0;

            fighter2_MP[2] = new PIXI.Graphics();
            renderer.stage.addChild(fighter2_MP[2]);
            fighter2_MP[2].beginFill(0x5555ff, 1);
            fighter2_MP[2].drawRect(0, 0, 68 * x, 1 * x);
            fighter2_MP[2].x = 121 * x;
            fighter2_MP[2].y = 13 * x;
            fighter2_MP[2].width = 0;
            /****************/
            fighter1.avatar.x = (fighter1.stand_vector() - 220) * x / 4;
            renderer.stage.addChild(fighter1.avatar);
            fighter2.avatar.scale.set(-1 / 4, 1 / 4);
            fighter2.avatar.x = 220 * x + (fighter2.stand_vector() * x / 4);
            renderer.stage.addChild(fighter2.avatar);
            /****************/
            renderer.ticker.add(async function() {
                fighter1_HP[2].width = 68 * x * (1 - ((fighter1.HP()[0] - fighter1.HP()[1]) / fighter1.HP()[0]));
                if (fighter1_HP[1].width > fighter1_HP[2].width && fighter1_HP[1].width > 0) {
                    fighter1_HP[1].width -= 0.5 * x;
                } else if (fighter1_HP[1].width < fighter1_HP[2].width) {
                    fighter1_HP[1].width = fighter1_HP[2].width;
                }
                if (fighter1_HP[1].width < 0) {
                    fighter1_HP[1].width = 0;
                }
                /*****************/
                fighter2_HP[2].x = 121 * x + 68 * x * (fighter2.HP()[0] - fighter2.HP()[1]) / fighter2.HP()[0];
                fighter2_HP[2].width = 68 * x * (1 - ((fighter2.HP()[0] - fighter2.HP()[1]) / fighter2.HP()[0]));
                if (fighter2_HP[1].width > fighter2_HP[2].width && fighter2_HP[1].width > 0) {
                    fighter2_HP[1].x += 0.5 * x;
                    fighter2_HP[1].width -= 0.5 * x;
                } else if (fighter2_HP[1].width < fighter2_HP[2].width) {
                    fighter2_HP[1].width = fighter2_HP[2].width;
                    fighter2_HP[1].x = fighter2_HP[2].x;
                }
                if (fighter2_HP[1].width < 0) {
                    fighter2_HP[1].width = 0;
                }
                /****************************************/
                fighter1_MP[2].width = 68 * x * (1 - ((fighter1.MP()[0] - fighter1.MP()[1]) / fighter1.MP()[0]));
                if (fighter1_MP[1].width > fighter1_MP[2].width && fighter1_MP[1].width > 0) {
                    fighter1_MP[1].width -= 0.5 * x;
                } else if (fighter1_MP[1].width < fighter1_MP[2].width) {
                    fighter1_MP[1].width = fighter1_MP[2].width;
                }
                if (fighter1_MP[1].width < 0) {
                    fighter1_MP[1].width = 0;
                }
                /*****************/
                fighter2_MP[2].x = 121 * x + 68 * x * (fighter2.MP()[0] - fighter2.MP()[1]) / fighter2.MP()[0];
                fighter2_MP[2].width = 68 * x * (1 - ((fighter2.MP()[0] - fighter2.MP()[1]) / fighter2.MP()[0]));
                if (fighter2_MP[1].width > fighter2_MP[2].width && fighter2_MP[1].width > 0) {
                    fighter2_MP[1].x += 0.5 * x;
                    fighter2_MP[1].width -= 0.5 * x;
                } else if (fighter2_MP[1].width < fighter2_MP[2].width) {
                    fighter2_MP[1].width = fighter2_MP[2].width;
                    fighter2_MP[1].x = fighter2_MP[2].x;
                }
                if (fighter2_MP[1].width < 0) {
                    fighter2_MP[1].width = 0;
                }
                /*****************/
            });

            let K_O_ = new PIXI.TextStyle({
                fontFamily: 'Microsoft JhengHei',
                fontSize: 20 * x,
                //fontStyle: 'italic',
                fontWeight: 'bold',
                fill: ['#ffffff', '#ffffff'], // gradient
                stroke: false,
                strokeThickness: 5,
                dropShadow: true,
                dropShadowColor: false,
                //dropShadowBlur: x * 2 / 3,
                //dropShadowAngle: x / 3,
                dropShadowDistance: x * 3 / 4,
                wordWrap: false,
                wordWrapWidth: 440
            });
            let KO__check;
            renderer.ticker.add(KO__check = async function() {
                if (fighter1.HP()[1] == 0 && fighter2.HP()[1] == 0) {
                    var richText = new PIXI.Text('Draw', K_O_);
                    richText.x = 110 * x;
                    richText.y = 60 * x;
                    richText.anchor.set(0.5);

                    renderer.stage.addChild(richText);
                    fighter1.Game_Over();
                    fighter2.Game_Over();
                    renderer.ticker.remove(KO__check);
                } else if (fighter1.HP()[1] == 0 && fighter2.HP()[1] != 0) {
                    var richText = new PIXI.Text(fighter2.fighter_name + ' win', K_O_);
                    richText.x = 110 * x;
                    richText.y = 60 * x;
                    richText.anchor.set(0.5);

                    renderer.stage.addChild(richText);
                    fighter1.Game_Over();
                    fighter2.Game_Over();
                    renderer.ticker.remove(KO__check);
                } else if (fighter1.HP()[1] != 0 && fighter2.HP()[1] == 0) {
                    var richText = new PIXI.Text(fighter1.fighter_name + ' win', K_O_);
                    richText.x = 110 * x;
                    richText.y = 60 * x;
                    richText.anchor.set(0.5);

                    renderer.stage.addChild(richText);
                    fighter1.Game_Over();
                    fighter2.Game_Over();
                    renderer.ticker.remove(KO__check);
                }
            });
        };
    };
    let HELPER = this.HELPER = async function(THIS_fighter, THIS_helper, VS_fighter) {
        decide(THIS_helper, VS_fighter, true);
        renderer.ticker.add(async function() {
            if (THIS_helper.combos_status(true) == "null") {
                THIS_helper.stand_vector(THIS_fighter.stand_vector());
            };
            THIS_helper.MP(THIS_fighter.MP());
            THIS_helper.HP(THIS_fighter.HP());
        });
        let HELPER_control;
        renderer.ticker.add(HELPER_control = async function() {
            if (THIS_fighter.HP()[1] == 0 || VS_fighter.HP()[1] == 0) {
                THIS_helper.Game_Over();
                renderer.ticker.remove(HELPER_control);
            }
        });
    }
    let BACKground = this.BACKground = async function(fighter1, fighter2, BACKground_char, fighter1_HELPER, fighter2_HELPER) {
        let BACKground_vector = 110;
        let timerr = 1 //25;
        let HELPER_vector = [2];
        HELPER_vector[0] = [];
        HELPER_vector[1] = [];

        renderer.ticker.add(async function() {
            if (fighter1_HELPER != null) {
                for (let i = 0; i < fighter1_HELPER.length; i++) {
                    HELPER_vector[0][i] = fighter1_HELPER[i].stand_vector() - 110 + BACKground_vector;
                }
            }
            if (fighter2_HELPER != null) {
                for (let i = 0; i < fighter2_HELPER.length; i++) {
                    HELPER_vector[1][i] = fighter2_HELPER[i].stand_vector() - 110 + BACKground_vector;
                }
            }


            if (fighter1.stand_vector() != (110 + (fighter1.stand_vector() - fighter2.stand_vector()) / 2)) {
                if (fighter1.stand_vector() >= 0 && fighter1.stand_vector() <= 220 && fighter2.stand_vector() >= 0 && fighter2.stand_vector() <= 220) {
                    BACKground_vector += (fighter1.stand_vector() - (110 + (fighter1.stand_vector() - fighter2.stand_vector()) / 2));
                }
                if (BACKground_vector < 0) {
                    BACKground_vector = 0;
                } else if (BACKground_vector > 220) {
                    BACKground_vector = 220;
                }
                if (BACKground_vector > 0 && BACKground_vector < 220) {
                    if (fighter1_HELPER != null) {
                        for (let i = 0; i < fighter1_HELPER.length; i++) {
                            fighter1_HELPER[i].stand_vector(HELPER_vector[0][i] + 110 - BACKground_vector);
                        }
                    }
                    if (fighter2_HELPER != null) {
                        for (let i = 0; i < fighter2_HELPER.length; i++) {
                            fighter2_HELPER[i].stand_vector(HELPER_vector[1][i] + 110 - BACKground_vector);
                        }
                    }
                    BACKground_char.stand_vector(220 - BACKground_vector)
                    let temp_fighter1_stand_vector = fighter1.stand_vector()
                    fighter1.stand_vector(fighter1.stand_vector() - ((fighter1.stand_vector() - (110 + (fighter1.stand_vector() - fighter2.stand_vector()) / 2)) / timerr));
                    fighter2.stand_vector(fighter2.stand_vector() - ((fighter2.stand_vector() - (110 + (fighter2.stand_vector() - temp_fighter1_stand_vector) / 2)) / timerr));
                }
            }

        })
    }
};