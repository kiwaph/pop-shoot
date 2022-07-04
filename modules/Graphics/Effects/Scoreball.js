import { SCOREBALLSPRITE } from "../../Assets/Effects.js";
import { Movement } from "../../Logic/Motion/Movement.js";

const SPEED = 15;
const DESTINATION_X = 30;
const DESTINATION_Y = 520;
const SPRITE = SCOREBALLSPRITE;

export class Scoreball {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.reachedDestination = false;
        this.sprite = SPRITE;
        this.speed = SPEED;
    }

    // Move the scoreball towards the scoreboard
    move() {
        this.x += Movement.moveTowards(this.x, this.y, DESTINATION_X, DESTINATION_Y, this.speed).x;
        this.y += Movement.moveTowards(this.x, this.y, DESTINATION_X, DESTINATION_Y, this.speed).y;
        
        if (this.x <= DESTINATION_X + 10 && this.y <= DESTINATION_Y + 10) // +10 because exact destination will never be reached
            this.reachedDestination = true;
    }
}