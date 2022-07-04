import { game } from "../../../app.js";
import { SlowMo } from "../../Logic/State/SlowMo.js";

export class ScoreballPool {
    constructor() {
        this.liveScoreballs = [];
    }

    add(scoreball) {
        this.liveScoreballs.push(scoreball);
        if (game.state.slowmo)
            scoreball.speed *= game.state.variables.slowmorate;
    }

    move() {
        this.liveScoreballs.forEach(scoreball => scoreball.move());
    }

    // Only keep scoreballs that have not yet reached their destination
    refresh() {
        this.liveScoreballs = this.liveScoreballs.filter(scoreball => !scoreball.reachedDestination);
    }
}