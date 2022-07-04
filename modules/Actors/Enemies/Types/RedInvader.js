import { Enemy } from "../Enemy.js";
import { REDINVADERSPRITE } from "../../../Assets/Enemies.js";
import { Movement } from "../../../Logic/Motion/Movement.js";
import { game } from "../../../../app.js";
import { FireLaser } from "../../../Lasers/Hostile/FireLaser.js";
import { Boom } from "../../../Graphics/Effects/Boom.js";
import { Difficulty } from "../../../Logic/State/Difficulty.js";

// MOVEMENT
const SPEED = 1;
const MOVEDIRECTION = 90;       // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const RANGETOENGAGE = 75;   // When player approaches proximity (X), invader will engage
const ENGAGEDISTANCE = 200; // Distance kept when engaging player

// SHOOTING
const LASERSPEED = 4;
const FIRINGRATE = 50;
const LASERDIRECTION1 = 80;     // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const LASERDIRECTION2 = 85;     // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const LASERDIRECTION3 = 90;     // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const LASERDIRECTION4 = 95;     // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const LASERDIRECTION5 = 100;    // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// STATE
const HP = Difficulty.baseInvaderHp * Difficulty.redHpMultiplier;
const SCOREBALLS = Difficulty.baseInvaderScore * Difficulty.redScoreMultiplier;
const RADIUS = 17;
const SPRITE = REDINVADERSPRITE;

export class RedInvader extends Enemy {
    constructor() {
        super(RADIUS, HP, SCOREBALLS, SPRITE, SPEED, FIRINGRATE);
    }

    move() {
        const enemyStillInCanvas = this.y >= this.radius;
        const playerInProximity = Math.abs(game.player.x - this.x) < RANGETOENGAGE;
        const playerAboveEnemy = game.player.y > this.y;

        if (playerInProximity && playerAboveEnemy && enemyStillInCanvas) {
                this.x += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y - ENGAGEDISTANCE, this.speed).x;
                this.y += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y - ENGAGEDISTANCE, this.speed).y;
        }
        else {
            this.x += Movement.move(MOVEDIRECTION, this.speed).x;
            this.y += Movement.move(MOVEDIRECTION, this.speed).y;
        }

        this.step();
    }

    shoot() {
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION1, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION2, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION3, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION4, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION5, LASERSPEED));
    }

    die() {
        game.audiocontroller.playBoomSound('phase');
        game.particles.add(new Boom(this.x, this.y, 'redinvader'));
        super.die();
    }
}