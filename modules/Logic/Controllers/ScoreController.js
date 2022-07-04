import { game } from "../../../app.js";
import { RedPackage } from "../../Actors/Packages/RedPackage.js";

const FIRSTPACKAGE = 50;

export class ScoreController {
    constructor() {
        this.score = 0;
        this.previous = 0;
        this.next = FIRSTPACKAGE;
    }

    checkPlayerScore() {
        if (this.score === this.next) {
            this.previous = this.next;
            this.next += FIRSTPACKAGE * (game.state.stage + 2);
            game.enemies.add(new RedPackage());
        }
    }

    incrementScore() {
        this.score++;
    }

    get levelBarPercentage() {
        return (this.score - this.previous) / (this.next - this.previous);
    }
}