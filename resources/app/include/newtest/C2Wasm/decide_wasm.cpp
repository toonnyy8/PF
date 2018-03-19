#include <iostream>
#include <math.h>
#include <string>

using namespace std;

//emcc decide_wasm.cpp -std=gnu++1z -O3 -s WASM=1 -s SIDE_MODULE=1 -o decide_wasm.wasm

extern "C" {
int compute_array_1(int i);
int compute_array_2(int i);
void POSTMESSAGE_BeDefenceBreak();
void POSTMESSAGE_BreakAttack();
void POSTMESSAGE_Offset();
void POSTMESSAGE_Impact();
void POSTMESSAGE_Damage(int damage);
void _Compute__(int block_num, int block_no, int array_length);
};

void _Compute__(int block_num, int block_no, int array_length)
{
    int damage = 0;
    for (int n = (array_length * (block_no - 1) / block_num) / 4; n < (array_length * block_no / block_num) / 4; n++) {
        if (compute_array_1(4 * n + 3) != 0) {
            if (compute_array_1(4 * n + 2) != 0 && compute_array_2(4 * n) != 0) {
                if ((compute_array_1(4 * n + 2) - compute_array_2(4 * n)) / 0x33 < -1) { //被破防
                    POSTMESSAGE_BeDefenceBreak();
                    return;
                } else if ((compute_array_1(4 * n + 2) - compute_array_2(4 * n)) / 0x33 > 1) { //破敵攻擊
                    POSTMESSAGE_BreakAttack();
                    return;
                } else {
                    POSTMESSAGE_Offset();
                    return;
                }
            } else if (compute_array_1(4 * n + 1) != 0 && compute_array_2(4 * n) != 0) {
                if (compute_array_1(4 * n + 1) - compute_array_2(4 * n) > 0) {
                    damage += compute_array_2(4 * n) / 0x33;
                } else {
                    damage += compute_array_1(4 * n + 1) / 0x33;
                }
            } else if ((compute_array_1(4 * n + 1) != 0 && compute_array_2(4 * n + 1) != 0) || (compute_array_1(4 * n + 2) != 0 && compute_array_2(4 * n + 2) != 0) || (compute_array_1(4 * n + 1) != 0 && compute_array_2(4 * n + 2) != 0) || (compute_array_1(4 * n + 2) != 0 && compute_array_2(4 * n + 1) != 0)) {
                POSTMESSAGE_Impact();
            }
        }
    };
    POSTMESSAGE_Damage(damage);
}
