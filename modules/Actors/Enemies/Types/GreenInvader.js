import { Enemy } from "../Enemy.js";
import { GREENINVADERSPRITE } from "../../../Assets/Enemies.js";
import { Movement } from "../../../Logic/Motion/Movement.js";
import { game } from "../../../../app.js";
import { FireLaser } from "../../../Lasers/Hostile/FireLaser.js";
import { Boom } from "../../../Graphics/Effects/Boom.js";
import { Difficulty } from "../../../Logic/State/Difficulty.js";

// MOVEMENT
const SPEED = 1;
const MOVEDIRECTION = 90;    // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const RANGETOENGAGE = 75;   // When player approaches proximity (X), invader will engage
const ENGAGEDISTANCE = 200; // Distance kept when engaging player

// SHOOTING
const LASERSPEED = 3;
const FIRINGRATE = 100;
const LASERDIRECTION = 90;  // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// STATE
const HP = Difficulty.baseInvaderHp;
const SCOREBALLS = Difficulty.baseInvaderScore;
const RADIUS = 17;
const SPRITE = GREENINVADERSPRITE;

export class GreenInvader extends Enemy {
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
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION, LASERSPEED));
    }

    die() {
        game.audiocontroller.playBoomSound('phase');
        game.particles.add(new Boom(this.x, this.y, 'greeninvader'));
        super.die();
    }
}