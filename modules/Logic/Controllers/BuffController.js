// BUFFS ARE DROPPED BY ORANGE PACKAGES

import { randomInRange } from "../Helpers.js";
import { game } from "../../../app.js";
import { Buffs } from "../../Drops/Buffs.js";

const BUFF_DURATION = 15; // in seconds

export class BuffController {
    constructor() {
        this.buffs = [Buffs._quaddamage, Buffs._invincibility, Buffs._mute,Buffs._noshield, Buffs._muteenemies, Buffs._noslowmo];
        this.text = '';

        // The duration of the buff. Once a buff is activated, the variable will be set
        // to BUFF_DURATION and countdown to 0
        this.seconds = 0;
    }

    drop() {
        const rand = randomInRange(0, this.buffs.length -1);
        this.buffs[rand].call(this);
    }

    setTimer(fn) {
        this.seconds = BUFF_DURATION;
        this.countdown = setInterval(()=> {
            if (!game.state.paused)
                this.seconds --;
            if (this.seconds === 0 ) {
                fn();
                clearInterval(this.countdown)
            }
        }, 1000)
    }
}
