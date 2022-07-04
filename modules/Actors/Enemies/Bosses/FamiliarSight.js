import { Enemy } from "../Enemy.js";
import { Movement } from "../../../Logic/Motion/Movement.js";
import { game } from "../../../../app.js";
import { FireLaser } from "../../../Lasers/Hostile/FireLaser.js";
import { CANVAS } from "../../../Assets/OtherGfx.js";
import { Shake } from "../../../Graphics/Effects/Shake.js";
import { FAMILIARSIGHTSPRITE } from "../../../Assets/Enemies.js";
import { BluePlacer } from "../Types/BluePlacer.js";

// MOVEMENT
const SPEED = 5;
const ENGAGEDISTANCE = 200; // Distance kept when engaging player
const SOUTH = 90;   // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const NORTH = 270;  // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// SHOOTING
const LASERSPEED = 5;
const FIRINGRATE = 30;
const LASERDIRECTION1 = 70;     // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const LASERDIRECTION2 = 80;     // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const LASERDIRECTION3 = 90;     // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const LASERDIRECTION4 = 100;     // Angle (0=EAST 90=South 180=WEST 270=NORTH)
const LASERDIRECTION5 = 110;    // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// STATE
const HP = 7500;
const SCOREBALLS = 60;
const RADIUS = 40;
const SPRITE = FAMILIARSIGHTSPRITE;
const NAME = 'FAMILIAR SIGHT';

// PHASES (Rates, e.g. 0.75 = when boss reaches 75% of HP)
// When the boss reaches a certain HP amount, the placers will spawn faster
// and an additional layer of lasers will be fired for each phase

// Initial
const SPAWNRATE = 5;    // Placer spawn rate. Higher = Slower

// Phase 2
const PHASE2_HP = 0.5;
const PHASE2_SPAWNRATE = 3;

// Phase 3
const PHASE3_HP = 0.2;
const PHASE3_SPAWNRATE = 2;

export class FamiliarSight extends Enemy {
    constructor() {
        super(RADIUS, HP, SCOREBALLS, SPRITE, SPEED, FIRINGRATE);
        // BOSS SPECIFIC ------------
        this.name = NAME;
        game.state.toggleBoss();
        // --------------------------
    }

    move() {
        if (this.y <= this.radius) {
            this.x += Movement.move(SOUTH, this.speed).x; //90=SOUTH
            this.y += Movement.move(SOUTH, this.speed).y; //90=SOUTH
        }
        if (this.y >= CANVAS.height * 0.5) {
            this.x += Movement.move(NORTH, this.speed).x; // 270=NORTH
            this.y += Movement.move(NORTH, this.speed).y; //270=NORTH
        }

        this.x += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y - ENGAGEDISTANCE, this.speed).x;
        this.y += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y - ENGAGEDISTANCE, this.speed).y;
        this.step();
    }

    shoot() {
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION1, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION2, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION3, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION4, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, LASERDIRECTION5, LASERSPEED));

        if ( this.hp < HP * PHASE2_HP) {
            game.firelasers.add(new FireLaser(this.x, this.y - 25, LASERDIRECTION1, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y - 25, LASERDIRECTION2, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y - 25, LASERDIRECTION3, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y - 25, LASERDIRECTION4, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y - 25, LASERDIRECTION5, LASERSPEED));
        }

        if ( this.hp < HP * PHASE3_HP) {
            game.firelasers.add(new FireLaser(this.x, this.y - 50, LASERDIRECTION1, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y - 50, LASERDIRECTION2, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y - 50, LASERDIRECTION3, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y - 50, LASERDIRECTION4, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y - 50, LASERDIRECTION5, LASERSPEED));
        }
    }

    takeDamage(damage) {
        super.takeDamage(damage);
        Shake.addShake(2, 0.25);
    }

    step() {
        super.step();

        // Set placer spawnrate according to boss phase
        let spawnrate = SPAWNRATE;
        if (this.hp < HP * PHASE2_HP) spawnrate = PHASE2_SPAWNRATE;
        if (this.hp < HP * PHASE3_HP) spawnrate = PHASE3_SPAWNRATE;

        // Spawn placer
        if (this.steps % (this.firingrate * spawnrate) === 0)
            this.spawnPlacer()
    }

    spawnPlacer() {
        game.enemies.add(new BluePlacer());
    }

    die() {
        super.die();
        game.audiocontroller.playBoomSound('expbig');
        Shake.addShake(6, 2);
        game.state.toggleBoss();
    }
}