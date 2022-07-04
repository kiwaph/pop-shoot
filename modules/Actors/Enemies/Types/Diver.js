import { Enemy } from "../Enemy.js";
import { DIVERSPRITE } from "../../../Assets/Enemies.js";
import { Movement } from "../../../Logic/Motion/Movement.js";
import { game } from "../../../../app.js";
import { Boom } from "../../../Graphics/Effects/Boom.js";
import { Difficulty } from "../../../Logic/State/Difficulty.js";
import { Shake } from "../../../Graphics/Effects/Shake.js";
import { FireLaser } from "../../../Lasers/Hostile/FireLaser.js";
import { randomInRange } from "../../../Logic/Helpers.js";

// MOVEMENT
const SPEED = 5;
const MOVEDIRECTION = 90;   // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const DELAY = 60;          // Delay entry to screen so that sound effect plays first (in steps)

// STATE
const HP = Difficulty.baseDiverHp;;
const SCOREBALLS = Difficulty.baseDiverScore;
const RADIUS = 20;
const SPRITE = DIVERSPRITE;

export class Diver extends Enemy {
    constructor() {
        super(RADIUS, HP, SCOREBALLS, SPRITE, SPEED);
        if (game.state.stage === 1) {
            this.scoreballs *= Difficulty.blueScoreMultiplier;
            this.hp *= Difficulty.blueHpMultiplier;
        }
        if (game.state.stage === 2) {
            this.scoreballs *= Difficulty.redScoreMultiplier;
            this.hp *= Difficulty.redHpMultiplier;
        }
        if (game.state.stage >= 3) {
            this.scoreballs *= Difficulty.blackScoreMultiplier;
            this.hp *= Difficulty.blackHpMultiplier;
        }

        game.audiocontroller.playDiverSound();
    }

    move() {
        if(this.steps > DELAY) {
            this.x += Movement.move(MOVEDIRECTION, this.speed).x;
            this.y += Movement.move(MOVEDIRECTION, this.speed).y;
        }
        this.step();
    }

    // Diver should not take damage before it appears on screen
    takeDamage(damage) {
        if (this.steps > DELAY)
            super.takeDamage(damage);
    }

    explode() {
        game.firelasers.add(new FireLaser(this.x, this.y, 215, randomInRange(5,10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 220, randomInRange(5,10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 225, randomInRange(5,10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 220, randomInRange(5,10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 215, randomInRange(5,10)));

        game.firelasers.add(new FireLaser(this.x, this.y, 305, randomInRange(5,10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 310, randomInRange(5,10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 315, randomInRange(5,10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 310, randomInRange(5,10)));
        game.firelasers.add(new FireLaser(this.x, this.y, 305, randomInRange(5,10)));
    }

    die() {
        game.audiocontroller.playBoomSound('phew');
        game.particles.add(new Boom(this.x, this.y, 'exp'));
        Shake.addShake(3, 0.2);
        this.explode();
        super.die();
    }
}