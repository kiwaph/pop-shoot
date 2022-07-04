import { Enemy } from "../Enemy.js";
import { Movement } from "../../../Logic/Motion/Movement.js";
import { game } from "../../../../app.js";
import { FireLaser } from "../../../Lasers/Hostile/FireLaser.js";
import { CANVAS } from "../../../Assets/OtherGfx.js";
import { randomInRange } from "../../../Logic/Helpers.js";
import { Shake } from "../../../Graphics/Effects/Shake.js";
import { METALEMPERORSPRITE } from "../../../Assets/Enemies.js";

// MOVEMENT
const SPEED = 1;
const LOWEST_POINT = 90;
const SOUTH = 90;   // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// SHOOTING
const FIRINGRATE = 15;  // Higher = slower

// LASER WALL
const BULLETWALL_SPEED = 4;
const GAPSIZE = 150;

// STATE
const HP = 3000;
const SCOREBALLS = 30;
const RADIUS = 50;
const SPRITE = METALEMPERORSPRITE;
const NAME = 'METAL EMPEROR';

// PHASES (Rates, e.g. 0.75 = when boss reaches 75% of HP)
// When the boss reaches a certain amount of HP, bullets will fire faster
// and the laser-walls will spawn faster

// Initial
const LASERSPEED = 3;
const WALLRATE = 10;    // Rate at which the laser-wall spawns. Higher = slower

// Phase 2
const PHASE2_HP = 0.5;
const PHASE2_LASERSPEED = 5;
const PHASE2_WALLRATE = 7;

// Phase 3
const PHASE3_HP = 0.2;
const PHASE3_LASERSPEED = 7;
const PHASE3_WALLRATE = 5;

export class MetalEmperor extends Enemy {
    constructor() {
        super(RADIUS, HP, SCOREBALLS, SPRITE, SPEED, FIRINGRATE);
        this.x = 250;
        this.y = - this.radius;

        // BOSS SPECIFIC ------------
        this.name = NAME;
        game.state.toggleBoss();
        // --------------------------
    }

    move() {
        if (this.y <= LOWEST_POINT) {
            this.x += Movement.move(SOUTH, this.speed * 10).x;
            this.y += Movement.move(SOUTH, this.speed * 10).y;
        }
        
        this.x += this.speed * Math.sin(this.steps / 275)
        
        this.step()
    }

    shoot() {
        // Set the laser speed according to the boss phase
        let laserspeed = LASERSPEED;
        if (this.hp < HP * PHASE2_HP) laserspeed = PHASE2_LASERSPEED;
        if (this.hp < HP * PHASE3_HP) laserspeed = PHASE3_LASERSPEED;

        // Fire lasers
        game.firelasers.add(new FireLaser(this.x, this.y, - this.steps % 360, laserspeed));
        game.firelasers.add(new FireLaser(this.x, this.y, this.steps % 360, laserspeed));
    }

    step() {
        super.step();

        // Set laser-wall spawn rate according to boss phase
        let wallrate = WALLRATE;
        if (this.hp < HP * PHASE2_HP) wallrate = PHASE2_WALLRATE;
        if (this.hp < HP * PHASE3_HP) wallrate = PHASE3_WALLRATE;

        // Spawn laser-wall
        if (this.steps % (this.firingrate * wallrate) === 0)
            this.shootBulletWall()
    }

    shootBulletWall() {
        Shake.addShake(6, 0.75);
        
        const gapstart = randomInRange(0, CANVAS.width - GAPSIZE)
        for (let i = 0; i < CANVAS.width; i += 15) {
            if ( i < gapstart || i > gapstart + GAPSIZE )
                game.firelasers.add(new FireLaser(i, 0, 90, BULLETWALL_SPEED)); // 90 = SOUTH
        }
    }

    die() {
        super.die();
        game.audiocontroller.playBoomSound('expbig');
        Shake.addShake(6, 2);
        game.state.toggleBoss();
    }
}