import { Enemy } from "../Enemy.js";
import { Movement } from "../../../Logic/Motion/Movement.js";
import { game } from "../../../../app.js";
import { CANVAS } from "../../../Assets/OtherGfx.js";
import { Shake } from "../../../Graphics/Effects/Shake.js";
import { CONTROLLERSPRITE } from "../../../Assets/Enemies.js";
import { YellowUfo } from "../Types/YellowUfo.js";
import { FireLaser } from "../../../Lasers/Hostile/FireLaser.js";

// MOVEMENT
const SPEED = 10;
const LOWEST_POINT = 65;
const SOUTH = 90;   // Angle (0=EAST 90=South 180=WEST 270=NORTH)

// SHOOTING
const FIRINGRATE = 75;
const LASERSPEED = 3;

// STATE
const HP = 20000;
const SCOREBALLS = 120;
const RADIUS = 50;
const SPRITE = CONTROLLERSPRITE;
const NAME = 'MACHINE CONTROLLER';

// PHASES (Rates, e.g. 0.75 = when boss reaches 75% of HP)
// When the boss reaches a certain HP amount, it will fire
// an additional layer of lasers
const PHASE2_HP = 0.5;
const PHASE3_HP = 0.2;

export class Controller extends Enemy {
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
        this.x += Movement.moveTowards(this.x, this.y, game.player.x, game.player.y, this.speed).x;
        this.step();
    }

    shoot() {
        Shake.addShake(2, 0.25);
        
        game.firelasers.add(new FireLaser(this.x, this.y, 0, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 20, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 40, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 60, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 80, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 100, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 120, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 140, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 160, LASERSPEED));
        game.firelasers.add(new FireLaser(this.x, this.y, 180, LASERSPEED));

        if (this.hp <= HP * PHASE2_HP) {
            game.firelasers.add(new FireLaser(this.x, this.y, 10, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y, 30, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y, 50, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y, 70, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y, 90, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y, 110, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y, 130, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y, 150, LASERSPEED));
            game.firelasers.add(new FireLaser(this.x, this.y, 170, LASERSPEED));
        }

        if (this.hp <= HP * PHASE3_HP) {
            game.firelasers.add(new FireLaser(this.x, this.y, 10, LASERSPEED * 0.75));
            game.firelasers.add(new FireLaser(this.x, this.y, 30, LASERSPEED * 0.75));
            game.firelasers.add(new FireLaser(this.x, this.y, 50, LASERSPEED * 0.75));
            game.firelasers.add(new FireLaser(this.x, this.y, 70, LASERSPEED * 0.75));
            game.firelasers.add(new FireLaser(this.x, this.y, 90, LASERSPEED * 0.75));
            game.firelasers.add(new FireLaser(this.x, this.y, 110, LASERSPEED * 0.75));
            game.firelasers.add(new FireLaser(this.x, this.y, 130, LASERSPEED * 0.75));
            game.firelasers.add(new FireLaser(this.x, this.y, 150, LASERSPEED * 0.75));
            game.firelasers.add(new FireLaser(this.x, this.y, 170, LASERSPEED * 0.75));
        }
    }

    step() {
        super.step();
        if (this.steps % (this.firingrate * 2) === 0)
            this.spawnUfo()
    }

    spawnUfo() {
        game.enemies.add(new YellowUfo());
    }

    die() {
        super.die();
        game.audiocontroller.playBoomSound('expbig');
        Shake.addShake(6, 2);
        game.state.toggleBoss();
    }
}