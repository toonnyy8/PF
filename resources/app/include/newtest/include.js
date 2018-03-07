//js函數彙整
/// <reference path="../..\include\typings\globals\pixi.js\index.d.ts" />
/*************************************************************************************************************************/
/*require("babel-register")({
    "presets": ["es2015", "stage-0"]
});
require('babel-polyfill');*/

var fs = require("fs");
var PIXI = require("../pixi.js");
var keyboardJS = require("keyboardJS");
var screen_scale = 0.9;

{
    /*******************************************
        非同步式wasm調用
    *******************************************/

    let fetchAndInstantiateWasm = function(url, imports) {
        const {
            webFrame
        } = require('electron');
        webFrame.registerURLSchemeAsPrivileged('file');

        return fetch(url) // url could be your .wasm file
            .then(res => {
                if (res.ok) {
                    return res.arrayBuffer();
                } else {
                    throw new Error(`Unable to fetch Web Assembly file ${url}.`);
                }
            })
            .then(bytes => WebAssembly.compile(bytes))
            .then(module => {
                imports = imports || {};
                imports.env = imports.env || {};
                imports.env.memoryBase = imports.env.memoryBase || 0;
                imports.env.tableBase = imports.env.tableBase || 0;
                if (!imports.env.memory) {
                    imports.env.memory = new WebAssembly.Memory({
                        initial: 256,
                    });
                }
                if (!imports.env.table) {
                    imports.env.table = new WebAssembly.Table({
                        initial: 0,
                        element: 'anyfunc'
                    });
                }
                return WebAssembly.instantiate(module, imports || {});
            })
            .then(instance => instance.exports);
    }

    /*fetchAndInstantiateWasm('./add.wasm', {})
        .then(m => {
            console.log(m.add(50, 10));
        });*/
}

{
    /*******************************************
        同步式wasm調用
    *******************************************/
    let WebAssembly_Loader = function(url, imports) {
        let fs = require("fs");
        let wasm_code = fs.readFileSync(url);
        //console.log(wasm_code);
        imports = imports || {};
        imports.env = imports.env || {};
        imports.env.memoryBase = imports.env.memoryBase || 0;
        imports.env.tableBase = imports.env.tableBase || 0;
        if (!imports.env.memory) {
            imports.env.memory = new WebAssembly.Memory({
                initial: 256,
            });
        }
        if (!imports.env.table) {
            imports.env.table = new WebAssembly.Table({
                initial: 0,
                element: 'anyfunc'
            });
        }
        return WebAssembly.Instance(WebAssembly.Module(wasm_code), imports).exports;
    }

    /*console.log(WebAssembly_Loader("./resources/app/include/newtest/test.wasm").aaa(17, 8));
    let test = new WebAssembly_Loader("./resources/app/include/newtest/test.wasm");
    console.log(test.aaa(2, 3));*/
}