import { Movement } from "../../Logic/Motion/Movement.js";
import { game } from "../../../app.js";
import { closestEnemyTo } from "../../Logic/Helpers.js";
import { BlueLaser } from "./BlueLaser.js";
import { SEEKERSPRITE } from "../../Assets/Lasers.js";

export class Seeker extends BlueLaser {
    constructor(x, y, target) {
        super(x, y)
        this.sprite = [SEEKERSPRITE];
        this.alreadyLooped = true; // seekers don't loop so this variable is overridden
        this.damage *= game.state.variables.seekerrate;
        this.target = target;
    }

    move() {
        if (this.target.hp > 0) {
            this.x += Movement.moveTowards(this.x, this.y, this.target.x, this.target.y, this.speed).x;
            this.y += Movement.moveTowards(this.x, this.y, this.target.x, this.target.y, this.speed).y;            
        }
        else (this.shatter())
    }
}