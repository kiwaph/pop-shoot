import { Enemy } from "../Enemy.js";
import { REDTERRORSPRITE } from "../../../Assets/Enemies.js";
import { CANVAS } from "../../../Assets/OtherGfx.js";
import { game } from "../../../../app.js";
import { FireLaser } from "../../../Lasers/Hostile/FireLaser.js";
import { Movement } from "../../../Logic/Motion/Movement.js";
import { Boom } from "../../../Graphics/Effects/Boom.js";
import { Difficulty } from "../../../Logic/State/Difficulty.js";

// MOVEMENT
const SPEED = 1;
const SPEEDBOOST_X = 20;   

// SHOOTING
const LASERSPEED = 5;
const FIRINGRATE = 50;
const LASERDIRECTION1 = 85;     // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const LASERDIRECTION2 = 90;     // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const LASERDIRECTION3 = 95;     // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// STATE
const HP = Difficulty.baseTerrorHp * Difficulty.redHpMultiplier;;
const SCOREBALLS = Difficulty.baseTerrorScore * Difficulty.redScoreMultiplier;
const RADIUS = 19;
const SPRITE = REDTERRORSPRITE;

export class RedTerror extends Enemy {
    constructor() {
        super(RADIUS, HP, SCOREBALLS, SPRITE, SPEED, FIRINGRATE);
    }

    move() {
        this.x += Movement.moveTowards(this.x, this.y, game.player.x, CANVAS.height, this.speed * SPEEDBOOST_X).x;
        this.y += Movement.moveTowards(this.x, this.y, game.player.x, CANVAS.height, this.speed).y;
        this.step();
    }

    shoot() {
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION1, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION2, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION3, LASERSPEED));
    }

    die() {
        game.audiocontroller.playBoomSound('smoke');
        game.particles.add(new Boom(this.x, this.y, 'smoke'));
        super.die();
    }
}