import { randomInRange } from "../../Logic/Helpers.js";
import { Movement } from "../../Logic/Motion/Movement.js";

const DURATION = 20; // When DURATION reaches 0, the damage number will be removed by refresh()
const SPEED = 5;

export class DamageNumber {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;

        this.speed = SPEED;
        this.duration = DURATION;
        this.text = Math.round(text);
        this.direction = randomInRange(0, 360);
    }

    move() {
        this.x += Movement.move(this.direction, this.speed).x;
        this.y += Movement.move(this.direction, this.speed).y;
        this.duration --;
    }
}