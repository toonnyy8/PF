//主程式
/// <reference path=".\typings\globals\pixi.js\index.d.ts" />
exports.main = function(x = 1, fighter_name_1 = 'player1', fighter_name_2 = 'player1', background_name = 'background', stand_1 = 50, stand_2 = 170) {
    /*
     *建置對戰控制器
     */
    var fight = new Fight.Fight(x);
    /*
     *建置角色1
     */
    var fps = fs.readFileSync("./resources/app/chara/" + fighter_name_1 + "/player.json", 'utf8');
    fps = JSON.parse(fps);
    fps = fps["FPS"];
    var fighter1 = new fight.fighter(fighter_name_1, fps, stand_1);
    /*
     *建置角色2
     */
    fps = fs.readFileSync("./resources/app/chara/" + fighter_name_2 + "/player.json", 'utf8');
    fps = JSON.parse(fps);
    fps = fps["FPS"];
    var fighter2 = new fight.fighter(fighter_name_2, fps, stand_2, 1);
    /*
     *建置背景
     */
    fps = fs.readFileSync("./resources/app/chara/" + background_name + "/player.json", 'utf8');
    fps = JSON.parse(fps);
    fps = fps["FPS"];
    let background_char = new fight.fighter(background_name, fps, 110, 0);
    background_char.fighter_Ability_close();
    background_char.controller();

    /*
     *建置角色1的helper
     */
    let fighter1_Helper_name = JSON.parse(fs.readFileSync("./resources/app/chara/" + fighter_name_1 + "/player.json", 'utf8'))["Helper"];
    if (fighter1_Helper_name != null) {
        var fighter1_Helper = [];
        for (let i = 0; i < fighter1_Helper_name.length; i++) {
            fps = fs.readFileSync("./resources/app/chara/" + fighter1_Helper_name[i] + "/player.json", 'utf8');
            fps = JSON.parse(fps);
            fps = fps["FPS"];
            fighter1_Helper[i] = new fight.fighter(fighter1_Helper_name[i], fps, stand_1);
            fighter1_Helper[i].fighter_Ability_close();
            fighter1_Helper[i].controller(event);
            fight.HELPER(fighter1, fighter1_Helper[i], fighter2);
        };
    };
    /*
     *建置角色2的helper
     */
    let fighter2_Helper_name = JSON.parse(fs.readFileSync("./resources/app/chara/" + fighter_name_2 + "/player.json", 'utf8'))["Helper"];
    if (fighter2_Helper_name != null) {
        var fighter2_Helper = [];
        for (let i = 0; i < fighter2_Helper_name.length; i++) {
            fps = fs.readFileSync("./resources/app/chara/" + fighter2_Helper_name[i] + "/player.json", 'utf8');
            fps = JSON.parse(fps);
            fps = fps["FPS"];
            fighter2_Helper[i] = new fight.fighter(fighter2_Helper_name[i], fps, stand_2);
            fighter2_Helper[i].fighter_Ability_close();
            fighter2_Helper[i].controller(event);
            fight.HELPER(fighter2, fighter2_Helper[i], fighter1);
        };
    };

    if (fighter1_Helper_name != null && fighter2_Helper_name != null) {
        for (let i = 0; i < fighter1_Helper_name.length; i++) {
            for (let j = 0; j < fighter2_Helper_name.length; j++) {
                fight.decide(fighter1_Helper[i], fighter2_Helper[j], true, true);
            }
        }
    }

    fps = null;

    fighter1.fighter_Ability_close();
    fighter2.fighter_Ability_close();

    fight.BACKground(fighter1, fighter2, background_char, fighter1_Helper, fighter2_Helper);

    fight.decide(fighter1, fighter2);
    fight.fight_open();

    fighter1.controller(event);
    fighter2.controller(event);
};