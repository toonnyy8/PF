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


onmessage = function(e) {
    if (e.data.func == "asyncComputeDamage") {
        e.data.args[5] = e.data.args[5] || 1;
        let _compute_array_1 = function(i) {
            return e.data.args[0][i];
        };
        let _compute_array_2 = function(i) {
            return e.data.args[1][i];
        };
        let block_num = e.data.args[2];
        let THIS_fight = e.data.args[3];
        let VS_fight = e.data.args[4];
        let block_no = e.data.args[5];

        let _POSTMESSAGE_BeDefenceBreak = function() {
            postMessage(["Be Defence Break", THIS_fight, VS_fight]);
        };
        let _POSTMESSAGE_BreakAttack = function() {
            postMessage(["Break Attack", THIS_fight, VS_fight]);
        };
        let _POSTMESSAGE_Offset = function() {
            postMessage(["offset", THIS_fight, VS_fight]);
        };
        let _POSTMESSAGE_Impact = function() {
            postMessage(["impact", THIS_fight, VS_fight]);
        };
        let _POSTMESSAGE_Damage = function(damage) {
            postMessage([damage, THIS_fight, VS_fight]);

        };

        WebAssembly_Loader('./resources/app/include/decide_wasm.wasm', {
            env: {
                _compute_array_1,
                _compute_array_2,
                _POSTMESSAGE_BeDefenceBreak,
                _POSTMESSAGE_BreakAttack,
                _POSTMESSAGE_Offset,
                _POSTMESSAGE_Impact,
                _POSTMESSAGE_Damage
            }
        }).__Compute__(block_num, block_no, e.data.args[0].length);
    };
}