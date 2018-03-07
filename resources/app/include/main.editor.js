//主程式
/// <reference path=".\typings\globals\pixi.js\index.d.ts" />
exports.main = function(x = 1) {
    var editor = new Editor.Editor(x);
    editor.editor_open();
    editor.Chara_sharder();

    var file_type = 'mode';

    window.onkeydown = function() {
        var keycode = event.which || event.keyCode;
        if (keycode == 49) {
            editor.editor_open();
            editor.Chara_sharder();
            editor.Chara_editor();
            file_type = 'mode';
        } else if (keycode == 50) {
            editor.editor_open();
            editor.Ability_sharder();
            editor.Ability_editor();
            file_type = 'ability';
        } else if (keycode == 51) {
            editor.editor_open();
            editor.Save_File(file_type);
        }
        if (event.keyCode == 27) {
            window.history.back();
        };
    };
};