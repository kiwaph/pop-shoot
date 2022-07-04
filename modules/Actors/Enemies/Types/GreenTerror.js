import { Enemy } from "../Enemy.js";
import { GREENTERRORSPRITE } from "../../../Assets/Enemies.js";
import { CANVAS } from "../../../Assets/OtherGfx.js";
import { game } from "../../../../app.js";
import { FireLaser } from "../../../Lasers/Hostile/FireLaser.js";
import { Movement } from "../../../Logic/Motion/Movement.js";
import { Boom } from "../../../Graphics/Effects/Boom.js";
import { Difficulty } from "../../../Logic/State/Difficulty.js";

// MOVEMENT
const SPEED = 0.5;
const SPEEDBOOST_X = 20;   

// SHOOTING
const LASERSPEED = 3;
const FIRINGRATE = 150;
const LASERDIRECTION = 90;     // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// STATE
const HP = Difficulty.baseTerrorHp;
const SCOREBALLS = Difficulty.baseTerrorScore;
const RADIUS = 19;
const SPRITE = GREENTERRORSPRITE;

export class GreenTerror extends Enemy {
    constructor() {
        super(RADIUS, HP, SCOREBALLS, SPRITE, SPEED, FIRINGRATE);
    }

    move() {
        this.x += Movement.moveTowards(this.x, this.y, game.player.x, CANVAS.height, this.speed * SPEEDBOOST_X).x;
        this.y += Movement.moveTowards(this.x, this.y, game.player.x, CANVAS.height, this.speed).y;
        this.step();
    }

    shoot() {
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION, LASERSPEED));
    }

    die() {
        game.audiocontroller.playBoomSound('smoke');
        game.particles.add(new Boom(this.x, this.y, 'smoke'));
        super.die();
    }
}