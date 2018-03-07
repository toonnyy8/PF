onmessage = function(e) {
    if (e.data.func == "asyncComputeDamage") {
        e.data.args[5] = e.data.args[5] || 1;
        let compute_array_1 = e.data.args[0];
        let compute_array_2 = e.data.args[1];
        let block_num = e.data.args[2];
        let THIS_fight = e.data.args[3];
        let VS_fight = e.data.args[4];
        let block_no = e.data.args[5];

        let damage = 0;

        for (let n = (compute_array_1.length * (block_no - 1) / block_num) / 4; n < (compute_array_1.length * block_no / block_num) / 4; n++) {
            if (compute_array_1[4 * n + 3] != 0) {
                if (compute_array_1[4 * n + 2] != 0 && compute_array_2[4 * n] != 0) {
                    if ((compute_array_1[4 * n + 2] - compute_array_2[4 * n]) / 0x33 < -1) { //被破防
                        postMessage(["Be Defence Break", THIS_fight, VS_fight]);
                        return;
                    } else if ((compute_array_1[4 * n + 2] - compute_array_2[4 * n]) / 0x33 > 1) { //破敵攻擊
                        postMessage(["Break Attack", THIS_fight, VS_fight]);
                        return;
                    } else {
                        postMessage(["offset", THIS_fight, VS_fight]);
                        return;
                    }
                } else if (compute_array_1[4 * n + 1] != 0 && compute_array_2[4 * n] != 0) {
                    if (compute_array_1[4 * n + 1] - compute_array_2[4 * n] > 0) {
                        damage += compute_array_2[4 * n] / 0x33;
                    } else {
                        damage += compute_array_1[4 * n + 1] / 0x33;
                    }
                } else if ((compute_array_1[4 * n + 1] != 0 && compute_array_2[4 * n + 1] != 0) ||
                    (compute_array_1[4 * n + 2] != 0 && compute_array_2[4 * n + 2] != 0) ||
                    (compute_array_1[4 * n + 1] != 0 && compute_array_2[4 * n + 2] != 0) ||
                    (compute_array_1[4 * n + 2] != 0 && compute_array_2[4 * n + 1] != 0)) {
                    postMessage(["impact", THIS_fight, VS_fight]);
                }
            }
        };
        postMessage([damage, THIS_fight, VS_fight]);

    } else {

    };

}