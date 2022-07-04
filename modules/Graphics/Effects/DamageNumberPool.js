import { game } from "../../../app.js";

export class DamageNumberPool {
    constructor() {
        this.liveNumbers = [];
    }

    add(damageNumber) {
        this.liveNumbers.push(damageNumber);
        if (game.state.slowmo) {
            damageNumber.speed *= game.state.variables.slowmorate;
            damageNumber.duration /= game.state.variables.slowmorate;
        }
    }

    move() {
        this.liveNumbers.forEach(damageNumber => damageNumber.move());
    }

    // Only keep damageNumbers which duration have not yet reached 0
    refresh() {
        this.liveNumbers = this.liveNumbers.filter(damageNumber => damageNumber.duration > 0);
    }
}