import { game } from "../../../app.js";

const CHARGERATE = 1;           // default charging rate if not upgraded to uranium fuel
const DISCHARGERATE = 1;        // default discharging rate

export class SlowmoGauge {
    constructor() {
        this.charge = 100 // 0=EMPTY 100=FULL
        this.setObserver();
    }

    setObserver() {
        let fn = () => {
            // If SLOWMO, discharge gauge as long as it's not fully empty
            // If it becomes empty, stop slowmo
            if (game.state.slowmo && !game.state.paused) {
                if (this.charge === 0)
                    game.state.stopSlowmo();
                else
                    this.startDischarging();
            }
            // If not in SLOWMO, charge the gauge as long as it has not
            // yet reached full charge
            if (!game.state.slowmo && !game.state.paused && !this.isCharged())
                this.startCharging();
        }
        this.shieldInterval = setInterval(fn.bind(this), 50);
    }

    startCharging() {
        const rate = (game.state.variables.uranium) ? game.state.variables.uraniumrate : CHARGERATE;
        this.charge += rate;
        game.player.flame.move();
        if (this.charge > 100)
            this.charge = 100;
    }

    startDischarging() {
        this.charge -= DISCHARGERATE;
        game.player.flame.move();
        if (this.charge < 0)
            this.charge = 0;
    }

    isCharged() {
        if (this.charge === 100) return true;
    }
}