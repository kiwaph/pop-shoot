import { Enemy } from "../Enemy.js";
import { GREENUFOSPRITE } from "../../../Assets/Enemies.js";
import { Movement } from "../../../Logic/Motion/Movement.js";
import { game } from "../../../../app.js";
import { FireLaser } from "../../../Lasers/Hostile/FireLaser.js";
import { randomInRange } from "../../../Logic/Helpers.js";
import { Shake } from "../../../Graphics/Effects/Shake.js";
import { Boom } from "../../../Graphics/Effects/Boom.js";
import { Difficulty } from "../../../Logic/State/Difficulty.js";

// MOVEMENT
const SPEED = 1;
const MOVEDIRECTION = 90;       // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// SHOOTING
const LASERSPEED = 3;
const FIRINGRATE = 100;

// STATE
const HP = Difficulty.baseUfoHp;
const SCOREBALLS = Difficulty.baseUfoScore;
const RADIUS = 17;
const SPRITE = GREENUFOSPRITE;

export class GreenUfo extends Enemy {
    constructor() {
        super(RADIUS, HP, SCOREBALLS, SPRITE, SPEED, FIRINGRATE, FIRINGRATE);
    }

    move() {
        this.x = this.speed * Math.sin(this.y / 30) + this.x;
        this.y += Movement.move(MOVEDIRECTION, this.speed).y;
        this.step();
    }

    shoot() {
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), LASERSPEED));
    }

    explode() {
        game.firelasers.add(new FireLaser(this.x, this.y, 0, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 60, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 120, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 180, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 240, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 300, LASERSPEED));
    }

    die() {
        game.audiocontroller.playBoomSound('std');
        game.particles.add(new Boom(this.x, this.y, 'exp'));
        Shake.addShake(3, 0.2);
        this.explode();
        super.die();
    }

}