import { Movement } from "../../Logic/Motion/Movement.js";
import { game } from "../../../app.js";
import { closestEnemyTo, randomInRange } from "../../Logic/Helpers.js";
import { BlueLaser } from "./BlueLaser.js";
import { PARASITES0SSPRITE, PARASITES1SSPRITE, PARASITES2SSPRITE, PARASITES3SSPRITE } from "../../Assets/Lasers.js";

const SPRITE =[ PARASITES0SSPRITE, PARASITES1SSPRITE, PARASITES2SSPRITE, PARASITES3SSPRITE ]

export class Parasites extends BlueLaser {
    constructor(x, y, host) {
        super(x, y)
        this.sprite = [ SPRITE[randomInRange(0, SPRITE.length - 1)] ]
        this.alreadyLooped = true; // parasites don't loop so this variable is overridden

        this.speed = randomInRange(5,8);
        this.damage *= game.state.variables.parasitesrate;
        this.host = host;
    }

    move() {
        if (game.enemies.enemiesOnScreen()) {
            this.x += Movement.moveTowards(this.x, this.y, closestEnemyTo(this.host).x, closestEnemyTo(this.host).y, this.speed).x;
            this.y += Movement.moveTowards(this.x, this.y, closestEnemyTo(this.host).x, closestEnemyTo(this.host).y, this.speed).y;            
        }
        else (this.shatter())
    }
}