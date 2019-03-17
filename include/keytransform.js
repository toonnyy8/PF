
let keyname = [];
for (let i = 65; i <= 90; i += 1) {
    keyname[i] = String.fromCharCode(i + 32);
}
keyname[3] = 'cancel';
keyname[8] = 'backspace';
keyname[9] = 'tab';
keyname[12] = 'clear';
keyname[13] = 'enter';
keyname[16] = 'shift';
keyname[17] = 'ctrl';
keyname[18] = 'alt';
keyname[19] = 'pause';
keyname[20] = 'capslock';
keyname[27] = 'escape';
keyname[32] = 'space';
keyname[33] = 'pageup';
keyname[34] = 'pagedown';
keyname[35] = 'end';
keyname[36] = 'home';
keyname[37] = 'left';
keyname[38] = 'up';
keyname[39] = 'right';
keyname[40] = 'down';
keyname[41] = 'select';
keyname[42] = 'printscreen';
keyname[43] = 'execute';
keyname[44] = 'snapshot';
keyname[45] = 'insert';
keyname[46] = 'delete';
keyname[47] = 'help';
keyname[145] = 'scrolllock';
keyname[187] = '=';
keyname[188] = ',';
keyname[190] = '.';
keyname[191] = '/';
keyname[192] = '`';
keyname[219] = '[';
keyname[220] = '\\';
keyname[221] = ']';
keyname[222] = '\'';

// 0-9
keyname[48] = '0';
keyname[49] = '1';
keyname[50] = '2';
keyname[51] = '3';
keyname[52] = '4';
keyname[53] = '5';
keyname[54] = '6';
keyname[55] = '7';
keyname[56] = '8';
keyname[57] = '9';

// numpad
keyname[96] = 'num0';
keyname[97] = 'num1';
keyname[98] = 'num2';
keyname[99] = 'num3';
keyname[100] = 'num4';
keyname[101] = 'num5';
keyname[102] = 'num6';
keyname[103] = 'num7';
keyname[104] = 'num8';
keyname[105] = 'num9';
keyname[106] = 'num*';
keyname[107] = 'num+';
keyname[108] = 'numenter';
keyname[109] = 'num-';
keyname[110] = 'num.';
keyname[111] = 'num/';
keyname[144] = 'num';

// function keys
keyname[112] = 'f1';
keyname[113] = 'f2';
keyname[114] = 'f3';
keyname[115] = 'f4';
keyname[116] = 'f5';
keyname[117] = 'f6';
keyname[118] = 'f7';
keyname[119] = 'f8';
keyname[120] = 'f9';
keyname[121] = 'f10';
keyname[122] = 'f11';
keyname[123] = 'f12';

exports.KeyCodetoChar = function (keyvalue) {


    let temp = "";
    for (let i = 0; i < keyvalue.split("+").length; i++) {
        if (keyname[keyvalue.split("+")[i]] != undefined || keyname[keyvalue.split("+")[i]] != null) {
            temp += keyname[keyvalue.split("+")[i]];
        } else {
            for (let j = 0; j < keyvalue.split("+")[i].split(">").length; j++) {
                if (keyname[keyvalue.split("+")[i].split(">")[j]] != undefined || keyname[keyvalue.split("+")[i].split(">")[j]] != null) {
                    temp += keyname[keyvalue.split("+")[i].split(">")[j]];
                } else {
                    temp += keyvalue.split("+")[i].split(">")[j];
                }
                if (j < keyvalue.split("+")[i].split(">").length - 1) {
                    temp += " > ";
                }
            }
        }
        if (i < keyvalue.split("+").length - 1) {
            temp += " + ";
        }
    }
    return temp;
}