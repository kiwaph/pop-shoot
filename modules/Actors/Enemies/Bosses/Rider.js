import { Enemy } from "../Enemy.js";
import { Movement } from "../../../Logic/Motion/Movement.js";
import { game } from "../../../../app.js";
import { FireLaser } from "../../../Lasers/Hostile/FireLaser.js";
import { CANVAS } from "../../../Assets/OtherGfx.js";
import { randomInRange } from "../../../Logic/Helpers.js";
import { Shake } from "../../../Graphics/Effects/Shake.js";
import { RIDERSPRITE } from "../../../Assets/Enemies.js";

// MOVEMENT
const SPEED = 3;
const LOWEST_POINT = 100;
const SOUTH = 90;   // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// SHOOTING
const FIRINGRATE = 10;
const BULLETSPEED = 5;

// STATE
const HP = 35000;
const SCOREBALLS = 240;
const RADIUS = 100;
const SPRITE = RIDERSPRITE;
const NAME = 'RIDER OF THE SUN';

// PHASES (Rates, e.g. 0.75 = when boss reaches 75% of HP)
// When the boss reaches a certain HP amount, it will fire
// additional layers of lasers as well as laser-rain
const PHASE2_HP = 0.8;
const PHASE3_HP = 0.7;
const PHASE4_HP = 0.6;
const PHASE5_HP = 0.5;
const PHASE6_HP = 0.2;

export class Rider extends Enemy {
    constructor() {
        super(RADIUS, HP, SCOREBALLS, SPRITE, SPEED, FIRINGRATE);
        this.x = CANVAS.width / 2;

        // BOSS SPECIFIC ------------
        this.name = NAME;
        game.state.toggleBoss();
        // --------------------------
    }

    move() {
        if (this.y <= LOWEST_POINT) {
            this.x += Movement.move(SOUTH, this.speed).x;
            this.y += Movement.move(SOUTH, this.speed).y;
        }

        this.step();
    }

    takeDamage(damage) {
        super.takeDamage(damage);
        Shake.addShake(2, 0.25);
    }
    
    step() {
        super.step();
    }


    shoot() {        
        const bulletDirection = this.steps % 180
        game.firelasers.add(new FireLaser(this.x, this.y, bulletDirection, BULLETSPEED));

        // Add laser layers according to boss phase
        if (this.hp < HP * PHASE2_HP) game.firelasers.add(new FireLaser(this.x, this.y, bulletDirection - 45, BULLETSPEED));
        if (this.hp < HP * PHASE3_HP) game.firelasers.add(new FireLaser(this.x, this.y, bulletDirection + 45, BULLETSPEED));
        if (this.hp < HP * PHASE4_HP) game.firelasers.add(new FireLaser(this.x, this.y, bulletDirection + 90, BULLETSPEED));

        // Add rain layers according to boss phase
        if (this.hp < HP * PHASE5_HP) game.firelasers.add(new FireLaser(randomInRange(0, CANVAS.width), 0, 90, BULLETSPEED));    
        if (this.hp < HP * PHASE6_HP) game.firelasers.add(new FireLaser(randomInRange(0, CANVAS.width), 0, 90, BULLETSPEED));
    }

    die() {
        super.die();
        game.audiocontroller.playBoomSound('expbig');
        Shake.addShake(6, 2);
        game.state.toggleBoss();
    }
}