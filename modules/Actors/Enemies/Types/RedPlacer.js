import { Enemy } from "../Enemy.js";
import { REDPLACERSPRITE } from "../../../Assets/Enemies.js";
import { Movement } from "../../../Logic/Motion/Movement.js";
import { game } from "../../../../app.js";
import { FireLaser } from "../../../Lasers/Hostile/FireLaser.js";
import { Shake } from "../../../Graphics/Effects/Shake.js";
import { randomInRange } from "../../../Logic/Helpers.js";
import { Boom } from "../../../Graphics/Effects/Boom.js";
import { Difficulty } from "../../../Logic/State/Difficulty.js";

// MOVEMENT
const SPEED = 2;
const MOVEDIRECTION = 90;    // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// SHOOTING
const LASERSPEED = 1;
const FIRINGRATE = 20;

// STATE
const HP = Difficulty.basePlacerHp * Difficulty.redHpMultiplier;;
const SCOREBALLS = Difficulty.basePlacerScore * Difficulty.redScoreMultiplier;
const RADIUS = 17;
const SPRITE = REDPLACERSPRITE;

export class RedPlacer extends Enemy {
    constructor() {
        super(RADIUS, HP, SCOREBALLS, SPRITE, SPEED, FIRINGRATE);
    }

    move() {
        this.x += Movement.move(MOVEDIRECTION, this.speed).x;
        this.y += Movement.move(MOVEDIRECTION, this.speed).y;
        this.step();
    }

    shoot() {
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, randomInRange(0, 360), LASERSPEED));
    }

    explode() {
        game.firelasers.add(new FireLaser(this.x, this.y, 320, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 315, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 310, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 305, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 300, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 295, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 290, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 285, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 280, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 275, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 270, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 265, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 260, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 255, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 250, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 245, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 240, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 235, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 230, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 225, randomInRange(1,5)));
        game.firelasers.add(new FireLaser(this.x, this.y, 220, randomInRange(1,5)));
    }

    die() {
        game.audiocontroller.playBoomSound('phew');
        game.particles.add(new Boom(this.x, this.y, 'exp'));
        Shake.addShake(6, 0.75);
        this.explode();
        super.die();
    }
}
