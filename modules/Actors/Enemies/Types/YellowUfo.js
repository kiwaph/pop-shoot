import { Enemy } from "../Enemy.js";
import { Movement } from "../../../Logic/Motion/Movement.js";
import { game } from "../../../../app.js";
import { FireLaser } from "../../../Lasers/Hostile/FireLaser.js";
import { randomInRange } from "../../../Logic/Helpers.js";
import { Shake } from "../../../Graphics/Effects/Shake.js";
import { Boom } from "../../../Graphics/Effects/Boom.js";
import { YELLOWUFOSPRITE } from "../../../Assets/Enemies.js";
import { Difficulty } from "../../../Logic/State/Difficulty.js";

// MOVEMENT
const SPEED = 1;
const MOVEDIRECTION = 90;   // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// SHOOTING
const LASERSPEED = 4;
const FIRINGRATE = 40;

// STATE
const HP = Difficulty.baseUfoHp * Difficulty.blackHpMultiplier;;
const SCOREBALLS = Difficulty.baseUfoScore * Difficulty.blackScoreMultiplier;
const RADIUS = 17;
const SPRITE = YELLOWUFOSPRITE;

export class YellowUfo extends Enemy {
    constructor() {
        super(RADIUS, HP, SCOREBALLS, SPRITE, SPEED, FIRINGRATE);
    }

    move() {
        this.x = this.speed * Math.sin(this.y / 30) + this.x;
        this.y += Movement.move(MOVEDIRECTION, this.speed).y;
        this.step();
    }

    shoot() {
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), randomInRange(1, 5)));
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), randomInRange(1, 5)));
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), randomInRange(1, 5)));
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), randomInRange(1, 5)));
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), randomInRange(1, 5)));
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), randomInRange(1, 5)));
    }

    explode() {
        game.firelasers.add(new FireLaser(this.x, this.y, 0, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 15, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 30, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 45, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 60, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 75, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 90, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 105, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 120, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 135, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 150, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 165, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 180, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 195, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 210, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 225, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 240, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 255, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 270, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 285, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 300, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 315, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 330, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 345, LASERSPEED));

        game.firelasers.add(new FireLaser(this.x, this.y, 0, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 15, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 30, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 45, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 60, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 75, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 90, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 105, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 120, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 135, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 150, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 165, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 180, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 195, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 210, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 225, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 240, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 255, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 270, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 285, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 300, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 315, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 330, LASERSPEED / 2));
        game.firelasers.add(new FireLaser(this.x, this.y, 345, LASERSPEED / 2));
    }

    die() {
        game.audiocontroller.playBoomSound('std');
        game.particles.add(new Boom(this.x, this.y, 'exp'));
        Shake.addShake(6, 0.75);
        this.explode();
        super.die();
    }
}