//js函數彙整
/// <reference path=".\include\typings\globals\pixi.js\index.d.ts" />
/*************************************************************************************************************************/
/*require("babel-register")({
    "presets": ["es2015", "stage-0"]
});
require('babel-polyfill');*/

var screen_scale = 0.9;

var fs = require("fs");
var PIXI = require("pixi.js");
var keyboardJS = require("keyboardJS");
var keytransform = new require("./include/keytransform.js");
var Fight = require("./include/Fight.js");
var main = {};
main.fight = require("./include/main.fight.js");

const ipcRenderer = require('electron').ipcRenderer;
keyboardJS.bind('f11', function() {
    ipcRenderer.send('full-screen');
});
keyboardJS.bind('f12', function() {
    ipcRenderer.send('DevTools');
});
/*var aaaa = ["a"];
let keycombo = [];
let tt1;
let t = function () {
    tt1 = setTimeout(function () {
        for (let m = 0; m < aaaa.length; m++) {
            keyboardJS.unbind(aaaa[m], keycombo[m])
        }
        keyboarda(0);
        console.log("aaaaaa");

    }, 1000);
}

var keyboarda = function (j) {
    keyboardJS.bind(aaaa[j], keycombo[j] = function () {
        if (j == 0) {
            clearTimeout(tt1);
            t()
        }
        console.log(j)
        if (j < aaaa.length - 1) {
            keyboarda(j + 1);
            keyboardJS.unbind(aaaa[j], keycombo[j])
        } else if (j == aaaa.length - 1&&j!=0) {
            keyboarda(0);
            keyboardJS.unbind(aaaa[j], keycombo[j])
        }
    })
}
keyboarda(0);*/